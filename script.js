
// Elementos
const btnAlterar = document.getElementById('btnAlterar');
const modal = document.getElementById('modalLocalizacao');
const listaLocalizacoes = document.getElementById('listaLocalizacoes');
const localizacaoAtual = document.getElementById('localizacao-atual');


btnAlterar.addEventListener('click', () => {
    modal.classList.add('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Selecionar nova localização
listaLocalizacoes.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const regiaoSelecionada = e.target.getAttribute('data-regiao');
        localizacaoAtual.textContent = regiaoSelecionada;
        modal.classList.remove('active');



        alert(`Região alterada para ${regiaoSelecionada}.`);
    }
});

const products = [
    { name: "Carne Moída", description: "Carne moída fresca, ideal para diversos pratos.", price: "R$ 25,00 por kg" },
    { name: "Frango Inteiro", description: "Frango inteiro de qualidade, pronto para ser assado.", price: "R$ 18,00 por unidade" },
    { name: "Picanha", description: "Picanha de primeira, perfeita para o churrasco.", price: "R$ 79,90 por kg" },
    { name: "Costela", description: "Costela macia e suculenta para um churrasco incrível.", price: "R$ 50,00 por kg" }
];


function searchProducts() {

    const searchQuery = document.getElementById("search-bar").value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );


    displayResults(filteredProducts);
}


function displayResults(filteredProducts) {
    const resultSection = document.getElementById("search-results");


    resultSection.innerHTML = "";

    if (filteredProducts.length === 0) {
        resultSection.innerHTML = "<p>Nenhum produto encontrado.</p>";
    } else {
        filteredProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product-item");
            productElement.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>${product.price}</strong></p>
                `;
            resultSection.appendChild(productElement);
        });
    }
}
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}





