document.addEventListener("DOMContentLoaded", function () {
    // Mapeamento de tags para nomes de categorias
    const categoriaNomes = {
        "eletronicos": "Eletrônicos",
        "eletrodomesticos": "Eletrodomésticos",
        "computador": "Computadores",
        "celular": "Celulares",
        "tech": "Tecnologias",
        "casa": "Casa",
        "banheiro": "Banheiro",
        "escritorio": "Escritório",
        "jardim": "Jardim",
        "cozinha": "Cozinha",
        "ferramentas": "Ferramentas",
        "moveis": "Móveis",
        "roupas": "Roupas",
        "decoracao": "Decoração",
        "automotivo": "Automotivo",
        "games": "Games",
        "brinquedos": "Brinquedos",
        "praia": "Praia"
    };

    // Obter a tag da URL
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');

    if (tag) {
        // Atualizar o título da categoria
        const categoriaTitulo = document.getElementById('categoria-titulo');
        categoriaTitulo.textContent = categoriaNomes[tag] || "Categoria Desconhecida";

        // Carregar dados do JSON e filtrar os produtos pela tag
        fetch('./data/produtos.json')
            .then(response => response.json())
            .then(data => {
                const produtos = data.listas[0].produtos;

                // Função para renderizar os produtos na página
                const renderizarProdutos = (produtosFiltrados, pesquisa) => {
                    const produtoInterno = document.querySelector('.produto-interno');
                    produtoInterno.innerHTML = ''; // Limpar conteúdo atual
                    if (produtosFiltrados.length > 0) {
                        produtosFiltrados.forEach(produto => {
                            const produtoHTML = `
                                <div class="produto-item">
                                    <img src="${produto.imagem}" alt="${produto.titulo}">
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
                        categoriaTitulo.textContent = categoriaNomes[tag] || "Categoria Desconhecida";
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
                            const produtosFiltradosTodos = produtos.filter(produto =>
                                produto.titulo.toLowerCase().includes(pesquisaTodos)
                            );
                            renderizarProdutos(produtosFiltradosTodos, pesquisaTodos);
                            categoriaTitulo.textContent = `Pesquisa: "${pesquisaTodos}"`;
                        });
                    }
                };

                // Filtrar produtos com base na tag da categoria
                let produtosFiltrados = produtos.filter(produto => produto.tags.includes(tag));

                // Renderizar os produtos filtrados inicialmente
                renderizarProdutos(produtosFiltrados, '');

                // Adicionar event listener para o campo de pesquisa por nome
                const pesquisaNomeInput = document.getElementById('pesquisaNome');
                pesquisaNomeInput.addEventListener('input', () => {
                    const pesquisaNome = pesquisaNomeInput.value.trim().toLowerCase();
                    produtosFiltrados = produtos.filter(produto =>
                        produto.titulo.toLowerCase().includes(pesquisaNome) && produto.tags.includes(tag)
                    );
                    renderizarProdutos(produtosFiltrados, pesquisaNome);
                });

                // Adicionar event listener para o campo de pesquisa por categoria
                const pesquisaCategoriaInput = document.getElementById('pesquisaCategoria');
                pesquisaCategoriaInput.addEventListener('input', () => {
                    const pesquisaCategoria = pesquisaCategoriaInput.value.trim().toLowerCase();
                    produtosFiltrados = produtos.filter(produto =>
                        produto.tags.includes(tag) && produto.tags.some(tag => tag.includes(pesquisaCategoria))
                    );
                    renderizarProdutos(produtosFiltrados, pesquisaCategoria);
                });

                // Adicionar event listener para o campo de pesquisa por todos os produtos
                const pesquisaTodosInput = document.getElementById('pesquisaTodos');
                const pesquisarTodosBtn = document.getElementById('pesquisarTodosBtn');
                pesquisarTodosBtn.addEventListener('click', () => {
                    const pesquisaTodos = pesquisaTodosInput.value.trim().toLowerCase();
                    const produtosFiltradosTodos = produtos.filter(produto =>
                        produto.titulo.toLowerCase().includes(pesquisaTodos)
                    );
                    renderizarProdutos(produtosFiltradosTodos, pesquisaTodos);
                    categoriaTitulo.textContent = `Pesquisa: "${pesquisaTodos}"`;
                });
            })
            .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
    } else {
        console.error('Nenhuma tag de categoria fornecida na URL.');
    }
});
