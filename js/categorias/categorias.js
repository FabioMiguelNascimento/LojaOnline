document.addEventListener("DOMContentLoaded", function () {
    const categoriaNomes = {
        // Mapeamento de tags para nomes de categorias
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

    const categoriaTitulo = document.getElementById("categoria-titulo");
    const produtoInterno = document.querySelector(".produto-interno");
    const produtosPorPagina = 50;
    let currentPage = 1;

    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    const pesquisa = params.get("pesquisa");

    const renderizarProdutos = (produtosFiltrados, pageNumber) => {
        produtoInterno.innerHTML = "";
        const startIndex = (pageNumber - 1) * produtosPorPagina;
        const endIndex = startIndex + produtosPorPagina;
        const produtosPaginaAtual = produtosFiltrados.slice(startIndex, endIndex);

        produtosPaginaAtual.forEach((produto) => {
            const produtoHTML = `
                <div class="produto-item">
                    <a href="produto.html?id=${produto.id}">
                        <img class="produto-item-img" src="${produto.imagem}" alt="${produto.titulo}">
                    </a>
                    <a href="produto.html?id=${produto.id}">
                        <h2 class="produto-item-titulo">${produto.titulo}</h2>
                    </a>
                    <p class="produto-item-descricao">${produto.descricao}</p>
                    <div class="produto-item-estrelas">
                        ${"★".repeat(produto.estrelas)}
                    </div>
                    <p class="produto-item-preco">${produto.preco}</p>
                    <button class="adicionarCarrinho" data-nome="${produto.titulo}" data-preco="${produto.preco}">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            `;
            produtoInterno.insertAdjacentHTML("beforeend", produtoHTML);
        });

        renderizarPaginacao(produtosFiltrados.length);
        window.initializeSidebar(produtosFiltrados, categoriaNomes);
    };

    const renderizarPaginacao = (totalProdutos) => {
        const totalPages = Math.ceil(totalProdutos / produtosPorPagina);
        const paginationContainer = document.querySelector(".pagination-container");
        paginationContainer.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement("button");
            pageBtn.classList.add("page-btn");
            pageBtn.textContent = i;
            pageBtn.dataset.page = i;
            if (i === currentPage) {
                pageBtn.classList.add("active");
            }
            paginationContainer.appendChild(pageBtn);
        }
    };

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("page-btn")) {
            const pageNumber = parseInt(event.target.dataset.page);
            currentPage = pageNumber;
            window.scrollTo({ top: 0 });
            fetchProdutosAtualizados(pageNumber);
        }
    });

    const fetchProdutosAtualizados = (pageNumber) => {
        const params = new URLSearchParams(window.location.search);
        const tag = params.get("tag");
        const pesquisa = params.get("pesquisa");

        if (pesquisa) {
            fetch("./data/produtos.json")
                .then((response) => response.json())
                .then((data) => {
                    const produtos = data.listas[0].produtos;
                    const produtosFiltrados = produtos.filter((produto) =>
                        removeAcentos(produto.titulo.toLowerCase()).includes(
                            removeAcentos(pesquisa.toLowerCase())
                        )
                    );

                    renderizarProdutos(produtosFiltrados, pageNumber);
                })
                .catch((error) =>
                    console.error("Erro ao carregar os dados do JSON:", error)
                );
        } else if (tag) {
            fetch("./data/produtos.json")
                .then((response) => response.json())
                .then((data) => {
                    const produtos = data.listas[0].produtos;
                    const produtosFiltrados = produtos.filter((produto) =>
                        produto.tags.includes(tag)
                    );

                    renderizarProdutos(produtosFiltrados, pageNumber);
                })
                .catch((error) =>
                    console.error("Erro ao carregar os dados do JSON:", error)
                );
        } else {
            fetch("./data/produtos.json")
                .then((response) => response.json())
                .then((data) => {
                    const produtos = data.listas[0].produtos;
                    renderizarProdutos(produtos, pageNumber);
                })
                .catch((error) =>
                    console.error("Erro ao carregar os dados do JSON:", error)
                );
        }
    };

    const removeAcentos = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    if (pesquisa) {
        categoriaTitulo.textContent = `Pesquisa: "${pesquisa}"`;

        fetch("./data/produtos.json")
            .then((response) => response.json())
            .then((data) => {
                const produtos = data.listas[0].produtos;
                const produtosFiltrados = produtos.filter((produto) =>
                    removeAcentos(produto.titulo.toLowerCase()).includes(
                        removeAcentos(pesquisa.toLowerCase())
                    )
                );

                renderizarProdutos(produtosFiltrados, currentPage);
            })
            .catch((error) =>
                console.error("Erro ao carregar os dados do JSON:", error)
            );
    } else if (tag) {
        categoriaTitulo.textContent =
            categoriaNomes[tag] || "Categoria Desconhecida";

        fetch("./data/produtos.json")
            .then((response) => response.json())
            .then((data) => {
                const produtos = data.listas[0].produtos;
                const produtosFiltrados = produtos.filter((produto) =>
                    produto.tags.includes(tag)
                );

                renderizarProdutos(produtosFiltrados, currentPage);
            })
            .catch((error) =>
                console.error("Erro ao carregar os dados do JSON:", error)
            );
    } else {
        categoriaTitulo.textContent = "Todos os Produtos";

        fetch("./data/produtos.json")
            .then((response) => response.json())
            .then((data) => {
                const produtos = data.listas[0].produtos;
                renderizarProdutos(produtos, currentPage);
            })
            .catch((error) =>
                console.error("Erro ao carregar os dados do JSON:", error)
            );
    }
});
