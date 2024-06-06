document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/produtos.json')
        .then(response => response.json())
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = parseInt(urlParams.get('id'));

            const listaProdutos = data.listas.find(lista => lista.produtos.some(produto => produto.id === id));
            const produto = listaProdutos.produtos.find(produto => produto.id === id);

            document.querySelector('.produtoTitulo h2').textContent = produto.titulo;
            document.querySelector('.produtoImg img').src = produto.imagem;
            document.querySelector('.produtoSubImg img.active').src = produto.imagem;
            document.querySelector('.valor span').textContent = produto.preco;
            document.querySelector('.produtoDescricao p').textContent = produto.descricaoDetalhada; 
            document.querySelector('.produto-estrelas').textContent = '★'.repeat(produto.estrelas);
            document.querySelector('.produtoImg img').alt = produto.titulo;

            const subImgsContainer = document.querySelector('.produtoSubImg');
            subImgsContainer.innerHTML = '';
            produto.subImg.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                subImgsContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
});
