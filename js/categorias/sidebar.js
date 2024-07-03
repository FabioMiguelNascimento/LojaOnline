function initializeSidebar(produtos, categoriaNomes) {
    window.produtos = produtos;
    atualizarFiltros(produtos, categoriaNomes);
    adicionarEventListeners();

    // Adicionar evento de clique ao botão "Filtrar"
    const filtrarBtn = document.getElementById('filtrarBtn');
    if (filtrarBtn) {
        filtrarBtn.addEventListener('click', () => {
            console.log('Botão Filtrar clicado');
            filtrarProdutos();
        });
    }
}

function atualizarFiltros(produtos, categoriaNomes) {
    atualizarCategorias(produtos, categoriaNomes);
    atualizarFaixaPreco(produtos);
    atualizarAvaliacao(produtos);
}

function atualizarCategorias(produtos, categoriaNomes) {
    const categorias = {};
    produtos.forEach(produto => {
        produto.tags.forEach(tag => {
            const nome = categoriaNomes[tag] || tag;
            categorias[nome] = (categorias[nome] || 0) + 1;
        });
    });

    const categoriasLista = document.querySelector('.aside-selecoes-lista');
    categoriasLista.innerHTML = '';
    Object.entries(categorias).forEach(([nome, count]) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="${nome}" name="categoria" value="${nome}">
            <label for="${nome}">${nome} (${count})</label>
        `;
        categoriasLista.appendChild(li);
    });
}

function atualizarFaixaPreco(produtos) {
    const minPrecoInput = document.getElementById('min-input');
    const maxPrecoInput = document.getElementById('max-input');
    const minPreco = Math.min(...produtos.map(produto => parseFloat(produto.preco.replace('R$', '').replace(',', '.'))));
    const maxPreco = Math.max(...produtos.map(produto => parseFloat(produto.preco.replace('R$', '').replace(',', '.'))));
    minPrecoInput.value = minPreco.toFixed(2);
    maxPrecoInput.value = maxPreco.toFixed(2);
}

function atualizarAvaliacao(produtos) {
    const avaliacoes = {};
    produtos.forEach(produto => {
        const estrelas = produto.estrelas;
        avaliacoes[estrelas] = (avaliacoes[estrelas] || 0) + 1;
    });

    const avaliacoesLista = document.querySelector('.aside-avaliacao');
    avaliacoesLista.innerHTML = '';
    Object.entries(avaliacoes).forEach(([estrelas, count]) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="estrela-${estrelas}" name="avaliacao" value="${estrelas}">
            <label for="estrela-${estrelas}">${'★'.repeat(estrelas)} (${count})</label>
        `;
        avaliacoesLista.appendChild(li);
    });
}

function filtrarProdutos() {
    console.log('Filtrando produtos...');
    const categoriasSelecionadas = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(checkbox => checkbox.value);
    const minPreco = parseFloat(document.getElementById('min-input').value);
    const maxPreco = parseFloat(document.getElementById('max-input').value);
    const avaliacoesSelecionadas = Array.from(document.querySelectorAll('input[name="avaliacao"]:checked')).map(checkbox => parseInt(checkbox.value));

    const produtosFiltrados = window.produtos.filter(produto => {
        const preco = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
        const atendeCategoria = categoriasSelecionadas.length === 0 || produto.tags.some(tag => categoriasSelecionadas.includes(tag));
        const atendePreco = preco >= minPreco && preco <= maxPreco;
        const atendeAvaliacao = avaliacoesSelecionadas.length === 0 || avaliacoesSelecionadas.includes(produto.estrelas);

        return atendeCategoria && atendePreco && atendeAvaliacao;
    });

    renderizarProdutos(produtosFiltrados, 1);
}
