'use client'
import { useState, useEffect } from 'react';
import apiClient from '@/lib/api-client';

export default function PersonaCargoForm() {
  const [personaCargos, setPersonaCargos] = useState([]);
  const [formData, setFormData] = useState({
    persona_id: '',
    empresa_id: '',
    ente_publico_id: '',
    division_id: '',
    cargo: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: ''
  });
  const [personas, setPersonas] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [entesPublicos, setEntesPublicos] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPersonaCargos();
    fetchPersonas();
    fetchEmpresas();
    fetchEntesPublicos();
    fetchDivisiones();
  }, []);

  const fetchPersonaCargos = async () => {
    try {
      const data = await apiClient.get('/api/persona-cargos');
      setPersonaCargos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los cargos');
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

  const fetchEmpresas = async () => {
    try {
      const data = await apiClient.get('/api/empresas');
      setEmpresas(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las empresas');
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

  const fetchDivisiones = async () => {
    try {
      const data = await apiClient.get('/api/divisiones');
      setDivisiones(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las divisiones');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/api/persona-cargos/${editingId}`, formData);
        alert('Cargo actualizado exitosamente');
      } else {
        await apiClient.post('/api/persona-cargos', formData);
        alert('Cargo creado exitosamente');
      }

      setFormData({
        persona_id: '',
        empresa_id: '',
        ente_publico_id: '',
        division_id: '',
        cargo: '',
        fecha_inicio: '',
        fecha_fin: '',
        descripcion: ''
      });
      setEditingId(null);
      fetchPersonaCargos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (personaCargo) => {
    setFormData({
      persona_id: personaCargo.persona_id,
      empresa_id: personaCargo.empresa_id,
      ente_publico_id: personaCargo.ente_publico_id,
      division_id: personaCargo.division_id,
      cargo: personaCargo.cargo,
      fecha_inicio: personaCargo.fecha_inicio,
      fecha_fin: personaCargo.fecha_fin,
      descripcion: personaCargo.descripcion
    });
    setEditingId(personaCargo.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cargo?')) return;
    
    try {
      await apiClient.delete(`/api/persona-cargos/${id}`);
      alert('Cargo eliminado exitosamente');
      fetchPersonaCargos();
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
            name="persona_id"
            value={formData.persona_id}
            onChange={(e) => setFormData({...formData, persona_id: e.target.value})}
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
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <select
            name="empresa_id"
            value={formData.empresa_id}
            onChange={(e) => setFormData({...formData, empresa_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione empresa</option>
            {empresas.map(empresa => (
              <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ente Público</label>
          <select
            name="ente_publico_id"
            value={formData.ente_publico_id}
            onChange={(e) => setFormData({...formData, ente_publico_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione ente público</option>
            {entesPublicos.map(ente => (
              <option key={ente.id} value={ente.id}>{ente.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">División</label>
          <select
            name="division_id"
            value={formData.division_id}
            onChange={(e) => setFormData({...formData, division_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione división</option>
            {divisiones.map(division => (
              <option key={division.id} value={division.id}>{division.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={(e) => setFormData({...formData, cargo: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persona</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {personaCargos.map(personaCargo => (
              <tr key={personaCargo.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {personaCargo.persona?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {personaCargo.cargo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {personaCargo.empresa?.nombre || personaCargo.ente_publico?.nombre || personaCargo.division?.nombre || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {personaCargo.fecha_inicio} - {personaCargo.fecha_fin || 'Actual'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(personaCargo)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(personaCargo.id)}
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