document.addEventListener("DOMContentLoaded", () => {
  // Guardar enlace en edición inline
  document.querySelectorAll(".btn-guardar-enlace").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-tema");
      const enlaceId = boton.getAttribute("data-id");
      const li = document.getElementById(`enlace-${enlaceId}`);
      const nombre = li.querySelector(".nombre-enlace").value;
      const url = li.querySelector(".url-enlace").value;

      try {
        const resp = await fetch(`/temas/editar/${temaId}/enlaces/${enlaceId}/editar`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, url })
        });
        const data = await resp.json();

        if (data.success) {
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error("Error al editar enlace:", err);
      }
    });
  });

  // Votar enlace
  document.querySelectorAll(".btn-votar-enlace").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-tema");
      const enlaceId = boton.getAttribute("data-id");
      const li = document.getElementById(`enlace-${enlaceId}`);

      try {
        const resp = await fetch(`/temas/editar/${temaId}/enlaces/${enlaceId}/votar/json`, {
          method: "POST"
        });
        const data = await resp.json();

        if (data.success) {
          li.querySelector(".contador-votos").textContent = data.enlace.votos;
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error("Error al votar enlace:", err);
      }
    });
  });
});
