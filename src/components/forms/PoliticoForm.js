'use client'
import { useState, useEffect } from 'react';

export default function PoliticoForm() {
  const [politicos, setPoliticos] = useState([]);
  const [formData, setFormData] = useState({
    persona_id: '',
    partido_id: '',
    sector_id: '',
    cargo_previo: false
  });
  const [personas, setPersonas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPoliticos();
    fetchPersonas();
    fetchPartidos();
    fetchSectores();
  }, []);

  const fetchPoliticos = async () => {
    try {
      const response = await fetch('/api/politicos');
      if (!response.ok) throw new Error('Error al cargar políticos');
      const data = await response.json();
      setPoliticos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los políticos');
    }
  };

  const fetchPersonas = async () => {
    try {
      const response = await fetch('/api/personas');
      if (!response.ok) throw new Error('Error al cargar personas');
      const data = await response.json();
      setPersonas(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las personas');
    }
  };

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
        ? `/api/politicos/${editingId}` 
        : '/api/politicos';
      
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
      alert(editingId ? 'Político actualizado exitosamente' : 'Político creado exitosamente');

      setFormData({
        persona_id: '',
        partido_id: '',
        sector_id: '',
        cargo_previo: false
      });
      setEditingId(null);
      fetchPoliticos();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (politico) => {
    setFormData({
      persona_id: politico.persona_id,
      partido_id: politico.partido_id,
      sector_id: politico.sector_id,
      cargo_previo: politico.cargo_previo
    });
    setEditingId(politico.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este político?')) return;
    
    try {
      const response = await fetch(`/api/politicos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar');

      alert('Político eliminado exitosamente');
      fetchPoliticos();
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
          <label className="block text-sm font-medium text-gray-700">Partido Político</label>
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

        <div className="flex items-center">
          <input
            type="checkbox"
            name="cargo_previo"
            checked={formData.cargo_previo}
            onChange={(e) => setFormData({...formData, cargo_previo: e.target.checked})}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            ¿Ha tenido cargos previos?
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
        <h3 className="text-lg font-medium text-gray-900">Políticos Registrados</h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Persona</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Partido</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sector</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cargo Previo</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {politicos.map((politico) => (
                      <tr key={politico.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {personas.find(p => p.id === politico.persona_id)?.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {partidos.find(p => p.id === politico.partido_id)?.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {sectores.find(s => s.id === politico.sector_id)?.nombre}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {politico.cargo_previo ? 'Sí' : 'No'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleEdit(politico)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(politico.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
} 