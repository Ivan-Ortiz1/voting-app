document.addEventListener("DOMContentLoaded", () => {
  const botonesGuardar = document.querySelectorAll(".btn-guardar-enlace");

  botonesGuardar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-tema");
      const enlaceId = boton.getAttribute("data-id");

      const li = document.getElementById(`enlace-${enlaceId}`);
      const nombre = li.querySelector(".nombre-enlace").value;
      const url = li.querySelector(".url-enlace").value;

      try {
        const resp = await fetch(`/temas/editar/${temaId}/enlaces/editar/${enlaceId}/json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, url })
        });
        const data = await resp.json();

        if (data.success) {
          // Feedback visual
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al actualizar enlace:", error);
      }
    });
  });
});
