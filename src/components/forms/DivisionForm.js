'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export default function DivisionForm() {
  const [divisiones, setDivisiones] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    ente_publico_id: '',
    jefe_id: '',
    foto: ''
  });
  const [entesPublicos, setEntesPublicos] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDivisiones();
    fetchEntesPublicos();
    fetchPersonas();
  }, []);

  const fetchDivisiones = async () => {
    try {
      const data = await apiClient.get('/api/divisiones');
      setDivisiones(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las divisiones');
    }
  };

  const fetchEntesPublicos = async () => {
    try {
      const data = await apiClient.get('/api/entes-publicos');
      setEntesPublicos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los entes públicos');
    }
  };

  const fetchPersonas = async () => {
    try {
      const data = await apiClient.get('/api/personas');
      setPersonas(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las personas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/api/divisiones/${editingId}`, formData);
        alert('División actualizada exitosamente');
      } else {
        await apiClient.post('/api/divisiones', formData);
        alert('División creada exitosamente');
      }

      setFormData({
        nombre: '',
        ente_publico_id: '',
        jefe_id: '',
        foto: ''
      });
      setEditingId(null);
      fetchDivisiones();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (division) => {
    setFormData({
      nombre: division.nombre,
      ente_publico_id: division.ente_publico_id,
      jefe_id: division.jefe_id,
      foto: division.foto
    });
    setEditingId(division.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta división?')) return;
    
    try {
      await apiClient.delete(`/api/divisiones/${id}`);
      alert('División eliminada exitosamente');
      fetchDivisiones();
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
          <label className="block text-sm font-medium text-gray-700">Ente Público</label>
          <select
            name="ente_publico_id"
            value={formData.ente_publico_id}
            onChange={(e) => setFormData({...formData, ente_publico_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione ente público</option>
            {entesPublicos.map(ente => (
              <option key={ente.id} value={ente.id}>{ente.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Jefe</label>
          <select
            name="jefe_id"
            value={formData.jefe_id}
            onChange={(e) => setFormData({...formData, jefe_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione jefe</option>
            {personas.map(persona => (
              <option key={persona.id} value={persona.id}>{persona.nombre}</option>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ente Público</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jefe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {divisiones.map(division => (
              <tr key={division.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{division.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {division.ente_publico?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {division.jefe?.nombre || 'Sin jefe asignado'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(division)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(division.id)}
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