import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const cookieStore = cookies()
  cookieStore.delete('admin-auth')
  redirect('/login')
}

export async function POST() {
  const cookieStore = cookies()
  cookieStore.delete('admin-auth')
  redirect('/login')
}
