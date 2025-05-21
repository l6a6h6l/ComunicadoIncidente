import React, { useState, useEffect } from 'react';

const ComunicadoIncidente = () => {
  const [tipoNotificacion, setTipoNotificacion] = useState('GESTIÓN INCIDENTE');
  const [estado, setEstado] = useState('En revisión');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [duracion, setDuracion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [impacto, setImpacto] = useState('');
  const [resolucion, setResolucion] = useState('');
  const [telefono, setTelefono] = useState('+1 224 813 7200');
  const [referencia, setReferencia] = useState('');
  const [vistaPrevia, setVistaPrevia] = useState(false);

  // Calcular duración cuando se actualizan las horas
  useEffect(() => {
    if (horaInicio && horaFin) {
      try {
        // Convertir a formato de 24 horas para el cálculo
        const inicio = horaInicio.split(':');
        const fin = horaFin.split(':');
        
        if (inicio.length === 2 && fin.length === 2) {
          // Crear objetos Date y establecer horas y minutos
          const fechaInicio = new Date();
          fechaInicio.setHours(parseInt(inicio[0]), parseInt(inicio[1]), 0);
          
          const fechaFin = new Date();
          fechaFin.setHours(parseInt(fin[0]), parseInt(fin[1]), 0);
          
          // Si la hora de fin es anterior a la de inicio, asumimos que es el día siguiente
          if (fechaFin < fechaInicio) {
            fechaFin.setDate(fechaFin.getDate() + 1);
          }
          
          // Calcular diferencia en minutos
          const diffMinutos = Math.round((fechaFin - fechaInicio) / (1000 * 60));
          const horas = Math.floor(diffMinutos / 60);
          const minutos = diffMinutos % 60;
          
          // Formatear resultado
          setDuracion(`${horas}h ${minutos}m`);
        }
      } catch (e) {
        setDuracion('');
      }
    } else {
      setDuracion('');
    }
  }, [horaInicio, horaFin]);

  const handleVistaPrevia = () => {
    // Generar referencia si no existe
    if (!referencia) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = 'MSG';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setReferencia(result + '_' + Date.now().toString().slice(-8));
    }
    setVistaPrevia(true);
  };

  const handleVolverEditor = () => {
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
            type="date" 
            value={fecha} 
            onChange={(e) => {
              // Convertir formato YYYY-MM-DD a DD/MM/YYYY
              const date = new Date(e.target.value);
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const year = date.getFullYear();
              setFecha(`${day}/${month}/${year}`);
            }}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Hora Inicio (HH:MM)</label>
          <input 
            type="time" 
            onChange={(e) => setHoraInicio(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <span className="text-xs text-gray-500">Hora ecuatoriana (GMT-5)</span>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Hora Fin (HH:MM)</label>
          <input 
            type="time" 
            onChange={(e) => setHoraFin(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      {duracion && (
        <div className="bg-blue-50 p-2 rounded border border-blue-200 text-sm">
          <span className="font-medium">Duración del incidente: </span>{duracion}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Descripción del Problema</label>
        <textarea 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Aquí describir brevemente el incidente o evento técnico incluyendo detalles relevantes"
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Impacto</label>
        <textarea 
          value={impacto} 
          onChange={(e) => setImpacto(e.target.value)}
          placeholder="Detallar las consecuencias para los usuarios/clientes y posibles plazos de resolución"
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Resolución</label>
        <textarea 
          value={resolucion} 
          onChange={(e) => setResolucion(e.target.value)}
          placeholder="Explicar las acciones tomadas para resolver el problema y su estado actual"
          className="w-full p-2 border rounded h-20"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Teléfono de Soporte</label>
        <input 
          type="text" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+1 224 813 7200"
          className="w-full p-2 border rounded"
        />
      </div>

      <button 
        onClick={() => handleVistaPrevia()} 
        className="bg-[#0066B2] text-white px-4 py-2 rounded hover:bg-blue-700"
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
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>
      
      <div className="p-6 space-y-4 border border-gray-300">
        <div>
          <h2 className="text-[#0066B2] font-bold text-base">Problema</h2>
          <p className="text-sm">
            {fecha && horaInicio && horaFin ? 
              `Desde ${horaInicio} hasta ${horaFin} ${duracion ? `(${duracion})` : ''} el ${fecha}, ${descripcion}` : 
              descripcion || 'No se ha proporcionado información del problema'}
          </p>
        </div>
        
        <div>
          <h2 className="text-[#0066B2] font-bold text-base">Impacto</h2>
          <p className="text-sm">{impacto || 'No se ha proporcionado información sobre el impacto'}</p>
        </div>
        
        <div>
          <h2 className="text-[#0066B2] font-bold text-base">Resolución</h2>
          <p className="text-sm">{resolucion || 'No se ha proporcionado información sobre la resolución'}</p>
        </div>
        
        <div>
          <h2 className="text-[#0066B2] font-bold text-base">Soporte</h2>
          <p className="text-sm">
            Los participantes deben contactar al Centro de Comando DCI al {telefono} para asistencia. Las preguntas pueden enviarse usando 
            el <a href="/" className="text-[#0066B2] underline">formulario de HAGA UNA PREGUNTA A DCI</a> en InfoNet.
          </p>
        </div>
      </div>
      
      <div className="bg-[#102040] text-white p-3 flex space-x-4 text-sm">
        <a href="/" className="text-blue-300 hover:underline">Darse de baja</a>
        <span>|</span>
        <a href="/" className="text-blue-300 hover:underline">Gestionar Preferencias</a>
      </div>
      
      <div className="mt-2 text-xs text-gray-600">
        Ref:{referencia}
      </div>
      
      <div className="mt-4">
        <button 
          onClick={() => handleVolverEditor()} 
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
