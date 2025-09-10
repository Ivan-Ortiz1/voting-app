document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-votar-enlace").forEach(btn => {
    btn.addEventListener("click", async () => {
      const enlaceId = btn.dataset.id;
      const temaId = btn.dataset.tema; // viene del atributo data-tema en editarTema.ejs

      try {
        const resp = await fetch(`/temas/editar/${temaId}/enlaces/${enlaceId}/votar/json`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        const data = await resp.json();

        if (data.success) {
          const elem = document.getElementById(`enlace-${enlaceId}`);
          const contador = elem.querySelector(".contador-votos");
          contador.textContent = data.enlace.votos;

          // Feedback visual
          elem.classList.add("highlight");
          setTimeout(() => elem.classList.remove("highlight"), 600);

          // --- NUEVO: Reordenar enlaces dentro de la lista del tema ---
          const lista = document.getElementById("lista-enlaces");
          reordenarLista(lista);
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error("Error al votar enlace:", err);
        alert("Hubo un problema al procesar el voto");
      }
    });
  });
});

// --- NUEVO: función genérica para reordenar listas por votos ---
function reordenarLista(lista) {
  const items = Array.from(lista.querySelectorAll("li"));

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent, 10);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent, 10);
    return votosB - votosA; // descendente
  });

  items.forEach(item => lista.appendChild(item));
}
