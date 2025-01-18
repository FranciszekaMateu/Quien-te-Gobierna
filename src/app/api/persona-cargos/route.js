import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase
      .from('persona_cargos')
      .select(`
        *,
        persona:persona_id(*),
        empresa:empresa_id(*),
        ente_publico:ente_publico_id(*),
        division:division_id(*)
      `)
      .order('fecha_inicio', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  const supabase = createRouteHandlerClient({ cookies })
  const data = await request.json()

  try {
    const { data: newPersonaCargo, error } = await supabase
      .from('persona_cargos')
      .insert([data])
      .select()

    if (error) throw error

    return NextResponse.json(newPersonaCargo[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 