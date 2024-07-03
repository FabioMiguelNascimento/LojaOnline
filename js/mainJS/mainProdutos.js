document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = parseInt(urlParams.get('id'));
            const listaProdutos = data.listas.find(lista => lista.produtos.some(produto => produto.id === id));
            const produto = listaProdutos.produtos.find(produto => produto.id === id);

            // Preencher informações do produto
            document.querySelector('.produtoTitulo h2').textContent = produto.titulo;
            document.querySelector('.valor span').textContent = produto.preco;
            document.querySelector('.produtoDescricao p').textContent = produto.descricaoDetalhada;
            document.querySelector('.produto-estrelas').textContent = '★'.repeat(produto.estrelas);

            // Preencher carrossel
            const carouselNav = document.querySelector('.carousel-nav');
            const carouselMain = document.querySelector('.carousel-main');

            // Função para criar e adicionar imagem
            function addImage(src, container, isMain = false) {
                const img = document.createElement('img');
                img.src = src;
                img.alt = produto.titulo;
                if (isMain) {
                    img.classList.add('main-image');
                } else {
                    img.addEventListener('click', () => updateMainImage(src));
                }
                container.appendChild(img);
            }

            // Limpar conteúdo existente
            carouselNav.innerHTML = '';
            carouselMain.innerHTML = '';

            // Adicionar imagem principal
            addImage(produto.imagem, carouselMain, true);

            // Adicionar imagens de navegação
            addImage(produto.imagem, carouselNav);
            produto.subImg.forEach(src => addImage(src, carouselNav));

            // Marcar a primeira imagem como ativa
            if (carouselNav.firstChild) {
                carouselNav.firstChild.classList.add('active');
            }

            // Função para atualizar a imagem principal
            function updateMainImage(src) {
                const mainImage = carouselMain.querySelector('img');
                if (mainImage) {
                    mainImage.src = src;
                }
                carouselNav.querySelectorAll('img').forEach(img => {
                    img.classList.toggle('active', img.src === src);
                });
            }
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
});