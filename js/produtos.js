document.addEventListener("DOMContentLoaded", function() {
    // Carregar dados do JSON
    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(data => {
            const produtos = data.listas[0].produtos;
            console.log('Produtos carregados:', produtos);

            // Função para embaralhar produtos aleatoriamente
            function shuffle(array) {
                let currentIndex = array.length, temporaryValue, randomIndex;
                while (currentIndex !== 0) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }

            // Função para preencher uma lista com 12 produtos aleatórios filtrados por tag
            function preencherListaComProdutos(container, produtosLista, tag) {
                const produtosFiltrados = tag ? produtosLista.filter(produto => produto.tags.includes(tag)) : produtosLista;
                const produtosAleatorios = shuffle(produtosFiltrados).slice(0, 12); // Selecionar 12 produtos aleatórios
                produtosAleatorios.forEach(produto => {
                    const produtoHTML = `
                        <div class="produto-item">
                            <img src="${produto.imagem}" alt="${produto.titulo}">
                            <h2 class="produto-item-titulo">${produto.titulo}</h2>
                            <p class="produto-item-descricao">${produto.descricao}</p>
                            <div class="produto-item-estrelas">
                                ${'★'.repeat(produto.estrelas)}
                            </div>
                            <p class="produto-item-preco">${produto.preco}</p>
                        </div>
                    `;
                    container.insertAdjacentHTML('beforeend', produtoHTML);
                });
                console.log(`Produtos adicionados à lista: ${container.className}`);
            }

            // Selecionar todas as listas e preenchê-las com produtos
            document.querySelectorAll('.produtos-interno.lista').forEach(lista => {
                const tag = lista.getAttribute('data-tag');
                console.log(`Preenchendo lista: ${lista.className} com tag: ${tag}`);
                preencherListaComProdutos(lista, produtos, tag);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados do JSON:', error));
});
