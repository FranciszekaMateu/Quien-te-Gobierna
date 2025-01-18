'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export default function UniversidadForm() {
  const [universidades, setUniversidades] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    foto: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUniversidades();
  }, []);

  const fetchUniversidades = async () => {
    try {
      const data = await apiClient.get('/api/universidades');
      setUniversidades(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las universidades');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/api/universidades/${editingId}`, formData);
        alert('Universidad actualizada exitosamente');
      } else {
        await apiClient.post('/api/universidades', formData);
        alert('Universidad creada exitosamente');
      }

      setFormData({
        nombre: '',
        foto: ''
      });
      setEditingId(null);
      fetchUniversidades();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (universidad) => {
    setFormData({
      nombre: universidad.nombre,
      foto: universidad.foto
    });
    setEditingId(universidad.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta universidad?')) return;
    
    try {
      await apiClient.delete(`/api/universidades/${id}`);
      alert('Universidad eliminada exitosamente');
      fetchUniversidades();
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {universidades.map(universidad => (
              <tr key={universidad.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{universidad.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(universidad)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(universidad.id)}
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