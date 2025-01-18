'use client'
import { useState, useEffect } from 'react';

export default function PartidoForm() {
  const [partidos, setPartidos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    sector_id: '',
    foto: ''
  });
  const [sectores, setSectores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPartidos();
    fetchSectores();
  }, []);

  const fetchPartidos = async () => {
    try {
      const response = await fetch('/api/partidos');
      if (!response.ok) throw new Error('Error al cargar partidos');
      const data = await response.json();
      setPartidos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los partidos');
    }
  };

  const fetchSectores = async () => {
    try {
      const response = await fetch('/api/sectores');
      if (!response.ok) throw new Error('Error al cargar sectores');
      const data = await response.json();
      setSectores(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los sectores');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `/api/partidos/${editingId}` 
        : '/api/partidos';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Error al procesar la solicitud');

      const result = await response.json();
      alert(editingId ? 'Partido actualizado exitosamente' : 'Partido creado exitosamente');

      setFormData({
        nombre: '',
        sector_id: '',
        foto: ''
      });
      setEditingId(null);
      fetchPartidos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (partido) => {
    setFormData({
      nombre: partido.nombre,
      sector_id: partido.sector_id,
      foto: partido.foto
    });
    setEditingId(partido.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este partido?')) return;
    
    try {
      const response = await fetch(`/api/partidos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar');

      alert('Partido eliminado exitosamente');
      fetchPartidos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sector</label>
          <select
            name="sector_id"
            value={formData.sector_id}
            onChange={(e) => setFormData({...formData, sector_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione sector</option>
            {sectores.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL de la Foto</label>
          <input
            type="url"
            name="foto"
            value={formData.foto}
            onChange={(e) => setFormData({...formData, foto: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partidos.map(partido => (
              <tr key={partido.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{partido.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {partido.sector?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(partido)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(partido.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 