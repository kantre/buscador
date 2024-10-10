document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el parámetro 'id' de la URL
  const params = new URLSearchParams(window.location.search);
  const autoId = params.get("id");

  if (autoId) {
    try {
      // Hacer fetch al archivo JSON para obtener los autos
      const response = await fetch("api.json");
      const { autos } = await response.json();

      // Buscar el auto con el ID correspondiente (convertir ambos a string)
      const autoSeleccionado = autos.find((auto) => String(auto.id) === autoId);

      if (autoSeleccionado) {
        // Mostrar los detalles del auto
        mostrarDetallesAuto(autoSeleccionado);
      } else {
        mostrarMensaje("No se encontró información para este auto.");
      }
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  } else {
    mostrarMensaje("No se especificó un auto válido.");
  }

  // Función para mostrar los detalles del auto
  function mostrarDetallesAuto(auto) {
    const contenedorDetalles = document.getElementById("detalles-auto");
    contenedorDetalles.innerHTML = `
      <h1>${auto.nombre}</h1>
      <p>Modelo: ${auto.modelo}</p>
      <p>Fabricante: ${auto.fabricante}</p>
      <img src="${auto.imagen}" alt="${auto.nombre}" width="500px" />
      <p>Descripción: ${auto.descripcion}</p>
    `;
  }

  // Función para mostrar un mensaje en caso de error
  function mostrarMensaje(mensaje) {
    const contenedorDetalles = document.getElementById("detalles-auto");
    contenedorDetalles.innerHTML = `<p>${mensaje}</p>`;
  }
});
