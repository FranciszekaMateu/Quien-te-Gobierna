'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PersonaForm from '@/components/forms/PersonaForm';
import PoliticoForm from '@/components/forms/PoliticoForm';
import PartidoForm from '@/components/forms/PartidoForm';
import SectorForm from '@/components/forms/SectorForm';
import UniversidadForm from '@/components/forms/UniversidadForm';
import DepartamentoForm from '@/components/forms/DepartamentoForm';
import EmpresaForm from '@/components/forms/EmpresaForm';
import EntePublicoForm from '@/components/forms/EntePublicoForm';
import DivisionForm from '@/components/forms/DivisionForm';
import ParlamentarioForm from '@/components/forms/ParlamentarioForm';
import RelacionForm from '@/components/forms/RelacionForm';
import PersonaCargoForm from '@/components/forms/PersonaCargoForm';

export default function AdminDashboard() {
  const [activeForm, setActiveForm] = useState('persona');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthorized(!!session);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setIsAuthorized(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al iniciar sesión');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthorized(false);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cerrar sesión');
    }
  };

  const forms = {
    persona: <PersonaForm />,
    politico: <PoliticoForm />,
    partido: <PartidoForm />,
    sector: <SectorForm />,
    universidad: <UniversidadForm />,
    departamento: <DepartamentoForm />,
    empresa: <EmpresaForm />,
    entePublico: <EntePublicoForm />,
    division: <DivisionForm />,
    parlamentario: <ParlamentarioForm />,
    relacion: <RelacionForm />,
    personaCargo: <PersonaCargoForm />
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Panel de Administración
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Cerrar sesión
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Navigation */}
          <div className="py-4">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="-mb-px flex space-x-4">
                {Object.keys(forms).map((formKey) => (
                  <button
                    key={formKey}
                    onClick={() => setActiveForm(formKey)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeForm === formKey
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {formKey.charAt(0).toUpperCase() + formKey.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Form Container */}
          <div className="py-4">
            <div className="bg-white shadow rounded-lg p-6">
              {forms[activeForm]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 