import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { withAuth } from '../middleware'

const GET = withAuth(async (req) => {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('persona')
      .select('*')
      .order('nombre')

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
});

const POST = withAuth(async (req) => {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await req.json()

  try {
    const { data: newPersona, error } = await supabase
      .from('persona')
      .insert([data])
      .select()

    if (error) throw error

    return NextResponse.json(newPersona[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
});

export { GET, POST } 