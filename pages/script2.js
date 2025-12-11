
  // Catálogo principal de produtos (Array de objetos)
const produtos = [
    // Objeto 1: Detalhes do produto.
    {
      id: 1,
      nome: "Filezinho Sassami Empanado Swift 700g",
      preco: 24.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/209268-1500-1000/622073-filezinho-sassami-empanado_inn.jpg?v=638884534912530000"
    },
    // ... outros produtos
    {
      id: 2,
      nome: "Cubos de Músculo Swift 500g",
      preco: 19.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAliAjkcrVjgrlTCgNBJzzMaTA73mk-WIXw&s"
    },
    {
      id: 3,
      nome: "Pedaços de Filé de Salmão Swift 500g",
      preco: 52.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/209154-768-768/616003-pedacos-de-file-de-salmao_inn.jpg?v=638882839751400000"
    },
    {
      id: 4,
      nome: "Almôndegas Bovinas Swift 500g",
      preco: 18.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/208903-1500-1000/617769-almondegas-bovinas_rec.jpg?v=638875995088100000"
    },
];

// Catálogo de produtos de Natal (Array separado)
const produtosNatal = [
    // ... produtos de Natal
    {
      id: 5,
      nome: "Tender Swift de 0,8kg a 1,8kg",
      preco: 73.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://www.swift.com.br/arquivos/ids/209685"
    },
    {
      id: 6,
      nome: "Ave Natalina Festive Swift de 2,8kg a 4,5kg",
      preco: 26.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://www.swift.com.br/arquivos/ids/209832"
    },
    {
      id: 7,
      nome: "Pernil de Cordeiro Temperado Swift de 1,2kg",
      preco: 94.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/206688-1500-1000/599070-pernil-de-cordeiro_1.jpg.jpg?v=638821511090230000"
    },
    {
      id: 8,
      nome: "Lombo de Bacalhau Desfiado Swift 800g",
      preco: 99.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/209955-1500-1000/622485-lombo-bacalhau-dessalgado_inn.jpg?v=638901692506930000"
    },
];

// Objeto que armazena os itens no carrinho. O ID do produto é a chave.
// Exemplo: { 1: { nome: "...", preco: 24.90, quantidade: 2 } }
const cart = {};

// Função para renderizar os produtos do catálogo principal na página.
function renderProdutos() {
    // Localiza o container no HTML onde os produtos serão inseridos.
    const container = document.querySelector('#products .products-grid');
    // Itera sobre cada produto no array 'produtos'.
    produtos.forEach(prod => {
        // Cria um novo elemento DIV para o cartão do produto.
        const div = document.createElement('div');
        div.className = 'product-card';
        // Define o HTML interno do cartão (imagem, nome, preço, input de quantidade, botão).
        div.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <div class="product-name">${prod.nome}</div>
        <div class="product-desc">${prod.descricao}</div>
        <div class="product-price">R$ ${prod.preco.toFixed(2)}</div>
        <input type="number" class="quantity-input" min="1" value="1" id="qty-${prod.id}" />
        <button class="add-btn" onclick="addToCart(${prod.id}, '${prod.nome}', ${prod.preco})">Adicionar</button>
        `;
        // Adiciona o novo cartão ao container na página.
        container.appendChild(div);
    });
}
// Função similar para renderizar os produtos da seção Natal.
function renderProdutosNatal() {
    const container = document.querySelector('#products-natal .products-grid');
    produtosNatal.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
        <img src="${prod.imagem}" alt="${prod.nome}">
        <div class="product-name">${prod.nome}</div>
        <div class="product-desc">${prod.descricao}</div>
        <div class="product-price">R$ ${prod.preco.toFixed(2)}</div>
        <input type="number" class="quantity-input" min="1" value="1" id="qty-${prod.id}" />
        <button class="add-btn" onclick="addToCart(${prod.id}, '${prod.nome}', ${prod.preco})">Adicionar</button>
        `;
        container.appendChild(div);
    });
}

// Função para adicionar um produto ao objeto 'cart'.
function addToCart(id, nome, preco) {
    // Encontra o input de quantidade correspondente ao produto pelo ID.
    const qtyInput = document.getElementById(`qty-${id}`);
    // Converte o valor do input para um número inteiro.
    let quantidade = parseInt(qtyInput.value);
    // Garante que a quantidade seja pelo menos 1.
    if (quantidade < 1) quantidade = 1;

    // Verifica se o produto (ID) JÁ existe no carrinho.
    if (cart[id]) {
        // Se existir, apenas SOMA a nova quantidade à quantidade existente.
        cart[id].quantidade += quantidade;
    } else {
        // Se NÃO existir, cria um novo item no objeto 'cart'.
        cart[id] = { nome: nome, preco: preco, quantidade: quantidade };
    }
    // Reseta o input de quantidade do produto para 1.
    qtyInput.value = 1; 
    // Atualiza a visualização do carrinho.
    renderCart();
}

// Função para remover um produto do carrinho.
function removeFromCart(id) {
    // Usa 'delete' para remover o item (a chave com o ID) do objeto 'cart'.
    delete cart[id];
    // Atualiza a visualização do carrinho.
    renderCart();
}

// Função para desenhar (renderizar) o conteúdo do carrinho na tela.
function renderCart() {
    // Obtém o elemento HTML onde os itens do carrinho são listados.
    const cartItemsEl = document.getElementById('cart-items');
    // Limpa o conteúdo atual (para redesenhar do zero).
    cartItemsEl.innerHTML = '';
    // Obtém uma lista de todos os IDs (chaves) que estão no objeto 'cart'.
    const items = Object.keys(cart);
    
    // Verifica se o carrinho está vazio.
    if (items.length === 0) {
        // Exibe mensagem de carrinho vazio.
        cartItemsEl.innerHTML = "<p>Seu carrinho está vazio.</p>";
        // Limpa o total.
        document.getElementById('cart-total').innerText = '';
        return; // Sai da função.
    }
    
    let total = 0;
    // Itera sobre os IDs dos produtos no carrinho.
    items.forEach(id => {
        const item = cart[id];
        // Calcula o subtotal do item: preço * quantidade.
        const itemTotal = item.preco * item.quantidade;
        // Soma o subtotal ao total geral do carrinho.
        total += itemTotal;
        
        // Cria o elemento DIV para exibir o item no carrinho.
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-qty">${item.quantidade}</div>
        <div class="cart-item-price">R$ ${itemTotal.toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart(${id})">X</button>
        `;
        // Adiciona o item à lista de itens do carrinho.
        cartItemsEl.appendChild(div);
    });
    // Exibe o total geral formatado na tela.
    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

// Inicializar a página
// Chama a função para desenhar os produtos na abertura da página.
renderProdutos();
// Chama a função para desenhar os produtos de Natal.
renderProdutosNatal();
// Chama a função para desenhar o carrinho (que estará vazio inicialmente).
renderCart();

// Lógica do Formulário de Contato

// Adiciona um ouvinte de evento 'submit' ao formulário de contato.
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (que recarregaria a página).

    // Captura os valores dos campos de input, removendo espaços em branco extras (.trim()).
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    // Obtém o elemento onde as mensagens de feedback serão exibidas.
    const responseMessage = document.getElementById('responseMessage');

    // Validação básica: checa se nome, email e mensagem estão vazios.
    if (!name || !email || !message) {
        // Configura a mensagem para erro.
        responseMessage.className = 'message error';
        responseMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        responseMessage.style.display = 'block';
        return; // Interrompe a função, impedindo o envio.
    }

    // Validação de email simples usando Expressão Regular (Regex).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // Configura a mensagem para erro de formato de email.
        responseMessage.className = 'message error';
        responseMessage.textContent = 'Por favor, insira um email válido.';
        responseMessage.style.display = 'block';
        return; // Interrompe a função.
    }

    // Simulação de envio (código real de backend faria o envio).
    // Configura a mensagem para sucesso.
    responseMessage.className = 'message success';
    responseMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
    responseMessage.style.display = 'block';

    // Limpa todos os campos do formulário.
    document.getElementById('contactForm').reset();

    // Oculta a mensagem de sucesso após 5 segundos.
    setTimeout(() => {
        responseMessage.style.display = 'none';
    }, 5000); // 
});
    
