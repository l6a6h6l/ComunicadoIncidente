import React from 'react';
import './App.css';
import ComunicadoIncidente from './components/ComunicadoIncidente';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4 mb-4">
        <h1 className="text-xl font-bold">Sistema de Comunicados DCI</h1>
      </header>
      <main className="container mx-auto px-4">
        <ComunicadoIncidente />
      </main>
      <footer className="text-center mt-8 text-gray-600 text-sm p-4">
        © 2025 Monitoreo - Desarrollado por Luis Alberto Herrera Lara
      </footer>
    </div>
  );
}

export default App;
