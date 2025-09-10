document.addEventListener("DOMContentLoaded", () => {
  const botonesVotar = document.querySelectorAll(".btn-votar-tema");

  botonesVotar.forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-id");
      const li = document.getElementById(`tema-${temaId}`);

      try {
        const resp = await fetch(`/temas/votar/${temaId}/json`, {
          method: "POST",
        });
        const data = await resp.json();

        if (data.success) {
          // Actualiza contador de votos
          const contador = li.querySelector(".contador-votos");
          contador.textContent = data.tema.votos;

          // Feedback visual
          li.classList.add("highlight");
          setTimeout(() => li.classList.remove("highlight"), 600);

          // --- NUEVO: Reordenar lista de temas automáticamente ---
          reordenarLista(document.getElementById("lista-temas"));
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error al votar el tema:", error);
      }
    });
  });
});

// --- NUEVO: Función para reordenar <ul> por número de votos ---
function reordenarLista(lista) {
  const items = Array.from(lista.querySelectorAll("li"));

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent, 10);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent, 10);
    return votosB - votosA; // Orden descendente
  });

  // Reinyectar los <li> en orden
  items.forEach(item => lista.appendChild(item));
}
