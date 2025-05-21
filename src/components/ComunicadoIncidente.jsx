import React, { useState } from 'react';

const ComunicadoIncidente = () => {
  const [tipoNotificacion, setTipoNotificacion] = useState('GESTIÓN INCIDENTE');
  const [estado, setEstado] = useState('En revisión');
  const [fecha, setFecha] = useState('25/04/2025');
  const [horaInicio, setHoraInicio] = useState('10:18 GMT');
  const [horaFin, setHoraFin] = useState('14:45 GMT');
  const [descripcion, setDescripcion] = useState('el Procesamiento por Lotes de Intercambio DCI se retrasó');
  const [impacto, setImpacto] = useState('Es posible que una parte de las recapitulaciones no se haya procesado. Estas recapitulaciones se procesarán el 28 de abril de 2025, lo que causará un retraso de un día en la financiación de liquidaciones.');
  const [resolucion, setResolucion] = useState('Los equipos de soporte técnico han resuelto el problema.');
  const [telefono, setTelefono] = useState('+1 224 813 7200');
  const [referencia, setReferencia] = useState('MSG194399725_qvgawfa4Evv9LNt4RE');
  const [vistaPrevia, setVistaPrevia] = useState(false);

  const generarReferencia = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'MSG';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result + '_' + Date.now().toString().slice(-8);
  };

  const handleSubmit = () => {
    if (!referencia) {
      setReferencia(generarReferencia());
    }
    setVistaPrevia(true);
  };

  const volver = () => {
    setVistaPrevia(false);
  };

  const FormularioIncidente = () => (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Crear Comunicado</h2>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Tipo de Notificación</label>
          <select 
            value={tipoNotificacion} 
            onChange={(e) => setTipoNotificacion(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="GESTIÓN INCIDENTE">GESTIÓN INCIDENTE</option>
            <option value="GESTIÓN EVENTO">GESTIÓN EVENTO</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Estado</label>
          <select 
            value={estado} 
            onChange={(e) => setEstado(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="En revisión">En revisión</option>
            <option value="Avance">Avance</option>
            <option value="Resuelto">Resuelto</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Fecha (DD/MM/YYYY)</label>
          <input 
            type="text" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)}
            placeholder="25/04/2025"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Hora Inicio (HH:MM GMT)</label>
          <input 
            type="text" 
            value={horaInicio} 
            onChange={(e) => setHoraInicio(e.target.value)}
            placeholder="10:18 GMT"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Hora Fin (HH:MM GMT)</label>
          <input 
            type="text" 
            value={horaFin} 
            onChange={(e) => setHoraFin(e.target.value)}
            placeholder="14:45 GMT"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción del Problema</label>
        <textarea 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Proceso de lotes interrumpido..."
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Impacto</label>
        <textarea 
          value={impacto} 
          onChange={(e) => setImpacto(e.target.value)}
          placeholder="Algunos recaps no han sido procesados..."
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resolución</label>
        <textarea 
          value={resolucion} 
          onChange={(e) => setResolucion(e.target.value)}
          placeholder="Los equipos de soporte técnico han resuelto el problema."
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono de Soporte</label>
        <input 
          type="text" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button 
        onClick={handleSubmit} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Vista Previa
      </button>
    </div>
  );

  const ComunicadoPreview = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#102040] text-white p-4 flex items-center">
        <h1 className="text-2xl font-bold tracking-wider">{tipoNotificacion}</h1>
        <div className="ml-auto">
          <img 
            src="https://www.dropbox.com/scl/fi/wr90vk30xq57j0w9mqxpl/logo.png?rlkey=yy1117ess35a6uc5lwbdziq6u&raw=1" 
            alt="Logo Oficial" 
            className="h-14 w-14 object-contain"
          />
        </div>
      </div>
      
      <div className="p-6 space-y-4 border border-gray-300">
        <div>
          <h2 className="text-orange-500 font-bold text-base">Problema</h2>
          <p className="text-sm">Desde {horaInicio} hasta {horaFin} el {fecha}, {descripcion}</p>
        </div>
        
        <div>
          <h2 className="text-orange-500 font-bold text-base">Impacto</h2>
          <p className="text-sm">{impacto}</p>
        </div>
        
        <div>
          <h2 className="text-orange-500 font-bold text-base">Resolución</h2>
          <p className="text-sm">{resolucion}</p>
        </div>
        
        <div>
          <h2 className="text-orange-500 font-bold text-base">Soporte</h2>
          <p className="text-sm">
            Los participantes deben contactar al Centro de Comando DCI al {telefono} para asistencia. Las preguntas pueden enviarse usando 
            el <a href="#" className="text-blue-600 underline">formulario de HAGA UNA PREGUNTA A DCI</a> en InfoNet.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-900 text-white p-3 flex space-x-4 text-sm">
        <a href="#" className="text-blue-400 hover:underline">Darse de baja</a>
        <span>|</span>
        <a href="#" className="text-blue-400 hover:underline">Gestionar Preferencias</a>
      </div>
      
      <div className="mt-2 text-xs text-gray-600">
        Ref:{referencia}
      </div>
      
      <div className="mt-4">
        <button 
          onClick={volver} 
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Volver al Editor
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {vistaPrevia ? <ComunicadoPreview /> : <FormularioIncidente />}
    </div>
  );
};

export default ComunicadoIncidente;
