import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import webpush from 'https://esm.sh/web-push@3.6.1';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    const { title, message, audience } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SERVICE_ROLE_KEY') ?? '', // Use service role key for sending notifications
      { global: { headers: { 'x-client-info': 'supabase-edge-functions' } } }
    );

    webpush.setVapidDetails(
      'mailto:your-email@example.com', // Replace with your email
      Deno.env.get('VAPID_PUBLIC_KEY') ?? '',
      Deno.env.get('VAPID_PRIVATE_KEY') ?? ''
    );

    let subscriptions;
    if (audience === 'all') {
      const { data, error } = await supabaseClient.from('push_subscriptions').select('*');
      if (error) throw error;
      subscriptions = data;
    } else {
      // Implement logic for specific audience if needed
      subscriptions = [];
    }

    let sentCount = 0;
    for (const sub of subscriptions) {
      try {
        const payload = JSON.stringify({ title, message });
        await webpush.sendNotification(sub, payload);
        sentCount++;
      } catch (e) {
        console.error('Failed to send notification to subscription:', sub.endpoint, e);
        // Optionally, remove expired subscriptions from the database
        if (e.statusCode === 410) { // GONE status code
          await supabaseClient.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
        }
      }
    }

    return new Response(JSON.stringify({ message: 'Notificações enviadas com sucesso!', sent: sentCount }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });
  } catch (error) {
    console.error('Erro na função Edge push-send:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 400,
    });
  }
});

