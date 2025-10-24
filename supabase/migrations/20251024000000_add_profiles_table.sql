-- Drop existing profiles table if it exists
drop table if exists public.profiles;

-- Create profiles table
-- Drop and recreate profiles table
drop table if exists public.profiles;

-- Create profiles table with correct column names and constraints
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text default '',
  phone_number text default '',
  address text default '',
  avatar_url text default '',
  loyalty_points integer default 0 check (loyalty_points >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add update trigger for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function update_updated_at_column();

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;

-- Create policies with explicit permissions
create policy "Users can view their own profile"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- Enable security by default
alter table public.profiles force row level security;

-- Create a trigger to create a profile entry when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create storage bucket for avatars
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true);

-- Allow public access to avatar files
create policy "Avatar files are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- Allow authenticated users to upload avatar files
create policy "Users can upload their own avatar file"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' AND
    auth.uid() = (storage.foldername(name)::uuid)
  );

-- Allow users to update their own avatar file
create policy "Users can update their own avatar file"
  on storage.objects for update
  using (
    bucket_id = 'avatars' AND
    auth.uid() = (storage.foldername(name)::uuid)
  );