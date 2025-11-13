
  const produtos = [
    {
      id: 1,
      nome: "Filezinho Sassami Empanado Swift 700g",
      preco: 24.90,
      descricao: "Produto resfriado. Congelado na origem.",
      imagem: "https://swiftbr.vteximg.com.br/arquivos/ids/209268-1500-1000/622073-filezinho-sassami-empanado_inn.jpg?v=638884534912530000"
    },
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

  const produtosNatal = [
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

  const cart = {};

  function renderProdutos() {
    const container = document.querySelector('#products .products-grid');
    produtos.forEach(prod => {
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

  function addToCart(id, nome, preco) {
    const qtyInput = document.getElementById(`qty-${id}`);
    let quantidade = parseInt(qtyInput.value);
    if (quantidade < 1) quantidade = 1;

    if (cart[id]) {
      cart[id].quantidade += quantidade;
    } else {
      cart[id] = { nome: nome, preco: preco, quantidade: quantidade };
    }
    qtyInput.value = 1; // resetar para 1 após adição
    renderCart();
  }

  function removeFromCart(id) {
    delete cart[id];
    renderCart();
  }

  function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    cartItemsEl.innerHTML = '';
    const items = Object.keys(cart);
    if (items.length === 0) {
      cartItemsEl.innerHTML = "<p>Seu carrinho está vazio.</p>";
      document.getElementById('cart-total').innerText = '';
      return;
    }
    let total = 0;
    items.forEach(id => {
      const item = cart[id];
      const itemTotal = item.preco * item.quantidade;
      total += itemTotal;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-name">${item.nome}</div>
        <div class="cart-item-qty">${item.quantidade}</div>
        <div class="cart-item-price">R$ ${itemTotal.toFixed(2)}</div>
        <button class="remove-btn" onclick="removeFromCart(${id})">X</button>
      `;
      cartItemsEl.appendChild(div);
    });
    document.getElementById('cart-total').innerText = `Total: R$ ${total.toFixed(2)}`;
  }

  // Inicializar a página
  renderProdutos();
  renderProdutosNatal();
  renderCart();

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const responseMessage = document.getElementById('responseMessage');

            // Validação básica
            if (!name || !email || !message) {
                responseMessage.className = 'message error';
                responseMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                responseMessage.style.display = 'block';
                return;
            }

            // Validação de email simples
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                responseMessage.className = 'message error';
                responseMessage.textContent = 'Por favor, insira um email válido.';
                responseMessage.style.display = 'block';
                return;
            }

            // Simulação de envio (substitua por código real de backend)
            responseMessage.className = 'message success';
            responseMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            responseMessage.style.display = 'block';

            // Limpa o formulário
            document.getElementById('contactForm').reset();

            // Oculta a mensagem após 5 segundos
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 5000);
        });
    