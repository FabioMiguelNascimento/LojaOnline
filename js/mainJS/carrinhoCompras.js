document.addEventListener("DOMContentLoaded", function () {
    function atualizarTotalCarrinho() {
        const totalElement = document.getElementById('carrinhoCompras-valorTotal');
        const precos = document.querySelectorAll('.carrinhoCompras-item-preco');
        let total = 0;

        precos.forEach(preco => {
            const precoTexto = preco.innerText.trim(); 
            const precoFloat = parseFloat(precoTexto.replace('R$', '').replace(',', '.')); 
            if (!isNaN(precoFloat)) { 
                total += precoFloat;
            }
        });

        totalElement.innerText = 'R$ ' + total.toFixed(2).replace('.', ',');
    }

    function adicionarItensAoCarrinho(produtos) {
        const container = document.getElementById('carrinhoComprasInterno');
        if (!container) {
            console.error('Elemento carrinhoComprasInterno não encontrado.');
            return;
        }

        console.log('Produtos:', produtos);

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

        atualizarTotalCarrinho();

        document.querySelectorAll('.carrinhoCompras-item-botao').forEach(botao => {
            botao.addEventListener('click', function (event) {
                event.stopPropagation(); // Evita que o clique feche o carrinho
                this.closest('.carrinhoCompras-item').remove();
                atualizarTotalCarrinho();
            });
        });
    }

    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(produtosData => {
            const todosProdutos = produtosData.listas.flat();
            adicionarItensAoCarrinho(todosProdutos);
        })
        .catch(error => console.error('Erro ao carregar dados JSON:', error));

    document.getElementById('carrinhoIcone').addEventListener('click', function () {
        document.getElementById('carrinhoContainer').classList.toggle('active');
    });

    document.getElementById('carrinhoFechar').addEventListener('click', function () {
        document.getElementById('carrinhoContainer').classList.remove('active');
    });

    window.addEventListener('click', function (event) {
        var carrinhoContainer = document.getElementById('carrinhoContainer');
        if (!carrinhoContainer.contains(event.target) && !document.getElementById('carrinhoIcone').contains(event.target)) {
            carrinhoContainer.classList.remove('active');
        }
    });

    document.getElementById('carrinhoContainer').addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
