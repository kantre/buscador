document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscador");

  // Función para realizar la búsqueda
  const buscarAutos = async () => {
    const query = inputBuscador.value.toLowerCase();

    if (query === "") {
      limpiarResultados(); // Limpiar si el input está vacío
      return;
    }

    try {
      const response = await fetch("api.json");
      const { autos } = await response.json();

      const resultados = autos.filter(
        (auto) =>
          auto.nombre.toLowerCase().includes(query) ||
          auto.modelo.toLowerCase().includes(query) ||
          auto.fabricante.toLowerCase().includes(query)
      );

      limpiarResultados();

      resultados.length > 0
        ? mostrarResultados(resultados)
        : mostrarMensaje("No se encontraron resultados.");
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  // Mostrar resultados de la búsqueda
  const mostrarResultados = (resultados) => {
    const contenedorResultados = document.createElement("div");
    contenedorResultados.classList.add("resultados");

    resultados.forEach((auto) => {
      const autoCard = document.createElement("div");
      autoCard.classList.add("auto-card");

      autoCard.innerHTML = `
        <h3>${auto.nombre}</h3>
        <p>Modelo: ${auto.modelo}</p>
        <p>Fabricante: ${auto.fabricante}</p>
        <img src="${auto.imagen}" alt="${auto.nombre}" width="300px" />
      `;

      // Agregar el evento de clic para redirigir a la página de detalles
      autoCard.addEventListener("click", () => {
        // Redirigir a detalles.html pasando el id del auto en la URL
        window.location.href = `detalles.html?id=${auto.id}`;
      });

      contenedorResultados.appendChild(autoCard);
    });

    document.body.appendChild(contenedorResultados);
  };

  // Limpiar los resultados anteriores
  const limpiarResultados = () => {
    const resultadosExistentes = document.querySelector(".resultados");
    if (resultadosExistentes) {
      resultadosExistentes.remove();
    }
  };

  // Mostrar mensaje cuando no hay resultados
  const mostrarMensaje = (mensaje) => {
    limpiarResultados();
    const mensajeElemento = document.createElement("p");
    mensajeElemento.textContent = mensaje;
    mensajeElemento.classList.add("mensaje");
    document.body.appendChild(mensajeElemento);
  };

  // Escuchar el evento "keyup" para hacer la búsqueda dinámica
  inputBuscador.addEventListener("keyup", buscarAutos);
});
