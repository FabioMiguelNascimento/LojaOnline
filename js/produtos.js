document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(data => {
            const produtos = data.listas[0].produtos;

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

            function preencherListaComProdutos(container, produtosLista, tag) {
                const produtosFiltrados = tag ? produtosLista.filter(produto => produto.tags.includes(tag)) : produtosLista;
                const produtosAleatorios = shuffle(produtosFiltrados).slice(0, 12); // Selecionar 12 produtos aleatórios
                produtosAleatorios.forEach(produto => {
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
                            ${'★'.repeat(produto.estrelas)}
                        </div>
                        <p class="produto-item-preco">${produto.preco}</p>
                        <button class="adicionarCarrinho" data-nome="${produto.titulo}" data-preco="${produto.preco}">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                    `;
                    container.insertAdjacentHTML('beforeend', produtoHTML);
                });
            }

            document.querySelectorAll('.produtos-interno.lista').forEach(lista => {
                const tag = lista.getAttribute('data-tag');
                preencherListaComProdutos(lista, produtos, tag);
            });

            inicializarRolagem();
        })
        .catch(error => console.error('Erro ao carregar os dados do JSON:', error));

    function inicializarRolagem() {
        document.querySelectorAll('.produtos-container').forEach(container => {
            const anteriorButton = container.querySelector('.controle-produtos.anterior');
            const proximoButton = container.querySelector('.controle-produtos.proximo');
            const produtosInterno = container.querySelector('.produtos-interno');
            const itemWidth = produtosInterno.querySelector('.produto-item').clientWidth;
            const gap = parseInt(getComputedStyle(produtosInterno).gap);

            anteriorButton.addEventListener('click', function() {
                produtosInterno.scrollBy({
                    left: -(itemWidth + gap),
                    behavior: 'smooth'
                });
            });

            proximoButton.addEventListener('click', function() {
                produtosInterno.scrollBy({
                    left: itemWidth + gap,
                    behavior: 'smooth'
                });
            });

            let isDown = false;
            let startX;
            let scrollLeft;
            let velocity = 0;
            let animationFrame;

            produtosInterno.addEventListener('mousedown', (e) => {
                isDown = true;
                produtosInterno.classList.add('active');
                startX = e.pageX - produtosInterno.offsetLeft;
                scrollLeft = produtosInterno.scrollLeft;
                produtosInterno.style.cursor = 'grabbing';
                e.preventDefault();
            });

            produtosInterno.addEventListener('mouseleave', () => {
                isDown = false;
                produtosInterno.classList.remove('active');
                produtosInterno.style.cursor = 'grab';
                cancelAnimationFrame(animationFrame);
            });

            produtosInterno.addEventListener('mouseup', () => {
                isDown = false;
                produtosInterno.classList.remove('active');
                produtosInterno.style.cursor = 'grab';
                cancelAnimationFrame(animationFrame);
                smoothScroll();
            });

            produtosInterno.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - produtosInterno.offsetLeft;
                const walk = (x - startX) * 1.5; 
                produtosInterno.scrollLeft = scrollLeft - walk;
                velocity = walk; 
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(updateScroll);
            });

            function updateScroll() {
                if (isDown) return;
                produtosInterno.scrollLeft -= velocity;
                velocity *= 0.95; 
                if (Math.abs(velocity) > 0.5) {
                    animationFrame = requestAnimationFrame(updateScroll);
                }
            }

            function smoothScroll() {
                if (Math.abs(velocity) < 0.5) return;
                produtosInterno.scrollLeft -= velocity;
                velocity *= 0.95; 
                animationFrame = requestAnimationFrame(smoothScroll);
            }

            produtosInterno.addEventListener('dragstart', (e) => {
                e.preventDefault(); 
            });
        });
    }
});
