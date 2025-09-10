document.addEventListener("DOMContentLoaded", () => {
  const botonesGuardar = document.querySelectorAll(".btn-guardar-enlace");

  botonesGuardar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-tema");
      const enlaceId = boton.getAttribute("data-id");

      const li = document.getElementById(`enlace-${enlaceId}`);
      const nombreInput = li.querySelector(".nombre-enlace");
      const urlInput = li.querySelector(".url-enlace");
      const nombre = nombreInput.value;
      const url = urlInput.value;

      try {
        const resp = await fetch(
          `/temas/editar/${temaId}/enlaces/editar/${enlaceId}/json`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, url })
          }
        );

        const data = await resp.json();

        if (data.success) {
          // Actualizar valores en los inputs
          nombreInput.value = data.enlace.nombre;
          urlInput.value = data.enlace.url;

          // Feedback visual
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);

          // Reordenar lista usando la función de utilidades
          if (window.reordenarListaEnlaces) {
            reordenarListaEnlaces();
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al actualizar enlace:", error);
        alert("Hubo un problema al actualizar el enlace");
      }
    });
  });
});
