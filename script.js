
// Elementos

// Obtém o botão "Alterar Localização" pelo seu ID.
const btnAlterar = document.getElementById('btnAlterar');
// Obtém o elemento modal (a janela pop-up) pelo seu ID.
const modal = document.getElementById('modalLocalizacao');
// Obtém a lista onde as opções de localização são exibidas.
const listaLocalizacoes = document.getElementById('listaLocalizacoes');
// Obtém o elemento onde a localização atual é mostrada na tela.
const localizacaoAtual = document.getElementById('localizacao-atual');


// Adiciona um "ouvinte de evento" ao botão 'btnAlterar'.
btnAlterar.addEventListener('click', () => {
    // Quando o botão é clicado, adiciona a classe CSS 'active' ao modal, tornando-o visível.
    modal.classList.add('active');
});

// Adiciona um ouvinte de clique ao próprio modal (no fundo escuro).
modal.addEventListener('click', (e) => {
    // Verifica se o clique ocorreu exatamente no fundo (e não em algum elemento dentro do modal).
    if (e.target === modal) {
        // Se sim, remove a classe 'active', fechando o modal.
        modal.classList.remove('active');
    }
});

// Selecionar nova localização
// Adiciona um ouvinte de clique à lista de localizações.
listaLocalizacoes.addEventListener('click', (e) => {
    // Verifica se o elemento clicado é um item de lista (LI).
    if (e.target.tagName === 'LI') {
        // Pega o valor do atributo 'data-regiao' do item clicado.
        const regiaoSelecionada = e.target.getAttribute('data-regiao');
        // Atualiza o texto da localização atual na tela.
        localizacaoAtual.textContent = regiaoSelecionada;
        // Fecha o modal.
        modal.classList.remove('active');

        // Exibe um alerta de confirmação.
        alert(`Região alterada para ${regiaoSelecionada}.`);
    }
});

// Catálogo de Produtos
const products = [
    // Objeto 1: Primeiro produto com nome, descrição e preço.
    { name: "Carne Moída", description: "Carne moída fresca, ideal para diversos pratos.", price: "R$ 25,00 por kg" },
    // Objeto 2: Segundo produto.
    { name: "Frango Inteiro", description: "Frango inteiro de qualidade, pronto para ser assado.", price: "R$ 18,00 por unidade" },
    // Objeto 3: Terceiro produto.
    { name: "Picanha", description: "Picanha de primeira, perfeita para o churrasco.", price: "R$ 79,90 por kg" },
    // Objeto 4: Quarto produto.
    { name: "Costela", description: "Costela macia e suculenta para um churrasco incrível.", price: "R$ 50,00 por kg" }
];


// Função principal para buscar produtos
function searchProducts() {
    // Pega o valor da barra de pesquisa e converte para minúsculas (para busca não sensível a maiúsculas/minúsculas).
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();

    // Filtra o array 'products' com base no termo de busca.
    const filteredProducts = products.filter(product =>
        // Condição de filtro: verifica se o nome (em minúsculas) inclui o termo de busca OU
        product.name.toLowerCase().includes(searchQuery) ||
        // se a descrição (em minúsculas) inclui o termo de busca.
        product.description.toLowerCase().includes(searchQuery)
    ); // 

    // Chama a função para exibir os resultados encontrados.
    displayResults(filteredProducts);
}


// Função para exibir os resultados da busca na interface
function displayResults(filteredProducts) {
    // Obtém a seção onde os resultados serão mostrados.
    const resultSection = document.getElementById("search-results");

    // Limpa qualquer resultado de busca anterior.
    resultSection.innerHTML = "";

    // Verifica se nenhum produto foi encontrado.
    if (filteredProducts.length === 0) {
        // Se a lista estiver vazia, exibe uma mensagem.
        resultSection.innerHTML = "<p>Nenhum produto encontrado.</p>";
    } else {
        // Itera sobre a lista de produtos encontrados.
        filteredProducts.forEach(product => {
            // Cria um novo elemento DIV para cada produto.
            const productElement = document.createElement("div");
            // Adiciona a classe CSS 'product-item'.
            productElement.classList.add("product-item");
            // Preenche o conteúdo HTML do cartão do produto.
            productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>${product.price}</strong></p>
                `;
            // Adiciona o cartão do produto à seção de resultados.
            resultSection.appendChild(productElement);
        });
    }
}

// Funcionalidade de Carrossel (Slideshow)

// Variável para rastrear o slide atualmente visível (começa em 0).
let slideIndex = 0;
// Inicia o ciclo do carrossel.
showSlides();

// Função que controla a transição de slides
function showSlides() {
    let i;
    // Obtém todos os slides com a classe 'mySlides'.
    let slides = document.getElementsByClassName("mySlides");
    // Obtém todos os indicadores (pontos) com a classe 'dot'.
    let dots = document.getElementsByClassName("dot");
    
    // Loop para esconder todos os slides.
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Avança para o próximo índice.
    slideIndex++;
    // Se o índice exceder o número de slides, volta para o primeiro (índice 1).
    if (slideIndex > slides.length) { slideIndex = 1 }
    
    // Loop para remover a marcação 'active' de todos os indicadores.
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Exibe o slide atual.
    slides[slideIndex - 1].style.display = "block";
    // Marca o indicador correspondente como 'active'.
    dots[slideIndex - 1].className += " active";
    
    // Agenda a próxima execução desta função para daqui a 2 segundos (2000 milissegundos).
    setTimeout(showSlides, 2000); // Cria a automação do carrossel. 
}
