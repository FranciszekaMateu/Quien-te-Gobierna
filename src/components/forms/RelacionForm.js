'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export default function RelacionForm() {
  const [relaciones, setRelaciones] = useState([]);
  const [formData, setFormData] = useState({
    persona1_id: '',
    persona2_id: '',
    tipo_relacion: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: ''
  });
  const [personas, setPersonas] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRelaciones();
    fetchPersonas();
  }, []);

  const fetchRelaciones = async () => {
    try {
      const data = await apiClient.get('/api/relaciones');
      setRelaciones(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las relaciones');
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
        await apiClient.put(`/api/relaciones/${editingId}`, formData);
        alert('Relación actualizada exitosamente');
      } else {
        await apiClient.post('/api/relaciones', formData);
        alert('Relación creada exitosamente');
      }

      setFormData({
        persona1_id: '',
        persona2_id: '',
        tipo_relacion: '',
        fecha_inicio: '',
        fecha_fin: '',
        descripcion: ''
      });
      setEditingId(null);
      fetchRelaciones();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (relacion) => {
    setFormData({
      persona1_id: relacion.persona1_id,
      persona2_id: relacion.persona2_id,
      tipo_relacion: relacion.tipo_relacion,
      fecha_inicio: relacion.fecha_inicio,
      fecha_fin: relacion.fecha_fin,
      descripcion: relacion.descripcion
    });
    setEditingId(relacion.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta relación?')) return;
    
    try {
      await apiClient.delete(`/api/relaciones/${id}`);
      alert('Relación eliminada exitosamente');
      fetchRelaciones();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  };

  const tiposRelacion = [
    'Familiar',
    'Laboral',
    'Académica',
    'Política',
    'Social',
    'Otro'
  ];

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Persona 1</label>
          <select
            name="persona1_id"
            value={formData.persona1_id}
            onChange={(e) => setFormData({...formData, persona1_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione persona</option>
            {personas.map(persona => (
              <option key={persona.id} value={persona.id}>{persona.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Persona 2</label>
          <select
            name="persona2_id"
            value={formData.persona2_id}
            onChange={(e) => setFormData({...formData, persona2_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione persona</option>
            {personas.map(persona => (
              <option key={persona.id} value={persona.id}>{persona.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Relación</label>
          <select
            name="tipo_relacion"
            value={formData.tipo_relacion}
            onChange={(e) => setFormData({...formData, tipo_relacion: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione tipo</option>
            {tiposRelacion.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={(e) => setFormData({...formData, fecha_inicio: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={(e) => setFormData({...formData, fecha_fin: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {relaciones.map(relacion => (
              <tr key={relacion.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {relacion.persona1?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {relacion.persona2?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {relacion.tipo_relacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {relacion.fecha_inicio} - {relacion.fecha_fin || 'Actual'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(relacion)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(relacion.id)}
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