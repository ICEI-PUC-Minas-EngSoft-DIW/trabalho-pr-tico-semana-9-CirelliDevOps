const data = {
    produtos: [
        {
            id: 1,
            nome: "iPhone 13",
            preco: 4499.99,
            categoria: "Celulares",
            imagem: "img/iPhone13.png",
            descricao: "iPhone 13 com 128GB.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Galaxy S23",
            preco: 3899.99,
            categoria: "Celulares",
            imagem: "img/Samsung23.png",
            descricao: "Samsung Galaxy S23.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Notebook Dell",
            preco: 5999.99,
            categoria: "Notebooks",
            imagem: "img/notebook.png",
            descricao: "Notebook Dell i7 16GB RAM.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "Mouse Gamer",
            preco: 99.99,
            categoria: "Acessórios",
            imagem: "img/mouse.png",
            descricao: "Mouse RGB Gamer.",
            emEstoque: true
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2)}`;
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <img src="${produto.imagem}" width="200">
        <p>${produto.descricao}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p>
            <strong>Status:</strong> 
            ${produto.emEstoque ? "Em estoque" : "Fora de estoque"}
        </p>
    `;
}

function createProductCard(produto) {

    const card = document.createElement("div");

    card.classList.add("card");

    card.setAttribute("data-id", produto.id);

    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "10px";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.width = "220px";
    card.style.display = "inline-block";
    card.style.backgroundColor = "#f8fafc";

    const title = document.createElement("h3");
    title.textContent = produto.nome;

    const image = document.createElement("img");
    image.setAttribute("src", produto.imagem);
    image.style.width = "100%";
    image.style.borderRadius = "8px";

    const price = document.createElement("p");
    price.textContent = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.textContent = produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.textContent = "Ver detalhes";

    btnDetails.style.marginRight = "5px";

    btnDetails.addEventListener("click", function () {
        showProductDetails(produto);
    });

    const btnHighlight = document.createElement("button");
    btnHighlight.textContent = "Destacar";

    btnHighlight.addEventListener("click", function () {

        if (card.style.backgroundColor === "lightblue") {
            card.style.backgroundColor = "#f8fafc";
        } else {
            card.style.backgroundColor = "lightblue";
        }

    });

    card.appendChild(title);
    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

function renderProducts(produtos) {

    productList.innerHTML = "";

    produtos.forEach(produto => {

        const card = createProductCard(produto);

        productList.appendChild(card);

    });

}

btnRender.addEventListener("click", function () {

    const searchValue = searchInput.value.toLowerCase();

    const categoryValue = categorySelect.value;

    const filteredProducts = data.produtos.filter(produto => {

        const matchesSearch =
            produto.nome.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "Todos" ||
            produto.categoria === categoryValue;

        return matchesSearch && matchesCategory;

    });

    renderProducts(filteredProducts);

});

renderProducts(data.produtos);