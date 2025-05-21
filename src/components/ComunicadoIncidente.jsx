function ComunicadoIncidente() {
  const [showForm, setShowForm] = React.useState(true);
  const [formData, setFormData] = React.useState({
    tipoNotificacion: "GESTIÓN INCIDENTE",
    estado: "En revisión",
    fecha: "",
    horaInicio: "",
    horaFin: "",
    descripcion: "",
    impacto: "",
    resolucion: "",
    soporte: "Los participantes deben contactar al Centro de Comando DCI para asistencia. Las preguntas pueden enviarse usando el formulario de HAGA UNA PREGUNTA A DCI en InfoNet.",
    telefono: "+1 224 813 7200",
    referencia: "MSG" + Math.random().toString(36).substring(2, 8) + "_" + Date.now().toString().slice(-8)
  });

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
        <div style={{backgroundColor: "#102040", color: "white", padding: "15px 20px"}}>
          <h1 style={{margin: 0, fontSize: "24px"}}>Crear Comunicado de Incidente</h1>
        </div>

        <div style={{padding: "20px"}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px"}}>
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
            
            <div>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                Estado
              </label>
              <select 
                value={formData.estado}
                onChange={(e) => handleInputChange("estado", e.target.value)}
                style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
              >
                <option value="En revisión">En revisión</option>
                <option value="Avance">Avance</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>
          </div>
          
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
              style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", minHeight: "80px"}}
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
              style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", minHeight: "80px"}}
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
              style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", minHeight: "80px"}}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Texto de Soporte
            </label>
            <textarea 
              value={formData.soporte}
              onChange={(e) => handleInputChange("soporte", e.target.value)}
              placeholder="Información de contacto y asistencia para los usuarios"
              style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", minHeight: "80px"}}
            />
          </div>
          
          <div style={{marginBottom: "15px"}}>
            <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
              Teléfono de Soporte
            </label>
            <input 
              type="text"
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              style={{width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px"}}
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
      <div style={{backgroundColor: "#102040", color: "white", padding: "15px 20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <h1 style={{margin: 0, fontSize: "24px"}}>{formData.tipoNotificacion}</h1>
        <div style={{width: "60px", height: "60px", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img 
            src="https://www.dropbox.com/scl/fi/wr90vk30xq57j0w9mqxpl/logo.png?rlkey=yy1117ess35a6uc5lwbdziq6u&raw=1"
            alt="Logo DCI" 
            style={{width: "100%", height: "100%", objectFit: "contain"}}
          />
        </div>
      </div>
      
      <div style={{padding: "20px"}}>
        <div style={{border: "1px solid #ccc", padding: "20px", marginBottom: "15px"}}>
          <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px"}}>Problema</h2>
          <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0"}}>{problemaTexto}</p>
          
          <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px"}}>Impacto</h2>
          <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0"}}>{formData.impacto || "No se ha proporcionado información sobre el impacto"}</p>
          
          <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px"}}>Resolución</h2>
          <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0 0 15px 0"}}>{formData.resolucion || "No se ha proporcionado información sobre la resolución"}</p>
          
          <h2 style={{color: "#0066B2", fontSize: "16px", marginBottom: "5px"}}>Soporte</h2>
          <p style={{fontSize: "14px", lineHeight: "1.5", margin: "0"}}>
            {formData.soporte.replace('{telefono}', formData.telefono)}
          </p>
        </div>
        
        <div style={{backgroundColor: "#102040", color: "white", padding: "10px 20px", fontSize: "14px"}}>
          <a href="/" style={{color: "#b3d1ff", textDecoration: "none", marginRight: "10px"}}>Darse de baja</a> | 
          <a href="/" style={{color: "#b3d1ff", textDecoration: "none", marginLeft: "10px"}}>Gestionar Preferencias</a>
        </div>
        
        <div style={{fontSize: "12px", color: "#666", margin: "10px 0"}}>
          Ref: {formData.referencia}
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
