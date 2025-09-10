document.addEventListener("DOMContentLoaded", () => {
  const botonesGuardar = document.querySelectorAll(".btn-guardar-tema");

  botonesGuardar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-id");
      const li = document.getElementById(`tema-${temaId}`);
      const titulo = li.querySelector(".titulo-tema").value;

      try {
        const resp = await fetch(`/temas/editar/${temaId}/json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ titulo })
        });
        const data = await resp.json();

        if (data.success) {
          // Feedback visual
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);

          // Reordenar lista de temas por votos
          if (typeof reordenarListaTemas === "function") {
            reordenarListaTemas();
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al actualizar tema:", error);
      }
    });
  });
});
