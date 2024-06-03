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

    const categoriaTitulo = document.getElementById('categoria-titulo');
    const produtoInterno = document.querySelector('.produto-interno');

    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const pesquisa = params.get('pesquisa');

    if (pesquisa) {
        categoriaTitulo.textContent = `Pesquisa: "${pesquisa}"`;

        // Carregar dados do JSON e filtrar os produtos pela pesquisa
        fetch('./data/produtos.json')
            .then(response => response.json())
            .then(data => {
                const produtos = data.listas[0].produtos;
                const produtosFiltrados = produtos.filter(produto =>
                    removeAcentos(produto.titulo.toLowerCase()).includes(removeAcentos(pesquisa.toLowerCase()))
                );

                renderizarProdutos(produtosFiltrados, pesquisa);
            })
            .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
    } else if (tag) {
        categoriaTitulo.textContent = categoriaNomes[tag] || "Categoria Desconhecida";

        // Carregar dados do JSON e filtrar os produtos pela tag
        fetch('./data/produtos.json')
            .then(response => response.json())
            .then(data => {
                const produtos = data.listas[0].produtos;
                const produtosFiltrados = produtos.filter(produto => produto.tags.includes(tag));

                renderizarProdutos(produtosFiltrados, '');
            })
            .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
    } else {
        console.error('Nenhuma tag de categoria fornecida na URL.');

        // Caso não haja tag nem pesquisa, mostrar mensagem de erro ou redirecionar para a página inicial, por exemplo
        // window.location.href = '/';
    }

    // Função para renderizar os produtos na página
    const renderizarProdutos = (produtosFiltrados, pesquisa) => {
        produtoInterno.innerHTML = ''; // Limpar conteúdo atual
        if (produtosFiltrados.length > 0) {
            produtosFiltrados.forEach(produto => {
                const produtoHTML = `
                    <div class="produto-item">
                        <img class="produto-item-img" src="${produto.imagem}" alt="${produto.titulo}">
                        <h2 class="produto-item-titulo">${produto.titulo}</h2>
                        <p class="produto-item-descricao">${produto.descricao}</p>
                        <div class="produto-item-estrelas">
                            ${'★'.repeat(produto.estrelas)}
                        </div>
                        <p class="produto-item-preco">${produto.preco}</p>
                        <button class="adicionarCarrinho" data-nome="${produto.titulo}" data-preco="${produto.preco}">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                `;
                produtoInterno.insertAdjacentHTML('beforeend', produtoHTML);
            });
        } else {
            produtoInterno.innerHTML = `
                <p class="texto-ajuda">Não encontrou o que deseja? Que tal pesquisar por todos os produtos!</p>
                <div class="ajuda-container">
                    <input type="text" id="pesquisaTodos" placeholder="Pesquisar todos os produtos">
                    <button id="pesquisarTodosBtn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            `;
            const pesquisarTodosBtn = document.getElementById('pesquisarTodosBtn');
            const pesquisaTodosInput = document.getElementById('pesquisaTodos');
            pesquisarTodosBtn.addEventListener('click', () => {
                const pesquisaTodos = pesquisaTodosInput.value.trim().toLowerCase();
                window.location.href = `categorias.html?pesquisa=${pesquisaTodos}`;
            });
            pesquisaTodosInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const pesquisaTodos = pesquisaTodosInput.value.trim().toLowerCase();
                    window.location.href = `categorias.html?pesquisa=${pesquisaTodos}`;
                }
            });
        }
    };

    // Função para remover acentos de uma string
    const removeAcentos = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
});
