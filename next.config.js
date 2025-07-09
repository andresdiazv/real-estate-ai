/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hsgtvvbjlitmeozlobhg.supabase.co',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://hsgtvvbjlitmeozlobhg.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZ3R2dmJqbGl0bWVvemxvYmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMjI3MDEsImV4cCI6MjA2NzU5ODcwMX0.l7jd0lMbP0S6yLs5zYfcMNltM_Rsrt10sASP9w3piS0'
  }
}

module.exports = nextConfig 