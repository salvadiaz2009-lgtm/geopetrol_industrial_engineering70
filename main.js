// Catálogo técnico bajo normativa API de GEOPETROL S.A.
const SERVICIOS_DETALLES = {
  construccion: {
    titulo: "CONSTRUCCIÓN ESPECIALIZADA",
    normativa: "API 1104 / API 5L",
    descripcion: "Ingeniería civil y mecánica de alta complejidad para oleoductos, gasoductos y estaciones de bombeo.",
    detalles: [
      "Tendido de tuberías de acero al carbono especificadas según norma API 5L (Grados X52 a X70).",
      "Soldadura de tuberías por arco manual y semiautomático bajo estándar API 1104, evaluado por inspectores calificados CWI.",
      "Pruebas hidrostáticas de resistencia y hermeticidad de líneas según protocolos API RP 1110.",
      "Ensayos no destructivos (NDT): Radiografía industrial (RT), Ultrasonido (UT) y Partículas Magnéticas (MT) en el 100% de las juntas."
    ]
  },
  montaje: {
    titulo: "FACILIDADES Y MONTAJE INDUSTRIAL",
    normativa: "API 650 / ASME B31.3",
    descripcion: "Montaje industrial integral de plantas de tratamiento de crudo, gas de compresión y tanques de almacenamiento.",
    detalles: [
      "Fabricación y erigido de tanques soldados para almacenamiento de petróleo según lineamientos estrictos de API 650.",
      "Diseño, ruteo e instalación de líneas de tubería de proceso para refinerías y estaciones bajo norma ASME B31.3.",
      "Alineación por tecnología láser de equipos dinámicos y rotativos (bombas multietapas, compresores de gas reciprocantes).",
      "Sistemas de instrumentación y lazos de control neumático/eléctrico para automatización de facilidades de producción."
    ]
  },
  mantenimiento: {
    titulo: "MANTENIMIENTO DE CABEZALES",
    normativa: "API 6A / API 16A",
    descripcion: "Servicios de mantenimiento preventivo y correctivo para cabezales de pozo (Wellheads) y árboles de navidad.",
    detalles: [
      "Inspección, diagnóstico y prueba de presión hidráulica en sitio de cabezales y válvulas de compuerta bajo API 6A.",
      "Reemplazo de sellos energizados por presión, empaquetaduras elastoméricas y anillos metálicos de junta (Ring Gaskets).",
      "Mantenimiento mecánico y prueba de funcionamiento de válvulas de seguridad de superficie (SSV) y actuadores.",
      "Certificación técnica e inspección por líquidos penetrantes (PT) de bridas de alta presión."
    ]
  },
  humano: {
    titulo: "CAPITAL HUMANO TÉCNICO",
    normativa: "ISO 45001 / AWS D1.1",
    descripcion: "Suministro de personal de ingeniería, supervisión técnica y operarios altamente calificados.",
    detalles: [
      "Soldadores calificados y homologados bajo códigos AWS D1.1 (estructural) y API 1104 (tuberías de presión).",
      "Ingenieros de campo con certificación internacional en inspección de soldadura (AWS-CWI) y recubrimientos protectores (NACE).",
      "Operadores certificados en control de pozos (Well Control) con acreditaciones IADC / IWCF.",
      "Supervisores de Seguridad e Higiene Ocupacional (HSE) entrenados bajo lineamientos de la norma ISO 45001 y OSHA."
    ]
  },
  sistemas: {
    titulo: "SISTEMAS ELÉCTRICOS E INSTRUMENTACIÓN",
    normativa: "NFPA 70 (NEC) / API RP 500",
    descripcion: "Diseño, tendido y puesta en marcha de redes eléctricas y sistemas de control para locaciones petroleras.",
    detalles: [
      "Tendido de líneas eléctricas de media tensión aéreas y subterráneas (hasta 34.5 kV) para alimentación de pozos y taladros.",
      "Diseño e instalación de redes de puesta a tierra y sistemas de protección contra descargas atmosféricas en tanques y torres.",
      "Clasificación de áreas peligrosas y montaje de tableros y luminarias a prueba de explosión (XP) según API RP 500.",
      "Calibración de instrumentos de medición de variables de proceso (presión, temperatura, flujo y nivel) y tendido de fibra óptica."
    ]
  }
};

// Configuración de la URL base del Backend
// Si la página se abre localmente por archivo (file://), hace el fetch a localhost:3000,
// de lo contrario usa rutas relativas al mismo servidor de origen.
const BACKEND_URL = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

// Esperar que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  initModalesServicios();
  initFormularios();
});

/**
 * Inicializa y maneja la apertura de modales de detalle técnico (Portafolio)
 */
function initModalesServicios() {
  const botonesDetalle = document.querySelectorAll('.btn-ver-detalle');

  botonesDetalle.forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      const servicioId = boton.getAttribute('data-service');
      const datos = SERVICIOS_DETALLES[servicioId];
      if (datos) {
        mostrarModalServicio(datos);
      }
    });
  });
}

/**
 * Crea y muestra en pantalla la ficha técnica en un modal estilo Industrial Brutalism
 */
function mostrarModalServicio(datos) {
  // Eliminar modal anterior si existe por alguna razón
  const modalExistente = document.getElementById('modal-detalle-servicio');
  if (modalExistente) modalExistente.remove();

  // Crear contenedor del modal (overlay)
  const overlay = document.createElement('div');
  overlay.id = 'modal-detalle-servicio';
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-xs z-[100] flex justify-center items-center p-4 transition-opacity duration-300';
  
  // Lista de detalles en HTML
  const detallesHTML = datos.detalles.map(item => `
    <li class="flex items-start gap-2 border-b border-steel-gray/20 py-2">
      <span class="material-symbols-outlined text-industrial-red font-bold select-none mt-0.5">double_arrow</span>
      <span class="font-body-sm text-on-surface">${item}</span>
    </li>
  `).join('');

  // Contenido del modal (Estilo Industrial Brutalism)
  overlay.innerHTML = `
    <div class="bg-white text-black border-4 border-black p-6 md:p-8 max-w-xl w-full shadow-[8px_8px_0px_0px_#000000] relative animate-modal-open max-h-[90vh] overflow-y-auto">
      <!-- Botón de Cerrar -->
      <button id="modal-close-btn" class="absolute top-2 right-2 border-2 border-black px-2 py-1 bg-white hover:bg-industrial-red hover:text-white transition-all cursor-pointer font-bold text-sm" title="Cerrar Ficha Técnica">
        [ X ]
      </button>

      <!-- Encabezado Ficha -->
      <div class="mb-4">
        <span class="bg-black text-white px-2 py-0.5 text-[10px] font-label-caps tracking-widest uppercase block w-max mb-1">
          FICHA TÉCNICA API
        </span>
        <h3 class="font-headline-md text-xl md:text-2xl text-black font-extrabold uppercase leading-tight border-b-4 border-black pb-2">
          ${datos.titulo}
        </h3>
      </div>

      <!-- Norma Destacada -->
      <div class="mb-4 bg-industrial-red text-white p-3 border-2 border-black flex items-center justify-between shadow-[3px_3px_0px_0px_#000000]">
        <div class="font-label-caps text-xs tracking-wider">NORMATIVA DE APLICACIÓN PRINCIPAL:</div>
        <div class="font-headline-sm font-bold text-sm tracking-widest bg-black text-white px-2 py-0.5 border border-white">
          ${datos.normativa}
        </div>
      </div>

      <!-- Breve Descripción -->
      <p class="font-body-md text-on-surface-variant mb-4 italic">
        "${datos.descripcion}"
      </p>

      <!-- Lista de especificaciones -->
      <div class="mb-6">
        <h4 class="font-label-caps text-xs text-steel-gray uppercase font-bold tracking-wider mb-2">
          ESPECIFICACIONES DE OPERACIÓN Y CALIDAD:
        </h4>
        <ul class="list-none pl-0">
          ${detallesHTML}
        </ul>
      </div>

      <!-- Botón de Acción Modal -->
      <div class="flex justify-end gap-3 mt-6">
        <button id="modal-cotizar-btn" class="bg-industrial-red text-white px-6 py-2.5 font-label-caps text-xs font-bold uppercase tracking-wider border-2 border-black btn-shadow cursor-pointer transition-all">
          SOLICITAR COTIZACIÓN DE ESTE SERVICIO
        </button>
      </div>
    </div>
  `;

  // Estilos de animación en tiempo de ejecución (si no están ya inyectados)
  inyectarAnimaciones();

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden'; // Evitar scroll de fondo

  // Event Listeners para cerrar
  const cerrarModal = () => {
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 200);
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarModal();
  });

  const btnCerrar = overlay.querySelector('#modal-close-btn');
  btnCerrar.addEventListener('click', cerrarModal);

  // Redirigir al formulario de cotización desde el modal
  const btnCotizar = overlay.querySelector('#modal-cotizar-btn');
  btnCotizar.addEventListener('click', () => {
    cerrarModal();
    const sectionCotizacion = document.getElementById('cotizacion');
    if (sectionCotizacion) {
      sectionCotizacion.scrollIntoView({ behavior: 'smooth' });
      
      // Auto-seleccionar tipo de servicio si coincide
      const selectProyecto = document.getElementById('cotizacion-proyecto');
      if (selectProyecto) {
        if (datos.titulo.includes('CONSTRUCCIÓN')) selectProyecto.value = 'Construcción';
        if (datos.titulo.includes('MONTAJE') || datos.titulo.includes('FACILIDADES')) selectProyecto.value = 'Mantenimiento'; // Fallback a mantenimiento o similar
        if (datos.titulo.includes('CABEZALES') || datos.titulo.includes('MANTENIMIENTO')) selectProyecto.value = 'Mantenimiento';
        if (datos.titulo.includes('HUMANO') || datos.titulo.includes('CAPITAL')) selectProyecto.value = 'Personal Técnico';
      }
    }
  });

  // Permitir cierre con tecla ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      cerrarModal();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/**
 * Agrega hojas de estilos CSS auxiliares para animaciones y bordes brutalistas
 */
function inyectarAnimaciones() {
  if (document.getElementById('brutalist-animations-style')) return;
  const style = document.createElement('style');
  style.id = 'brutalist-animations-style';
  style.innerHTML = `
    @keyframes modalOpen {
      from { transform: scale(0.9) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
    .animate-modal-open {
      animation: modalOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .btn-shadow {
      box-shadow: 4px 4px 0px 0px #000000;
    }
    .btn-shadow:hover {
      box-shadow: 2px 2px 0px 0px #000000;
      transform: translate(2px, 2px);
    }
    .btn-shadow:active {
      box-shadow: 0px 0px 0px 0px #000000;
      transform: translate(4px, 4px);
    }
    .brutal-border {
      border: 2px solid #000000;
    }
    .card-shadow {
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.15);
    }
    .card-shadow:hover {
      box-shadow: 8px 8px 0px 0px #D42728;
      border-color: #000000;
      transform: translate(-2px, -2px);
    }
    .backdrop-blur-xs {
      backdrop-filter: blur(2px);
    }
  `;
  document.head.appendChild(style);
}

/**
 * Inicializa y maneja la intercepción del envío de formularios
 */
function initFormularios() {
  const formCotizacion = document.getElementById('form-cotizacion');
  const formContacto = document.getElementById('form-contacto');

  if (formCotizacion) {
    formCotizacion.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = formCotizacion.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Estado de carga
      setLoadingState(submitBtn, true, "Procesando Requerimiento...");

      // Capturar datos del formulario
      const formData = new FormData(formCotizacion);
      const data = {
        empresa: formData.get('empresa'),
        tipo_de_proyecto: formData.get('tipo_de_proyecto'),
        urgencia: formData.get('urgencia')
      };

      try {
        const response = await fetch(`${BACKEND_URL}/api/cotizacion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Mostrar alerta brutalista de éxito
          mostrarAlertaExito(
            "COTIZACIÓN REGISTRADA",
            `El requerimiento técnico para <strong>${data.empresa}</strong> ha sido cargado con éxito en el sistema de ingeniería.<br><br>Código de Registro: <strong>#${result.code}</strong>`,
            result.previewUrl
          );
          formCotizacion.reset();
        } else {
          throw new Error(result.message || 'Error desconocido al registrar la cotización.');
        }
      } catch (err) {
        mostrarAlertaError("FALLA DE REGISTRO", err.message);
      } finally {
        setLoadingState(submitBtn, false, originalText);
      }
    });
  }

  if (formContacto) {
    formContacto.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = formContacto.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Estado de carga
      setLoadingState(submitBtn, true, "Procesando Requerimiento...");

      // Capturar datos del formulario
      const formData = new FormData(formContacto);
      const data = {
        nombre_completo: formData.get('nombre_completo'),
        empresa: formData.get('empresa'),
        correo_corporativo: formData.get('correo_corporativo'),
        servicio_de_interes: formData.get('servicio_de_interes'),
        detalles_tecnicos: formData.get('detalles_tecnicos')
      };

      try {
        const response = await fetch(`${BACKEND_URL}/api/contacto`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          mostrarAlertaExito(
            "SOLICITUD PROCESADA",
            `Estimado(a) <strong>${data.nombre_completo}</strong>, la consulta técnica para la empresa <strong>${data.empresa}</strong> ha sido cargada.<br><br>Código de Referencia: <strong>#${result.code}</strong><br>Se ha enviado un acuse de recibo al correo: <em>${data.correo_corporativo}</em>.`,
            result.internalPreviewUrl || result.clientPreviewUrl
          );
          formContacto.reset();
        } else {
          throw new Error(result.message || 'Error desconocido al enviar la consulta de contacto.');
        }
      } catch (err) {
        mostrarAlertaError("FALLA EN CONTACTO", err.message);
      } finally {
        setLoadingState(submitBtn, false, originalText);
      }
    });
  }
}

/**
 * Controla el estado visual y habilitación del botón de envío
 */
function setLoadingState(button, isLoading, text) {
  if (isLoading) {
    button.disabled = true;
    button.setAttribute('data-original-html', button.innerHTML);
    button.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>${text.toUpperCase()}</span>
      </div>
    `;
    button.classList.add('opacity-80', 'cursor-not-allowed');
  } else {
    button.disabled = false;
    button.innerHTML = button.getAttribute('data-original-html') || text;
    button.classList.remove('opacity-80', 'cursor-not-allowed');
  }
}

/**
 * Muestra una alerta de éxito con diseño Industrial Brutalism
 */
function mostrarAlertaExito(titulo, mensaje, previewUrl) {
  const overlay = document.createElement('div');
  overlay.id = 'alerta-brutal-exito';
  overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-xs z-[200] flex justify-center items-center p-4 transition-opacity duration-300';
  
  let linkPreviewHTML = '';
  if (previewUrl) {
    linkPreviewHTML = `
      <div class="mt-4 p-3 bg-surface-container border-2 border-black text-left shadow-[2px_2px_0px_0px_#000000]">
        <div class="font-label-caps text-[9px] text-steel-gray font-bold">LOG DE CORREO DE PRUEBA (DESARROLLO)</div>
        <a href="${previewUrl}" target="_blank" class="font-body-sm text-xs font-bold text-industrial-red underline hover:text-black flex items-center gap-1 mt-1">
          <span class="material-symbols-outlined text-sm">open_in_new</span> Ver previsualización del correo enviado
        </a>
      </div>
    `;
  }

  overlay.innerHTML = `
    <div class="bg-white text-black border-4 border-black p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#D42728] relative animate-modal-open text-center">
      <div class="w-16 h-16 border-4 border-black bg-black text-white flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-4xl text-green-500 font-extrabold">check</span>
      </div>
      
      <h3 class="font-headline-lg text-lg md:text-xl text-black font-extrabold uppercase mb-2 border-b-2 border-black pb-2">
        ${titulo}
      </h3>
      
      <p class="font-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
        ${mensaje}
      </p>

      ${linkPreviewHTML}

      <button id="btn-alerta-cerrar" class="w-full mt-6 bg-black text-white hover:bg-industrial-red py-3 font-label-caps text-xs font-bold uppercase tracking-widest border-2 border-black btn-shadow cursor-pointer transition-all">
        ENTENDIDO
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const cerrarAlerta = () => {
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 200);
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarAlerta();
  });

  const btnCerrar = overlay.querySelector('#btn-alerta-cerrar');
  btnCerrar.addEventListener('click', cerrarAlerta);
}

/**
 * Muestra una alerta de error con diseño Industrial Brutalism
 */
function mostrarAlertaError(titulo, mensaje) {
  const overlay = document.createElement('div');
  overlay.id = 'alerta-brutal-error';
  overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-xs z-[200] flex justify-center items-center p-4 transition-opacity duration-300';
  
  overlay.innerHTML = `
    <div class="bg-white text-black border-4 border-black p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0px_0px_#ba1a1a] relative animate-modal-open text-center">
      <div class="w-16 h-16 border-4 border-black bg-[#ba1a1a] text-white flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-4xl text-white font-extrabold">warning</span>
      </div>
      
      <h3 class="font-headline-lg text-lg md:text-xl text-[#ba1a1a] font-extrabold uppercase mb-2 border-b-2 border-black pb-2">
        ${titulo}
      </h3>
      
      <p class="font-body-md text-on-surface-variant text-sm mb-4 leading-relaxed">
        ${mensaje}
      </p>

      <div class="bg-red-50 border border-[#ba1a1a] p-3 text-left font-body-sm text-xs text-[#ba1a1a] mb-4">
        <strong>Recomendación:</strong> Por favor, verifique que el servidor backend esté encendido y que el puerto coincida.
      </div>

      <button id="btn-alerta-cerrar-err" class="w-full bg-[#ba1a1a] text-white hover:bg-black py-3 font-label-caps text-xs font-bold uppercase tracking-widest border-2 border-black btn-shadow cursor-pointer transition-all">
        CERRAR Y REINTENTAR
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const cerrarAlerta = () => {
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 200);
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarAlerta();
  });

  const btnCerrar = overlay.querySelector('#btn-alerta-cerrar-err');
  btnCerrar.addEventListener('click', cerrarAlerta);
}
