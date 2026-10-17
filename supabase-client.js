import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Supabase publishable keys are intended for browser use. Database access is
// limited to authenticated users by the flight_deck_* views and existing RLS.
export const supabase = createClient(
  'https://hvfpiemdlredzgcsxlzx.supabase.co',
  'sb_publishable_dDyWXQOQLly7b7XJ1o9PAA_VYjDNDg_',
  {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
      flowType: 'pkce'
    }
  }
);

export async function loadFlightDeckData() {
  const [crew, schedule, logs, balloons] = await Promise.all([
    supabase.from('flight_deck_crew').select('*').order('name'),
    supabase.from('flight_deck_schedule').select('*').order('date'),
    supabase.from('flight_deck_logs').select('*').order('date', { ascending: false }),
    supabase.from('flight_deck_balloons').select('*').order('name')
  ]);
  const failed = [crew, schedule, logs, balloons].find(result => result.error);
  if (failed) throw failed.error;
  return {
    crew: crew.data ?? [],
    schedule: schedule.data ?? [],
    logs: logs.data ?? [],
    balloons: balloons.data ?? []
  };
}

export async function requestCrewSignIn(email) {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: window.location.origin + window.location.pathname
    }
  });
}
