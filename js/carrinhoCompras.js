document.addEventListener("DOMContentLoaded", function () {
    // Função para atualizar o total do carrinho
    function atualizarTotalCarrinho() {
        const totalElement = document.getElementById('carrinhoCompras-valorTotal');
        const precos = document.querySelectorAll('.carrinhoCompras-item-preco');
        let total = 0;

        precos.forEach(preco => {
            const precoTexto = preco.innerText.trim(); // Remove espaços em branco extras
            const precoFloat = parseFloat(precoTexto.replace('R$', '').replace(',', '.')); // Remove 'R$' e substitui vírgula por ponto
            if (!isNaN(precoFloat)) { // Verifica se a conversão foi bem-sucedida
                total += precoFloat;
            }
        });

        totalElement.innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

    // Função para adicionar itens ao carrinho
    function adicionarItensAoCarrinho(produtos) {
        const container = document.getElementById('carrinhoComprasInterno');
        if (!container) {
            console.error('Elemento carrinhoComprasInterno não encontrado.');
            return;
        }

        console.log('Produtos:', produtos); // Verifica se os produtos estão corretamente carregados do JSON

        produtos.forEach(produto => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrinhoCompras-item');

            itemDiv.innerHTML = `
                <a href=""><img src="${produto.imagem}" class="carrinhoCompras-item-img"></a>
                <div class="carrinhoCompras-item-content">
                    <span class="carrinhoCompras-item-preco">${produto.preco}</span>
                    <button class="carrinhoCompras-item-botao">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            container.appendChild(itemDiv);
        });

        // Atualiza o total do carrinho
        atualizarTotalCarrinho();

        // Adiciona event listeners para os botões de remoção
        document.querySelectorAll('.carrinhoCompras-item-botao').forEach(botao => {
            botao.addEventListener('click', function (event) {
                event.stopPropagation(); // Evita que o clique feche o carrinho
                this.closest('.carrinhoCompras-item').remove();
                atualizarTotalCarrinho();
            });
        });
    }

    // Fetch dos dados JSON e inicialização do carrinho
    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(produtosData => {
            const todosProdutos = produtosData.listas.flat(); // Combina todas as listas de produtos em uma única lista
            adicionarItensAoCarrinho(todosProdutos);
        })
        .catch(error => console.error('Erro ao carregar dados JSON:', error));

    // Abrir carrinho lateral
    document.getElementById('carrinhoIcone').addEventListener('click', function () {
        document.getElementById('carrinhoContainer').classList.toggle('active');
    });

    // Fechar lateral 
    document.getElementById('carrinhoFechar').addEventListener('click', function () {
        document.getElementById('carrinhoContainer').classList.remove('active');
    });

    // Fechar o carrinho ao clicar fora
    window.addEventListener('click', function (event) {
        var carrinhoContainer = document.getElementById('carrinhoContainer');
        if (!carrinhoContainer.contains(event.target) && !document.getElementById('carrinhoIcone').contains(event.target)) {
            carrinhoContainer.classList.remove('active');
        }
    });

    // Evitar que cliques dentro do carrinho fechem o carrinho
    document.getElementById('carrinhoContainer').addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
