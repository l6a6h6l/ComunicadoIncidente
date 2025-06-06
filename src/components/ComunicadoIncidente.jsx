import React, { useState } from 'react';

function ComunicadoIncidente() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    tipoNotificacion: "GESTIÓN INCIDENTE",
    estado: "En Revisión",
    prioridad: "P2",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    descripcion: "",
    impacto: "",
    resolucion: "",
    nota: "Describir la nota si aplica",
    referencia: "MSG" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString().slice(-8)
  });

  // Estados para el cálculo de prioridad
  const [mostrarCalculadoraPrioridad, setMostrarCalculadoraPrioridad] = useState(false);
  const [afectacion, setAfectacion] = useState(0);
  const [impactoUsuarios, setImpactoUsuarios] = useState(1);
  const [urgencia, setUrgencia] = useState(2);
  const [horario, setHorario] = useState(2);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleDateChange = (dateValue) => {
    try {
      const dateObj = new Date(dateValue);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      handleInputChange('fecha', `${day}/${month}/${year}`);
    } catch (e) {
      console.log("Error con la fecha");
    }
  };

  // Obtener color según estado
  const getColorEstado = () => {
    const colores = {
      'En Revisión': '#FFD700',
      'Avance': '#FFA07A', 
      'Recuperado': '#90EE90'
    };
    return colores[formData.estado] || '#FFD700';
  };

  // Calcular el puntaje de prioridad
  const calcularPuntajePrioridad = () => {
    return afectacion + impactoUsuarios + urgencia + horario;
  };

  // Actualizar la prioridad basada en el puntaje
  const actualizarPrioridad = (puntaje) => {
    let nuevaPrioridad;
    if (puntaje >= 12) {
      nuevaPrioridad = 'P1';
    } else if (puntaje >= 10 && puntaje <= 11) {
      nuevaPrioridad = 'P2';
    } else if (puntaje >= 5 && puntaje <= 9) {
      nuevaPrioridad = 'P3';
    } else {
      nuevaPrioridad = 'P4';
    }
    handleInputChange('prioridad', nuevaPrioridad);
  };

  // Manejar cambios en el cálculo de prioridad
  const handleAfectacionChange = (value) => {
    setAfectacion(value);
    const newPuntaje = value + impactoUsuarios + urgencia + horario;
    actualizarPrioridad(newPuntaje);
  };

  const handleImpactoChange = (value) => {
    setImpactoUsuarios(value);
    const newPuntaje = afectacion + value + urgencia + horario;
    actualizarPrioridad(newPuntaje);
  };

  const handleUrgenciaChange = (value) => {
    setUrgencia(value);
    const newPuntaje = afectacion + impactoUsuarios + value + horario;
    actualizarPrioridad(newPuntaje);
  };

  const handleHorarioChange = (value) => {
    setHorario(value);
    const newPuntaje = afectacion + impactoUsuarios + urgencia + value;
    actualizarPrioridad(newPuntaje);
  };
  
  const calcularDuracion = () => {
    if (!formData.horaInicio || !formData.horaFin) return "";
    
    try {
      const [horaI, minI] = formData.horaInicio.split(":").map(num => parseInt(num, 10));
      const [horaF, minF] = formData.horaFin.split(":").map(num => parseInt(num, 10));
      
      let diferenciaEnMinutos = (horaF * 60 + minF) - (horaI * 60 + minI);
      if (diferenciaEnMinutos < 0) diferenciaEnMinutos += 24 * 60;
      
      const horas = Math.floor(diferenciaEnMinutos / 60);
      const minutos = diferenciaEnMinutos % 60;
      
      return `${horas}h ${minutos}m`;
    } catch (error) {
      return "";
    }
  };
  
  if (showForm) {
    return (
      <div style={{maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", overflow: "hidden"}}>
        <div style={{
          background: "linear-gradient(135deg, #0e1c36 0%, #1a365d 50%, #2c5282 100%)",
          color: "white", 
          padding: "20px 30px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)"
          }}></div>
          <div style={{position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "15px"}}>
            <div style={{
              fontSize: "36px",
              opacity: 0.9
            }}>
              {formData.tipoNotificacion.includes("INCIDENTE") ? "🚨" : "⚙️"}
            </div>
            <div>
              <h1 style={{
                margin: 0, 
                fontSize: "28px", 
                fontWeight: "600",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                letterSpacing: "0.5px"
              }}>
                🔧 Crear Comunicado de {formData.tipoNotificacion.includes("INCIDENTE") ? "Incidente" : "Evento"}
              </h1>
              <p style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                opacity: 0.9,
                fontWeight: "300"
              }}>
                Sistema de gestión y notificación técnica
              </p>
            </div>
          </div>
        </div>

        <div style={{padding: "20px"}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px"}}>
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Estado
              </label>
              <select 
                value={formData.estado}
                onChange={(e) => handleInputChange("estado", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              >
                <option value="En Revisión">En Revisión</option>
                <option value="Avance">Avance</option>
                <option value="Recuperado">Recuperado</option>
              </select>
            </div>
            
            <div>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px"}}>
                <label style={{display: "block", fontWeight: "bold", fontSize: "14px"}}>
                  Prioridad
                </label>
                <button 
                  type="button"
                  onClick={() => setMostrarCalculadoraPrioridad(!mostrarCalculadoraPrioridad)}
                  style={{fontSize: "12px", color: "#0066B2", backgroundColor: "transparent", border: "none", cursor: "pointer", textDecoration: "underline"}}
                >
                  {mostrarCalculadoraPrioridad ? 'Ocultar calculadora' : 'Calcular prioridad'}
                </button>
              </div>
              <select 
                value={formData.prioridad}
                onChange={(e) => handleInputChange("prioridad", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              >
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
              </select>
            </div>
            
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Tipo de Notificación
              </label>
              <select 
                value={formData.tipoNotificacion}
                onChange={(e) => handleInputChange("tipoNotificacion", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              >
                <option value="GESTIÓN INCIDENTE">GESTIÓN INCIDENTE</option>
                <option value="GESTIÓN EVENTO">GESTIÓN EVENTO</option>
              </select>
            </div>
          </div>
          
          {mostrarCalculadoraPrioridad && (
            <div style={{border: "1px solid #b3d1ff", backgroundColor: "#e6f0ff", borderRadius: "8px", padding: "15px", marginBottom: "15px"}}>
              <h3 style={{fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: "#0066B2", textAlign: "center"}}>Calculadora de Prioridad</h3>
              <p style={{textAlign: "center", marginBottom: "10px"}}>
                Puntaje actual: <span style={{fontWeight: "bold"}}>{calcularPuntajePrioridad()}</span> - Prioridad: <span style={{fontWeight: "bold", color: "#e74c3c"}}>{formData.prioridad}</span>
              </p>
              
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "15px", marginBottom: "15px"}}>
                <div style={{border: "1px solid #b3d1ff", padding: "10px", borderRadius: "8px", backgroundColor: "#f0f8ff"}}>
                  <h4 style={{fontWeight: "bold", color: "#0066B2", marginBottom: "10px", textAlign: "center", fontSize: "14px"}}>Afectación</h4>
                  {[
                    {label: 'Indisponibilidad Total (3)', value: 3},
                    {label: 'Indisponibilidad Parcial (2)', value: 2},
                    {label: 'Delay (1)', value: 1},
                    {label: 'Ninguna (0)', value: 0}
                  ].map((item, idx) => (
                    <div key={idx} style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                      <input
                        type="radio"
                        name="afectacion"
                        checked={afectacion === item.value}
                        onChange={() => handleAfectacionChange(item.value)}
                        style={{marginRight: "8px"}}
                      />
                      <label style={{fontSize: "12px"}}>{item.label}</label>
                    </div>
                  ))}
                </div>
                
                <div style={{border: "1px solid #b3d1ff", padding: "10px", borderRadius: "8px", backgroundColor: "#f0f8ff"}}>
                  <h4 style={{fontWeight: "bold", color: "#0066B2", marginBottom: "10px", textAlign: "center", fontSize: "14px"}}>Impacto</h4>
                  {[
                    {label: 'Masivo (3)', value: 3},
                    {label: 'Múltiple (2)', value: 2},
                    {label: 'Puntual (1)', value: 1}
                  ].map((item, idx) => (
                    <div key={idx} style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                      <input
                        type="radio"
                        name="impactoUsuarios"
                        checked={impactoUsuarios === item.value}
                        onChange={() => handleImpactoChange(item.value)}
                        style={{marginRight: "8px"}}
                      />
                      <label style={{fontSize: "12px"}}>{item.label}</label>
                    </div>
                  ))}
                </div>
                
                <div style={{border: "1px solid #b3d1ff", padding: "10px", borderRadius: "8px", backgroundColor: "#f0f8ff"}}>
                  <h4 style={{fontWeight: "bold", color: "#0066B2", marginBottom: "10px", textAlign: "center", fontSize: "14px"}}>Urgencia</h4>
                  {[
                    {label: 'Crítica (4)', value: 4},
                    {label: 'Alta (3)', value: 3},
                    {label: 'Media (2)', value: 2},
                    {label: 'Baja (1)', value: 1}
                  ].map((item, idx) => (
                    <div key={idx} style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                      <input
                        type="radio"
                        name="urgencia"
                        checked={urgencia === item.value}
                        onChange={() => handleUrgenciaChange(item.value)}
                        style={{marginRight: "8px"}}
                      />
                      <label style={{fontSize: "12px"}}>{item.label}</label>
                    </div>
                  ))}
                </div>
                
                <div style={{border: "1px solid #b3d1ff", padding: "10px", borderRadius: "8px", backgroundColor: "#f0f8ff"}}>
                  <h4 style={{fontWeight: "bold", color: "#0066B2", marginBottom: "10px", textAlign: "center", fontSize: "14px"}}>Horario</h4>
                  {[
                    {label: 'Alta Carga TX 08h00-23h00 (2)', value: 2},
                    {label: 'Baja Carga TX 23h00-08h00 (1)', value: 1}
                  ].map((item, idx) => (
                    <div key={idx} style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                      <input
                        type="radio"
                        name="horario"
                        checked={horario === item.value}
                        onChange={() => handleHorarioChange(item.value)}
                        style={{marginRight: "8px"}}
                      />
                      <label style={{fontSize: "11px"}}>{item.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div style={{borderTop: "1px solid #b3d1ff", paddingTop: "10px", backgroundColor: "white", padding: "10px", borderRadius: "8px"}}>
                <p style={{fontSize: "14px", marginBottom: "10px", textAlign: "center", fontWeight: "bold"}}>Criterios de prioridad:</p>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px"}}>
                  {[
                    {bg: '#ffebeb', titulo: 'P1 (≥12)', nivel: 'Alta', tiempo: '5 minutos'},
                    {bg: '#fff3e0', titulo: 'P2 (10-11)', nivel: 'Media', tiempo: '10 minutos'},
                    {bg: '#fffbf0', titulo: 'P3 (5-9)', nivel: 'Baja', tiempo: '15 minutos'},
                    {bg: '#f0f8e8', titulo: 'P4 (≤4)', nivel: 'Muy Baja', tiempo: '20 minutos'}
                  ].map((criterio, idx) => (
                    <div key={idx} style={{backgroundColor: criterio.bg, padding: "8px", borderRadius: "4px", textAlign: "center"}}>
                      <p style={{fontSize: "12px", margin: 0, fontWeight: "bold"}}>{criterio.titulo}</p>
                      <p style={{fontSize: "11px", margin: 0}}>{criterio.nivel}</p>
                      <p style={{fontSize: "11px", margin: 0}}>Atención en {criterio.tiempo}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px"}}>
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Fecha (DD/MM/YYYY)
              </label>
              <input 
                type="date"
                onChange={(e) => handleDateChange(e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              />
            </div>
            
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Hora Inicio (HH:MM)
              </label>
              <input 
                type="time"
                onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              />
              <span style={{fontSize: "12px", color: "#666"}}>Hora ecuatoriana (GMT-5)</span>
            </div>
            
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Hora Fin (HH:MM)
              </label>
              <input 
                type="time"
                onChange={(e) => handleInputChange("horaFin", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              />
            </div>
          </div>
          
          {formData.horaInicio && formData.horaFin && (
            <div style={{backgroundColor: "#e6f0ff", border: "1px solid #b3d1ff", padding: "10px", borderRadius: "4px", marginBottom: "15px", color: "#0066B2"}}>
              <span style={{fontWeight: "bold"}}>Duración estimada: </span>
              {calcularDuracion()}
            </div>
          )}
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Descripción del Problema
            </label>
            <textarea 
              value={formData.descripcion}
              onChange={(e) => handleInputChange("descripcion", e.target.value)}
              placeholder="Aquí describir brevemente el incidente o evento técnico incluyendo detalles relevantes"
              style={{
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px", 
                fontSize: "14px", 
                minHeight: "80px",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: "1.5"
              }}
              rows={4}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Impacto
            </label>
            <textarea 
              value={formData.impacto}
              onChange={(e) => handleInputChange("impacto", e.target.value)}
              placeholder="Detallar las consecuencias para los usuarios/clientes y posibles plazos de resolución"
              style={{
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px", 
                fontSize: "14px", 
                minHeight: "80px",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: "1.5"
              }}
              rows={4}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Resolución
            </label>
            <textarea 
              value={formData.resolucion}
              onChange={(e) => handleInputChange("resolucion", e.target.value)}
              placeholder="Explicar las acciones tomadas para resolver el problema y su estado actual"
              style={{
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px", 
                fontSize: "14px", 
                minHeight: "80px",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: "1.5"
              }}
              rows={4}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Texto de Nota
            </label>
            <textarea 
              value={formData.nota}
              onChange={(e) => handleInputChange("nota", e.target.value)}
              placeholder="Describir la nota si aplica - información adicional relevante"
              style={{
                width: "100%", 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px", 
                fontSize: "14px", 
                minHeight: "80px",
                resize: "vertical",
                fontFamily: "inherit",
                lineHeight: "1.5"
              }}
              rows={4}
            />
          </div>
          
          <button 
            onClick={() => setShowForm(false)}
            style={{backgroundColor: "#0066B2", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "16px"}}
          >
            Vista Previa del Comunicado
          </button>
        </div>
      </div>
    );
  }

  // Vista previa
  const duracion = calcularDuracion();
  let problemaTexto = formData.descripcion || "No se ha proporcionado información del problema";
  
  if (formData.fecha && formData.horaInicio && formData.horaFin) {
    problemaTexto = `Desde ${formData.horaInicio} hasta ${formData.horaFin}`;
    if (duracion) problemaTexto += ` (${duracion})`;
    problemaTexto += ` el ${formData.fecha}, ${formData.descripcion}`;
  }

  return (
    <div style={{maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", overflow: "hidden"}}>
      <div style={{
        background: "linear-gradient(135deg, #0e1c36 0%, #1a365d 50%, #2c5282 100%)",
        color: "white", 
        padding: "20px 30px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)"
        }}></div>
        <div style={{position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "15px"}}>
          <div style={{
            fontSize: "36px",
            opacity: 0.9
          }}>
            {formData.tipoNotificacion.includes("INCIDENTE") ? "🚨" : "⚙️"}
          </div>
          <h1 style={{
            margin: 0, 
            fontSize: "32px", 
            fontWeight: "700",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            letterSpacing: "0.5px"
          }}>
            {formData.tipoNotificacion}
          </h1>
        </div>
        <img 
          src="https://www.dropbox.com/scl/fi/wr90vk30xq57j0w9mqxpl/logo.png?rlkey=yy1117ess35a6uc5lwbdziq6u&raw=1"
          alt="Logo DCI" 
          style={{
            width: "100px", 
            height: "100px", 
            objectFit: "contain",
            position: "absolute",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)"
          }}
        />
      </div>
      
      <div style={{padding: "20px"}}>
        <div style={{border: "1px solid #ccc", padding: "20px", marginBottom: "15px", position: "relative"}}>
          <div style={{position: "absolute", top: "15px", right: "15px", display: "flex", gap: "10px"}}>
            <div style={{backgroundColor: "#fff8dc", color: "#B7950B", padding: "8px 12px", borderRadius: "8px", textAlign: "center", minWidth: "60px", border: "2px solid #B7950B"}}>
              <div style={{fontSize: "11px", fontWeight: "bold", marginBottom: "2px"}}>Estado</div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"}}>
                <div 
                  style={{
                    width: "12px", 
                    height: "12px", 
                    borderRadius: "50%", 
                    backgroundColor: getColorEstado()
                  }}
                ></div>
                <div style={{fontSize: "12px", fontWeight: "bold"}}>{formData.estado}</div>
              </div>
            </div>
            <div style={{backgroundColor: "#f0f8ff", color: "#0066B2", padding: "8px 12px", borderRadius: "8px", textAlign: "center", minWidth: "70px", border: "2px solid #0066B2"}}>
              <div style={{fontSize: "11px", fontWeight: "bold", marginBottom: "2px"}}>Prioridad</div>
              <div style={{fontSize: "18px", fontWeight: "bold"}}>{formData.prioridad}</div>
            </div>
          </div>
          
          <div style={{marginRight: "200px"}}>
            <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px", fontWeight: "bold"}}>Descripción</h2>
            <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0", whiteSpace: "pre-wrap"}}>{problemaTexto}</p>
            
            <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px", fontWeight: "bold"}}>Impacto</h2>
            <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0", whiteSpace: "pre-wrap"}}>{formData.impacto || "No se ha proporcionado información sobre el impacto"}</p>
            
            <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px", fontWeight: "bold"}}>Resolución</h2>
            <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0", whiteSpace: "pre-wrap"}}>{formData.resolucion || "No se ha proporcionado información sobre la resolución"}</p>
            
            <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px", fontWeight: "bold"}}>Nota</h2>
            <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0", whiteSpace: "pre-wrap"}}>
              {formData.nota}
            </p>
          </div>
        </div>
        
        <div style={{
          background: "linear-gradient(135deg, #2c5282 0%, #1a365d 50%, #0e1c36 100%)",
          color: "white", 
          padding: "30px",
          textAlign: "center"
        }}>
          <h2 style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "300",
            letterSpacing: "2px",
            fontFamily: "serif"
          }}>
            DinersClub
          </h2>
          <p style={{
            margin: "5px 0 0 0",
            fontSize: "16px",
            opacity: 0.9,
            letterSpacing: "1px",
            fontStyle: "italic"
          }}>
            International
          </p>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          style={{backgroundColor: "#666", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer", marginTop: "15px"}}
        >
          Volver al Editor
        </button>
      </div>
    </div>
  );
}

export default ComunicadoIncidente;
