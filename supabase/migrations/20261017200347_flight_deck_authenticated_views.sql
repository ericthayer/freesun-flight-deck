-- Narrow, read-only views for the dashboard. Crew contact fields and log notes
-- are intentionally excluded. The views remain subject to source-table RLS.
create or replace view public.flight_deck_crew
with (security_invoker = true)
as
select
  id,
  name,
  role,
  experience_years,
  certifications,
  bio,
  image_url,
  availability,
  specialty,
  flights
from public.crew_members
where deleted_at is null;

create or replace view public.flight_deck_schedule
with (security_invoker = true)
as
select
  id,
  type,
  title,
  date,
  time,
  location,
  description,
  attendees,
  requires_crew
from public.schedule_items;

create or replace view public.flight_deck_logs
with (security_invoker = true)
as
select
  id,
  log_number,
  date,
  duration_minutes,
  site,
  status
from public.flight_logs;

create or replace view public.flight_deck_balloons
with (security_invoker = true)
as
select
  id,
  name,
  type,
  description,
  volume,
  capacity,
  burner,
  image_url,
  status
from public.balloons
where deleted_at is null;

revoke all on public.flight_deck_crew,
  public.flight_deck_schedule,
  public.flight_deck_logs,
  public.flight_deck_balloons
from public, anon, authenticated;

grant select on public.flight_deck_crew,
  public.flight_deck_schedule,
  public.flight_deck_logs,
  public.flight_deck_balloons
to authenticated;
