import { resaltarElemento, reordenarListaPorVotos } from './utilidades.js';

document.addEventListener("DOMContentLoaded", () => {

  // Editar enlaces
  document.querySelectorAll(".btn-guardar-enlace").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.dataset.tema;
      const enlaceId = boton.dataset.id;
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
          li.querySelector(".nombre-enlace").value = data.enlace.nombre;
          li.querySelector(".url-enlace").value = data.enlace.url;
          resaltarElemento(li);
          reordenarListaPorVotos("lista-enlaces");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al actualizar enlace:", error);
      }
    });
  });

  // Votar enlaces
  document.querySelectorAll(".btn-votar-enlace").forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.dataset.tema;
      const enlaceId = boton.dataset.id;
      const li = document.getElementById(`enlace-${enlaceId}`);

      try {
        const resp = await fetch(`/temas/editar/${temaId}/enlaces/${enlaceId}/votar/json`, { method: "POST" });
        const data = await resp.json();

        if (data.success) {
          li.querySelector(".contador-votos").textContent = data.enlace.votos;
          resaltarElemento(li);
          reordenarListaPorVotos("lista-enlaces");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al votar enlace:", error);
      }
    });
  });

});
