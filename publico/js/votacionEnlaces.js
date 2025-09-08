function reordenarListaEnlaces() {
  const lista = document.getElementById("lista-enlaces");
  if (!lista) return;

  const items = Array.from(lista.children);

  items.sort((a, b) => {
    const votosA = parseInt(a.querySelector(".contador-votos").textContent);
    const votosB = parseInt(b.querySelector(".contador-votos").textContent);
    return votosB - votosA;
  });

  items.forEach(item => lista.appendChild(item));
}

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-votar-enlace");

  botones.forEach(boton => {
    boton.addEventListener("click", async () => {
      const temaId = boton.getAttribute("data-tema");
      const enlaceId = boton.getAttribute("data-id");

      try {
        const resp = await fetch(
          `/temas/editar/${temaId}/enlaces/votar/${enlaceId}/json`,
          { method: "POST" }
        );
        const data = await resp.json();

        if (data.success) {
          const elem = document.getElementById(`enlace-${enlaceId}`);
          const contador = elem.querySelector(".contador-votos");
          contador.textContent = data.enlace.votos;

          // Feedback visual con clase CSS
          elem.classList.add("highlight");
          setTimeout(() => elem.classList.remove("highlight"), 600);

          // Reordenar la lista después de votar
          reordenarListaEnlaces();
        }
      } catch (error) {
        console.error("Error al votar enlace:", error);
      }
    });
  });
});
