'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export default function ParlamentarioForm() {
  const [parlamentarios, setParlamentarios] = useState([]);
  const [formData, setFormData] = useState({
    id: '', // id es el mismo que persona_id
    departamento_electo_id: '',
    periodo_inicio: '',
    periodo_fin: '',
    partido_id: '',
    cargo_previo: false
  });
  const [personas, setPersonas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchParlamentarios();
    fetchPersonas();
    fetchDepartamentos();
    fetchPartidos();
  }, []);

  const fetchParlamentarios = async () => {
    try {
      const data = await apiClient.get('/api/parlamentarios');
      setParlamentarios(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los parlamentarios');
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

  const fetchDepartamentos = async () => {
    try {
      const data = await apiClient.get('/api/departamentos');
      setDepartamentos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los departamentos');
    }
  };

  const fetchPartidos = async () => {
    try {
      const data = await apiClient.get('/api/partidos');
      setPartidos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los partidos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/api/parlamentarios/${editingId}`, formData);
        alert('Parlamentario actualizado exitosamente');
      } else {
        await apiClient.post('/api/parlamentarios', formData);
        alert('Parlamentario creado exitosamente');
      }

      setFormData({
        id: '',
        departamento_electo_id: '',
        periodo_inicio: '',
        periodo_fin: '',
        partido_id: '',
        cargo_previo: false
      });
      setEditingId(null);
      fetchParlamentarios();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (parlamentario) => {
    setFormData({
      id: parlamentario.id,
      departamento_electo_id: parlamentario.departamento_electo_id,
      periodo_inicio: parlamentario.periodo_inicio,
      periodo_fin: parlamentario.periodo_fin,
      partido_id: parlamentario.partido_id,
      cargo_previo: parlamentario.cargo_previo
    });
    setEditingId(parlamentario.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este parlamentario?')) return;
    
    try {
      await apiClient.delete(`/api/parlamentarios/${id}`);
      alert('Parlamentario eliminado exitosamente');
      fetchParlamentarios();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Persona</label>
          <select
            name="id"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
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
          <label className="block text-sm font-medium text-gray-700">Departamento Electo</label>
          <select
            name="departamento_electo_id"
            value={formData.departamento_electo_id}
            onChange={(e) => setFormData({...formData, departamento_electo_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione departamento</option>
            {departamentos.map(departamento => (
              <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Partido</label>
          <select
            name="partido_id"
            value={formData.partido_id}
            onChange={(e) => setFormData({...formData, partido_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccione partido</option>
            {partidos.map(partido => (
              <option key={partido.id} value={partido.id}>{partido.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Periodo Inicio</label>
          <input
            type="date"
            name="periodo_inicio"
            value={formData.periodo_inicio}
            onChange={(e) => setFormData({...formData, periodo_inicio: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Periodo Fin</label>
          <input
            type="date"
            name="periodo_fin"
            value={formData.periodo_fin}
            onChange={(e) => setFormData({...formData, periodo_fin: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="cargo_previo"
            checked={formData.cargo_previo}
            onChange={(e) => setFormData({...formData, cargo_previo: e.target.checked})}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Cargo Previo
          </label>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parlamentarios.map(parlamentario => (
              <tr key={parlamentario.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parlamentario.politico?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parlamentario.departamento?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parlamentario.partido?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parlamentario.periodo_inicio} - {parlamentario.periodo_fin || 'Actual'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(parlamentario)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(parlamentario.id)}
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