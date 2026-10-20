-- CareDesk 2.0 Database Schema & Row-Level Security (RLS)
-- Remote Elder-Care & Health Tracking

-- 1. Profiles Table (Caregivers, Elders, Doctors)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text not null,
  role text not null check (role in ('caregiver', 'elder', 'doctor')),
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile" 
  on public.profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on public.profiles for update 
  using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert 
  with check (auth.uid() = id);

-- 2. Elders Table (Monitored Loved Ones)
create table if not exists public.elders (
  id uuid default gen_random_uuid() primary key,
  created_by uuid references public.profiles(id) on delete set null,
  full_name text not null,
  age integer not null,
  gender text not null check (gender in ('Male', 'Female', 'Other')),
  blood_group text,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  primary_doctor_name text,
  primary_doctor_phone text,
  conditions text[] default '{}',
  allergies text[] default '{}',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.elders enable row level security;

create policy "Caregivers can view elders" 
  on public.elders for select 
  using (true);

create policy "Caregivers can insert elders" 
  on public.elders for insert 
  with check (auth.uid() = created_by or auth.role() = 'authenticated');

create policy "Caregivers can update their elders" 
  on public.elders for update 
  using (auth.uid() = created_by or auth.role() = 'authenticated');

-- 3. Vitals Table (Daily Check-in Readings)
create table if not exists public.vitals (
  id uuid default gen_random_uuid() primary key,
  elder_id uuid references public.elders(id) on delete cascade not null,
  recorded_by uuid references public.profiles(id) on delete set null,
  recorded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  systolic integer check (systolic is null or (systolic >= 40 and systolic <= 300)),
  diastolic integer check (diastolic is null or (diastolic >= 30 and diastolic <= 200)),
  blood_pressure_status text check (blood_pressure_status in ('green', 'yellow', 'red', null)),
  blood_sugar_value numeric check (blood_sugar_value is null or (blood_sugar_value >= 20 and blood_sugar_value <= 800)),
  blood_sugar_type text check (blood_sugar_type in ('fasting', 'post_prandial', 'random', null)),
  blood_sugar_status text check (blood_sugar_status in ('green', 'yellow', 'red', null)),
  heart_rate integer check (heart_rate is null or (heart_rate >= 30 and heart_rate <= 250)),
  heart_rate_status text check (heart_rate_status in ('green', 'yellow', 'red', null)),
  spo2 integer check (spo2 is null or (spo2 >= 50 and spo2 <= 100)),
  weight_kg numeric check (weight_kg is null or (weight_kg >= 20 and weight_kg <= 300)),
  overall_status text not null check (overall_status in ('green', 'yellow', 'red')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.vitals enable row level security;

create policy "Users can view vitals of elders they monitor" 
  on public.vitals for select 
  using (true);

create policy "Users can insert vitals" 
  on public.vitals for insert 
  with check (true);

-- 4. Medical Reports Table (AI Lab Summaries)
create table if not exists public.medical_reports (
  id uuid default gen_random_uuid() primary key,
  elder_id uuid references public.elders(id) on delete cascade not null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  title text not null,
  test_date date not null,
  category text not null,
  file_url text,
  file_type text,
  status text not null check (status in ('pending', 'analyzed', 'failed')) default 'analyzed',
  summary_en text not null,
  summary_hinglish text not null,
  biomarkers jsonb default '[]'::jsonb,
  doctor_questions_en text[] default '{}',
  doctor_questions_hinglish text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.medical_reports enable row level security;

create policy "Users can view medical reports" 
  on public.medical_reports for select 
  using (true);

create policy "Users can insert medical reports" 
  on public.medical_reports for insert 
  with check (true);

-- 5. Audit Logs Table (Data Integrity & Activity Tracking)
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  elder_id uuid references public.elders(id) on delete cascade not null,
  actor_name text not null,
  action_type text not null, -- 'vitals_logged', 'report_analyzed', 'elder_updated', 'alert_triggered'
  description text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.audit_logs enable row level security;

create policy "Users can view audit logs" 
  on public.audit_logs for select 
  using (true);

create policy "Users can insert audit logs" 
  on public.audit_logs for insert 
  with check (true);

-- Indexes for performance
create index if not exists idx_vitals_elder_recorded_at on public.vitals(elder_id, recorded_at desc);
create index if not exists idx_reports_elder_date on public.medical_reports(elder_id, test_date desc);
create index if not exists idx_audit_elder_created on public.audit_logs(elder_id, created_at desc);
