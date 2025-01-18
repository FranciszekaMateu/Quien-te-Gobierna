export async function POST(request) {
  try {
    const data = await request.json();
    
    console.log('Datos recibidos:', data);
    
    return new Response(JSON.stringify({ message: 'Producto agregado exitosamente' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 