import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params
  const data = await request.json()

  try {
    const { data: updatedPersonaCargo, error } = await supabase
      .from('persona_cargos')
      .update(data)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(updatedPersonaCargo[0])
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  try {
    const { error } = await supabase
      .from('persona_cargos')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Cargo eliminado exitosamente' })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 