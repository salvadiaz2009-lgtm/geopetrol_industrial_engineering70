const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno de forma robusta basada en la ubicación del script
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname)));

// Variable para almacenar el transporter de Nodemailer
let transporter;

// Pre-crear de inmediato un transporter mock por defecto para que nunca sea undefined al inicio
function configureTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Transporter fallback en caso de que no haya SMTP o Ethereal tarde/falle
  const defaultMockTransporter = {
    sendMail: async (mailOptions) => {
      console.log('\n--- SIMULACIÓN DE CORREO ENVIADO (MOCK EN CONSOLA) ---');
      console.log(`De: ${mailOptions.from}`);
      console.log(`Para: ${mailOptions.to}`);
      console.log(`Asunto: ${mailOptions.subject}`);
      console.log('Cuerpo (HTML):');
      console.log(mailOptions.html);
      console.log('------------------------------------------------------\n');
      return { messageId: 'mock-id-' + Date.now() };
    }
  };

  if (host && user && pass) {
    console.log(`[SMTP] Configurando transporter real con servidor: ${host}:${port}`);
    try {
      transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: port === 465, // true para 465, false para otros puertos
        auth: {
          user: user,
          pass: pass
        }
      });
    } catch (err) {
      console.error('[SMTP] Error al instanciar el transporter SMTP, usando mock:', err.message);
      transporter = defaultMockTransporter;
    }
  } else {
    console.log('[SMTP] No se detectó configuración SMTP completa en el archivo .env.');
    console.log('[SMTP] Asignando transporter mock temporal...');
    transporter = defaultMockTransporter;

    console.log('[SMTP] Creando cuenta de pruebas en Ethereal.email en segundo plano...');
    nodemailer.createTestAccount().then(testAccount => {
      console.log(`[SMTP] Cuenta de Ethereal creada con éxito en segundo plano.`);
      console.log(`[SMTP] Usuario Ethereal: ${testAccount.user}`);
      
      // Reemplazar mock por el transporter real de Ethereal para desarrollo
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log('[SMTP] Transporter de Ethereal asignado activamente para previsualizaciones.');
    }).catch(err => {
      console.log(`[SMTP] No se pudo crear cuenta de Ethereal en segundo plano (${err.message}). Se mantendrá el mock en consola.`);
    });
  }
}

// Función auxiliar para generar un código único de requerimiento
function generateRequestCode() {
  const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 dígitos
  return `GP-2026-${randomNum}`;
}

// Inicializar el transporte de correo de forma no bloqueante
configureTransporter();

// Endpoint para Cotización Rápida
app.post('/api/cotizacion', async (req, res) => {
  const { empresa, tipo_de_proyecto, urgencia } = req.body;

  // Validación básica
  if (!empresa || !tipo_de_proyecto || !urgencia) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos (empresa, tipo_de_proyecto, urgencia) son requeridos.'
    });
  }

  const code = generateRequestCode();
  const notifyEmail = process.env.NOTIFY_EMAIL || 'info@geopetrol.co.ve';
  
  // Determinar si la urgencia es "Inmediata" para destacar en rojo (#D42728)
  const isInmediata = urgencia.toLowerCase().includes('inmediata');
  const alertColor = isInmediata ? '#D42728' : '#4A5568';
  const alertTextColor = isInmediata ? '#FFFFFF' : '#EBEBEB';
  const borderHighlight = isInmediata ? '4px solid #D42728' : '2px solid #000000';

  // 1. Email de Notificación Interna para la Empresa
  const internalMailOptions = {
    from: '"GEOPETROL Sistema de Cotizaciones" <no-reply@geopetrol.co.ve>',
    to: notifyEmail,
    subject: `[COTIZACIÓN] ${isInmediata ? '⚠️ URGENTE - ' : ''}${empresa} - ${tipo_de_proyecto}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #000000; padding: 20px; background-color: #F7FAFC;">
        <h2 style="font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; text-transform: uppercase; color: #000000; margin-top: 0; border-bottom: 2px solid #000000; padding-bottom: 10px;">
          NUEVA SOLICITUD DE COTIZACIÓN RÁPIDA
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; border: ${borderHighlight}; background-color: ${isInmediata ? '#D42728' : '#EBEBEB'}; color: ${alertTextColor};">
          <p style="margin: 0; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
            NIVEL DE URGENCIA DEL REQUERIMIENTO:
          </p>
          <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: 800; text-transform: uppercase;">
            ${urgencia}
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568; width: 35%;">Código de Requerimiento</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #000000;">#${code}</td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Empresa / Cliente</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000;">${empresa}</td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Tipo de Proyecto</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000;">${tipo_de_proyecto}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; border-top: 2px solid #000000; padding-top: 15px; font-size: 11px; color: #718096; text-transform: uppercase; letter-spacing: 0.05em;">
          GEOPETROL S.A. | SISTEMA AUTOMÁTICO DE LOGÍSTICA B2B
        </div>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(internalMailOptions);
    let previewUrl = nodemailer.getTestMessageUrl(info);

    console.log(`[COTIZACIÓN] Correo enviado exitosamente. ID: ${info.messageId}`);
    if (previewUrl) {
      console.log(`[COTIZACIÓN] Enlace de previsualización del correo: ${previewUrl}`);
    }

    return res.status(200).json({
      success: true,
      code: code,
      message: 'Requerimiento registrado y correo enviado correctamente.',
      previewUrl: previewUrl || null
    });
  } catch (error) {
    console.error('[COTIZACIÓN] Error al enviar correo de notificación:', error);
    
    // Para desarrollo local y pruebas, si falla el correo (por ej, sin internet o SMTP bloqueado),
    // registramos en consola pero devolvemos éxito al frontend indicando advertencia en consola.
    console.log(`[COTIZACIÓN][MOCK] El requerimiento fue registrado pero falló el envío del correo SMTP.`);
    return res.status(200).json({
      success: true,
      code: code,
      message: 'Requerimiento registrado (Simulado). El envío del correo falló.',
      warning: error.message,
      previewUrl: null
    });
  }
});

// Endpoint para Contacto Industrial
app.post('/api/contacto', async (req, res) => {
  const { nombre_completo, empresa, correo_corporativo, servicio_de_interes, detalles_tecnicos } = req.body;

  // Validación básica
  if (!nombre_completo || !empresa || !correo_corporativo || !servicio_de_interes || !detalles_tecnicos) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos (nombre_completo, empresa, correo_corporativo, servicio_de_interes, detalles_tecnicos) son requeridos.'
    });
  }

  const code = generateRequestCode();
  const notifyEmail = process.env.NOTIFY_EMAIL || 'info@geopetrol.co.ve';

  // 1. Email de Notificación Interna para la Empresa
  const internalMailOptions = {
    from: '"GEOPETROL Consultas B2B" <no-reply@geopetrol.co.ve>',
    to: notifyEmail,
    subject: `[CONTACTO INDUSTRIAL] Nueva Consulta - ${empresa}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #000000; padding: 20px; background-color: #F7FAFC;">
        <h2 style="font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; text-transform: uppercase; color: #000000; margin-top: 0; border-bottom: 2px solid #000000; padding-bottom: 10px;">
          NUEVA CONSULTA TÉCNICA
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568; width: 35%;">Código de Requerimiento</td>
            <td style="padding: 10px 0; font-family: monospace; font-size: 16px; font-weight: bold; color: #000000;">#${code}</td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Ingeniero Solicitante</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000;">${nombre_completo}</td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Empresa / Compañía</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000;">${empresa}</td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Correo Corporativo</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000; font-weight: bold;"><a href="mailto:${correo_corporativo}" style="color: #D42728; text-decoration: none;">${correo_corporativo}</a></td>
          </tr>
          <tr style="border-bottom: 2px solid #E2E8F0;">
            <td style="padding: 10px 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Servicio de Interés</td>
            <td style="padding: 10px 0; font-size: 16px; color: #000000;">${servicio_de_interes}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="margin: 0; font-weight: bold; text-transform: uppercase; font-size: 12px; color: #4A5568;">Detalles Técnicos Recibidos:</p>
          <div style="margin-top: 10px; padding: 15px; border: 2px dashed #4A5568; background-color: #FFFFFF; font-family: monospace; white-space: pre-wrap; font-size: 14px; color: #2D3748;">${detalles_tecnicos}</div>
        </div>

        <div style="margin-top: 30px; border-top: 2px solid #000000; padding-top: 15px; font-size: 11px; color: #718096; text-transform: uppercase; letter-spacing: 0.05em;">
          GEOPETROL S.A. | SISTEMA AUTOMÁTICO DE ATENCIÓN DE CLIENTES
        </div>
      </div>
    `
  };

  // 2. Email de Notificación Automática de Recepción para el Cliente (Comprador)
  const clientMailOptions = {
    from: '"GEOPETROL S.A. Ingeniería B2B" <consultoria@geopetrol.co.ve>',
    to: correo_corporativo,
    subject: `Confirmación de Requerimiento Técnico - GEOPETROL S.A. (Ref: #${code})`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #D42728; padding: 25px; background-color: #FFFFFF;">
        <div style="text-align: left; margin-bottom: 20px; border-bottom: 2px solid #000000; padding-bottom: 15px;">
          <span style="font-size: 26px; font-weight: 900; letter-spacing: 0.05em; color: #D42728; text-transform: uppercase; font-family: Impact, Arial Black, sans-serif;">GEOPETROL S.A.</span>
          <div style="font-size: 11px; font-weight: bold; color: #718096; text-transform: uppercase; margin-top: 5px; letter-spacing: 0.05em;">OPERACIONES INDUSTRIALES DE ALTA PRECISIÓN</div>
        </div>

        <p style="font-size: 16px; color: #1A202C; line-height: 1.6; margin-top: 0;">
          Estimado equipo de <strong>${empresa}</strong>,
        </p>

        <blockquote style="margin: 20px 0; padding: 15px; border-left: 5px solid #D42728; background-color: #F7FAFC; font-size: 15px; line-height: 1.5; color: #2D3748; font-style: italic;">
          "Hemos recibido su requerimiento técnico con código de referencia <strong>#${code}</strong>. Un ingeniero consultor de GEOPETROL se pondrá en contacto con ustedes en menos de 2 horas."
        </blockquote>

        <p style="font-size: 14px; color: #4A5568; line-height: 1.6;">
          Nuestros expertos ya están evaluando las especificaciones bajo normativa API que nos ha facilitado para estructurar una propuesta técnica adaptada a las necesidades operativas de su proyecto.
        </p>

        <div style="margin-top: 30px; border-top: 1px solid #E2E8F0; padding-top: 20px;">
          <table style="width: 100%; font-size: 12px; color: #718096;">
            <tr>
              <td><strong>CÓDIGO DE SEGUIMIENTO:</strong> #${code}</td>
              <td style="text-align: right;"><strong>ESTADO:</strong> EN EVALUACIÓN DE INGENIERÍA</td>
            </tr>
            <tr>
              <td><strong>ATENCIÓN AL CLIENTE 24/7:</strong> +58 414 817 4159</td>
              <td style="text-align: right;"><strong>CORREO:</strong> info@geopetrol.co.ve</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; font-size: 10px; color: #A0AEC0; text-align: center; text-transform: uppercase; border-t: 2px solid #000000; padding-top: 10px;">
          Este correo es un acuse de recibo automático y formal. Por favor no lo responda directamente a menos que sea necesario adjuntar especificaciones técnicas adicionales.
        </div>
      </div>
    `
  };

  try {
    // Enviar correo interno para la empresa
    const internalInfo = await transporter.sendMail(internalMailOptions);
    let internalPreview = nodemailer.getTestMessageUrl(internalInfo);
    console.log(`[CONTACTO] Correo de notificación interna enviado exitosamente. ID: ${internalInfo.messageId}`);
    if (internalPreview) {
      console.log(`[CONTACTO] Vista previa notificación interna: ${internalPreview}`);
    }

    // Enviar correo de confirmación al cliente
    const clientInfo = await transporter.sendMail(clientMailOptions);
    let clientPreview = nodemailer.getTestMessageUrl(clientInfo);
    console.log(`[CONTACTO] Correo de confirmación automática enviado exitosamente al cliente. ID: ${clientInfo.messageId}`);
    if (clientPreview) {
      console.log(`[CONTACTO] Vista previa confirmación cliente: ${clientPreview}`);
    }

    return res.status(200).json({
      success: true,
      code: code,
      message: 'Consulta de contacto recibida y correos de notificación procesados correctamente.',
      internalPreviewUrl: internalPreview || null,
      clientPreviewUrl: clientPreview || null
    });
  } catch (error) {
    console.error('[CONTACTO] Error al procesar envíos de correo de contacto:', error);
    
    // Para desarrollo local y pruebas, si falla el correo (por ej, sin internet o SMTP bloqueado),
    // registramos en consola pero devolvemos éxito al frontend indicando advertencia en consola.
    console.log(`[CONTACTO][MOCK] La consulta fue registrada pero falló el envío del correo SMTP.`);
    return res.status(200).json({
      success: true,
      code: code,
      message: 'Consulta técnica registrada (Simulado). El envío del correo falló.',
      warning: error.message,
      internalPreviewUrl: null,
      clientPreviewUrl: null
    });
  }
});

// Manejo general de rutas no encontradas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'code.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`Servidor de GEOPETROL S.A. iniciado de forma activa.`);
  console.log(`Accede localmente en: http://localhost:${PORT}`);
  console.log(`Prueba la landing page en: http://localhost:${PORT}/code.html`);
  console.log(`=============================================================\n`);
});
