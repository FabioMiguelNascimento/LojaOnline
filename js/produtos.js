document.addEventListener("DOMContentLoaded", function () {
    function setupScroll(containerSelector, produtosData) {
        const containers = document.querySelectorAll(containerSelector);

        containers.forEach((container, index) => {
            const interno = container.querySelector('.produtos-interno');
            const anteriorButton = container.querySelector('.controle-produtos.anterior');
            const proximoButton = container.querySelector('.controle-produtos.proximo');

            if (!interno || !anteriorButton || !proximoButton) {
                console.error('Elemento não encontrado dentro do container:', container);
                return;
            }

            let itemWidth;
            let gap;

            produtosData.listas[index].forEach(produto => {
                const produtoItem = document.createElement('div');
                produtoItem.classList.add('produto-item');

                const estrelasHtml = new Array(5).fill(0).map((_, index) => {
                    return index < produto.estrelas ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
                }).join('');

                produtoItem.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.titulo}">
                    <h2 class="produto-item-titulo">${produto.titulo}</h2>
                    <p class="produto-item-descricao">${produto.descricao}</p>
                    <div class="produto-item-estrelas">
                        ${estrelasHtml}
                    </div>
                    <p class="produto-item-preco">${produto.preco}</p>
                `;

                interno.appendChild(produtoItem);

                itemWidth = produtoItem.clientWidth;
                gap = parseInt(getComputedStyle(interno).gap);
            });

            anteriorButton.addEventListener('click', function () {
                interno.scrollBy({
                    left: -(itemWidth + gap),
                    behavior: 'smooth'
                });
            });

            proximoButton.addEventListener('click', function () {
                interno.scrollBy({
                    left: itemWidth + gap,
                    behavior: 'smooth'
                });
            });

            let isDown = false;
            let startX;
            let scrollLeft;
            let velocity = 0;
            let animationFrame;

            interno.addEventListener('mousedown', (e) => {
                isDown = true;
                interno.classList.add('active');
                startX = e.pageX - interno.offsetLeft;
                scrollLeft = interno.scrollLeft;
                interno.style.cursor = 'grabbing';
                e.preventDefault();
            });

            interno.addEventListener('mouseleave', () => {
                isDown = false;
                interno.classList.remove('active');
                interno.style.cursor = 'grab';
                cancelAnimationFrame(animationFrame);
            });

            interno.addEventListener('mouseup', () => {
                isDown = false;
                interno.classList.remove('active');
                interno.style.cursor = 'grab';
                cancelAnimationFrame(animationFrame);
                smoothScroll();
            });

            interno.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - interno.offsetLeft;
                const walk = (x - startX) * 1.5;
                interno.scrollLeft = scrollLeft - walk;
                velocity = walk;
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(updateScroll);
            });

            function updateScroll() {
                if (isDown) return;
                interno.scrollLeft -= velocity;
                velocity *= 0.95;
                if (Math.abs(velocity) > 0.5) {
                    animationFrame = requestAnimationFrame(updateScroll);
                }
            }

            function smoothScroll() {
                if (Math.abs(velocity) < 0.5) return;
                interno.scrollLeft -= velocity;
                velocity *= 0.95;
                animationFrame = requestAnimationFrame(smoothScroll);
            }

            interno.addEventListener('dragstart', (e) => {
                e.preventDefault();
            });
        });
    }

    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(produtosData => {
            setupScroll('.produtos-container', produtosData);
        })
        .catch(error => console.error('Erro ao carregar dados JSON:', error));
});
