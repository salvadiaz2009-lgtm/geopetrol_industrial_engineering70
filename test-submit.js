/**
 * Script de simulación para probar el backend de GEOPETROL S.A.
 * Envía una solicitud de cotización ficticia al servidor local en http://localhost:3000
 */

const data = {
  empresa: "ECOPETROL SIMULACIÓN S.A.",
  tipo_de_proyecto: "Construcción",
  urgencia: "Inmediata (< 24h)" // Esto disparará la alerta roja en el correo
};

console.log("Iniciando simulación de envío de cotización...");
console.log("Datos a enviar:", JSON.stringify(data, null, 2));

fetch("http://localhost:3000/api/cotizacion", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
  .then(async (response) => {
    const result = await response.json();
    console.log("\n==================================================");
    console.log(`STATUS DE RESPUESTA: ${response.status} (${response.statusText})`);
    console.log("==================================================");
    console.log("RESULTADO:", JSON.stringify(result, null, 2));
    console.log("==================================================\n");
    
    if (response.ok && result.success) {
      console.log("✅ SIMULACIÓN EXITOSA");
      if (result.previewUrl) {
        console.log(`🔗 Enlace de previsualización del correo: ${result.previewUrl}`);
      } else {
        console.log("📧 Correo procesado (Transporter en consola/SMTP real).");
      }
    } else {
      console.log("❌ ERROR EN LA SIMULACIÓN");
    }
  })
  .catch((error) => {
    console.error("\n❌ ERROR DE CONEXIÓN CON EL SERVIDOR:", error.message);
    console.log("Por favor, asegúrate de que el servidor backend esté encendido en http://localhost:3000\n");
  });
