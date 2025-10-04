import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';

console.log('Edge Function: push-subscribe started');

serve(async (req) => {
  console.log('Request received for push-subscribe');
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request handled');
    return new Response('ok', { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    console.log('Parsing request body...');
    const { endpoint, p256dh, auth } = await req.json();
    console.log('Request body parsed:', { endpoint, p256dh, auth });
    console.log('Creating Supabase client...');
    const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY');
    console.log('SERVICE_ROLE_KEY value (first 5 chars):', serviceRoleKey ? serviceRoleKey.substring(0, 5) : 'Not set');
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      serviceRoleKey ?? '', // Usar service_role_key para ignorar RLS
      { global: { headers: { 'x-client-info': 'supabase-edge-functions' } } }
    );
    console.log('Supabase client created.');

    console.log('Attempting to upsert subscription...');
    const { data, error } = await supabaseClient
      .from('push_subscriptions')
      .upsert({ endpoint, p256dh, auth }, { onConflict: 'endpoint' });

    if (error) {
      console.error('Erro ao salvar subscrição no Supabase:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        status: 500,
      });
    }

    console.log('Subscrição salva com sucesso:', data);
    return new Response(JSON.stringify({ message: 'Subscrição salva com sucesso!', data }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 200,
    });
  } catch (error) {
    console.error('Erro geral na função Edge push-subscribe:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 400,
    });
  }
});

