CREATE POLICY "Allow anonymous insert" ON public.push_subscriptions FOR INSERT TO anon WITH CHECK (true);
