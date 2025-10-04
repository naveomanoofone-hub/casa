import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Check if admin already exists
    const { data: existingAdmin } = await supabaseAdmin
      .from("user_roles")
      .select("*")
      .eq("role", "admin")
      .maybeSingle();

    if (existingAdmin) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Admin já existe" 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create root admin user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: "root@admin.com",
      password: "root123",
      email_confirm: true,
    });

    if (authError) {
      console.error("Error creating admin user:", authError);
      throw authError;
    }

    // Add admin role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .insert({
        user_id: authData.user.id,
        role: "admin",
      });

    if (roleError) {
      console.error("Error adding admin role:", roleError);
      throw roleError;
    }

    console.log("Admin user created successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin criado com sucesso",
        email: "root@admin.com",
        password: "root123"
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in setup-admin function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
