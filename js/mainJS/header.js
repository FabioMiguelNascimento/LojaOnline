var menu = document.querySelector(".menuMobile");

menu.addEventListener("click", function () {
  var isExpanded = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", !isExpanded);
});

document.addEventListener("DOMContentLoaded", function () {
  const categoriaNomes = {
    eletrodomesticos: "Eletrodomésticos",
    computador: "Computador",
    celular: "Celular",
    tech: "Tecnologia",
    banheiro: "Banheiro",
    escritorio: "Escritório",
    jardim: "Jardim",
    cozinha: "Cozinha",
    ferramentas: "Ferramentas",
    moveis: "Móveis",
    roupas: "Roupas",
    decoracao: "Decoração",
    automotivo: "Automotivo",
    games: "Games",
    brinquedos: "Brinquedos",
    praia: "Praia",
  };

  const categoriaIcones = {
    eletrodomesticos: "./icons/ico-eletro.svg",
    computador: "./icons/ico-computador.svg",
    celular: "./icons/ico-celular.svg",
    tech: "./icons/ico-tech.svg",
    banheiro: "./icons/ico-banheiro.svg",
    escritorio: "./icons/ico-escritorio.svg",
    jardim: "./icons/ico-jardim.svg",
    cozinha: "./icons/ico-cozinha.svg",
    ferramentas: "./icons/ico-ferramentas.svg",
    moveis: "./icons/ico-moveis.svg",
    roupas: "./icons/ico-roupas.svg",
    decoracao: "./icons/ico-decoracao.svg",
    automotivo: "./icons/ico-automotivo.svg",
    games: "./icons/ico-games.svg",
    brinquedos: "./icons/ico-brinquedos.svg",
    praia: "./icons/ico-praia.svg",
  };

  const headerSearchInput = document.querySelector(".search input");
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.classList.add("suggestions-container");
  document.body.appendChild(suggestionsContainer);

  const renderizarSugestoes = () => {
    suggestionsContainer.innerHTML = ""; 
    for (const [key, value] of Object.entries(categoriaNomes)) {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.innerHTML = `<img src="${categoriaIcones[key]}" alt="${value} Icon">${value}`;
      suggestionItem.dataset.tag = key; 
      suggestionsContainer.appendChild(suggestionItem);
    }
    suggestionsContainer.style.display = "block";
    suggestionsContainer.style.left =
      headerSearchInput.getBoundingClientRect().left + "px";
    suggestionsContainer.style.top =
      headerSearchInput.getBoundingClientRect().bottom + "px";
    suggestionsContainer.style.width = headerSearchInput.offsetWidth + "px";
  };

  headerSearchInput.addEventListener("focus", renderizarSugestoes); 

  document.addEventListener("click", (event) => {
    if (
      !suggestionsContainer.contains(event.target) &&
      event.target !== headerSearchInput
    ) {
      suggestionsContainer.style.display = "none";
    }
  });

  suggestionsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("suggestion-item") ||
      event.target.tagName === "IMG"
    ) {
      const suggestionItem = event.target.classList.contains("suggestion-item")
        ? event.target
        : event.target.parentElement;
      const selectedCategory = suggestionItem.dataset.tag;
      headerSearchInput.value = ""; 
      headerSearchInput.value = suggestionItem.textContent;
      suggestionsContainer.style.display = "none";
      window.location.href = `categorias.html?tag=${selectedCategory}`;
    }
  });

  const headerSearchButton = document.querySelector(".search button");
  headerSearchButton.addEventListener("click", () => {
    const pesquisa = headerSearchInput.value.trim().toLowerCase();
    if (pesquisa.length > 0) {
      headerSearchInput.value = ""; // Limpar o input
      window.location.href = `categorias.html?pesquisa=${pesquisa}`;
    }
  });

  headerSearchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const pesquisa = headerSearchInput.value.trim().toLowerCase();
      if (pesquisa.length > 0) {
        headerSearchInput.value = ""; // Limpar o input
        window.location.href = `categorias.html?pesquisa=${pesquisa}`;
      }
    }
  });
});
