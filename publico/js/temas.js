import { resaltarElemento, reordenarListaPorVotos } from './utilidades.js';

document.addEventListener("DOMContentLoaded", () => {

  // Editar temas
  document.querySelectorAll(".btn-guardar-tema").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.dataset.id;
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
          resaltarElemento(li);
          reordenarListaPorVotos("lista-temas");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al actualizar tema:", error);
      }
    });
  });

  // Votar temas
  document.querySelectorAll(".btn-votar-tema").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.dataset.id;
      const li = document.getElementById(`tema-${temaId}`);

      try {
        const resp = await fetch(`/temas/votar/${temaId}/json`, { method: "POST" });
        const data = await resp.json();

        if (data.success) {
          li.querySelector(".contador-votos").textContent = data.tema.votos;
          resaltarElemento(li);
          reordenarListaPorVotos("lista-temas");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al votar el tema:", error);
      }
    });
  });

});
