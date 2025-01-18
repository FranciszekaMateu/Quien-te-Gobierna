'use client'
import { useState, useEffect } from 'react';

export default function PersonaForm() {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    ano_nacimiento: '',
    nivel_maximo_estudios: '',
    universidad_id: '',
    departamento_id: '',
    foto: ''
  });
  const [universidades, setUniversidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPersonas();
    fetchUniversidades();
    fetchDepartamentos();
  }, []);

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

  const fetchUniversidades = async () => {
    try {
      const response = await fetch('/api/universidades');
      if (!response.ok) throw new Error('Error al cargar universidades');
      const data = await response.json();
      setUniversidades(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar las universidades');
    }
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await fetch('/api/departamentos');
      if (!response.ok) throw new Error('Error al cargar departamentos');
      const data = await response.json();
      setDepartamentos(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los departamentos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `/api/personas/${editingId}` 
        : '/api/personas';
      
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
      alert(editingId ? 'Persona actualizada exitosamente' : 'Persona creada exitosamente');

      setFormData({
        nombre: '',
        ano_nacimiento: '',
        nivel_maximo_estudios: '',
        universidad_id: '',
        departamento_id: '',
        foto: ''
      });
      setEditingId(null);
      fetchPersonas();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const handleEdit = (persona) => {
    setFormData({
      nombre: persona.nombre,
      ano_nacimiento: persona.ano_nacimiento,
      nivel_maximo_estudios: persona.nivel_maximo_estudios,
      universidad_id: persona.universidad_id,
      departamento_id: persona.departamento_id,
      foto: persona.foto
    });
    setEditingId(persona.id);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta persona?')) return;
    
    try {
      const response = await fetch(`/api/personas/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar');

      alert('Persona eliminada exitosamente');
      fetchPersonas();
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
          <label className="block text-sm font-medium text-gray-700">Año de Nacimiento</label>
          <input
            type="number"
            name="ano_nacimiento"
            value={formData.ano_nacimiento}
            onChange={(e) => setFormData({...formData, ano_nacimiento: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel Máximo de Estudios</label>
          <select
            name="nivel_maximo_estudios"
            value={formData.nivel_maximo_estudios}
            onChange={(e) => setFormData({...formData, nivel_maximo_estudios: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione nivel</option>
            <option value="Primaria">Primaria</option>
            <option value="Secundaria">Secundaria</option>
            <option value="Terciaria">Terciaria</option>
            <option value="Universidad">Universidad</option>
            <option value="Postgrado">Postgrado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Universidad</label>
          <select
            name="universidad_id"
            value={formData.universidad_id}
            onChange={(e) => setFormData({...formData, universidad_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione universidad</option>
            {universidades.map(univ => (
              <option key={univ.id} value={univ.id}>{univ.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Departamento</label>
          <select
            name="departamento_id"
            value={formData.departamento_id}
            onChange={(e) => setFormData({...formData, departamento_id: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione departamento</option>
            {departamentos.map(depto => (
              <option key={depto.id} value={depto.id}>{depto.nombre}</option>
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
        <h3 className="text-lg font-medium text-gray-900">Personas Registradas</h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nombre</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Año</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Estudios</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {personas.map((persona) => (
                      <tr key={persona.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.nombre}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.ano_nacimiento}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{persona.nivel_maximo_estudios}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleEdit(persona)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(persona.id)}
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