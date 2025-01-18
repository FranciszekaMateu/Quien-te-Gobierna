'use client'
import { useState } from "react";
import TypeWriter from "@/components/TypeWriter";
import FilterMenu from '@/components/FilterMenu';
import NetworkGraph from '@/components/NetworkGraph';
import ExecutiveHierarchy from '@/components/ExecutiveHierarchy';

export default function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [activeSection, setActiveSection] = useState('network');

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <header className="border-b border-gray-200 dark:border-gray-800">
        {/* Top bar */}
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-end items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('es-UY', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="serif-title text-5xl sm:text-6xl mb-4 leading-tight">
              <TypeWriter 
                text="¿Quién me gobierna?" 
                delay={100}
                onComplete={() => setShowSubtitle(true)}
                className="inline-block"
              />
            </h1>
            {showSubtitle && (
              <p className="article-text text-xl mt-4 text-gray-600">
                <TypeWriter 
                  text="Explorando la transparencia en la gestión pública uruguaya"
                  delay={50}
                  className="inline-block"
                />
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex justify-center space-x-8 py-4">
              <button 
                onClick={() => setActiveSection('network')}
                className={`nav-link ${activeSection === 'network' ? 'text-gray-900' : ''}`}
              >
                Parlamentarios
              </button>
              <button 
                onClick={() => setActiveSection('executive')}
                className={`nav-link ${activeSection === 'executive' ? 'text-gray-900' : ''}`}
              >
                Ejecutivo
              </button>
              <a href="#" className="nav-link">Conexiones</a>
              <a href="#" className="nav-link">Análisis</a>
              <a href="#" className="nav-link">Metodología</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <section className="relative container mx-auto px-4 py-8">
        {activeSection === 'network' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg elegant-shadow">
            <div className="absolute top-12 left-8 z-20">
              <FilterMenu />
            </div>
            <div className="w-full h-[calc(100vh-16rem)] bg-white dark:bg-gray-800 rounded-lg">
              <NetworkGraph />
            </div>
          </div>
        ) : (
          <ExecutiveHierarchy />
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="serif-title text-xl mb-4">Sobre el proyecto</h3>
              <p className="article-text text-sm leading-relaxed">
                Una iniciativa independiente dedicada a transparentar las relaciones 
                políticas en Uruguay, proporcionando información objetiva y verificable 
                sobre las conexiones entre los actores políticos más influyentes del país.
              </p>
            </div>
            <div>
              <h3 className="serif-title text-xl mb-4">Contacto</h3>
              <div className="space-y-2">
                <p className="article-text text-sm">
                  <strong>Email:</strong><br />
                  info@quienmegobierna.uy
                </p>
                <p className="article-text text-sm">
                  <strong>Dirección:</strong><br />
                  Montevideo, Uruguay
                </p>
              </div>
            </div>
            <div>
              <h3 className="serif-title text-xl mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Social media icons */}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} ¿Quién me gobierna? Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
