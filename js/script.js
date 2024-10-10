// import { produtos } from "./database.js";
import formatCoffeePrice from "../utils/formatPrice.js";
import { getProducts } from "./axios.js";

const divAllCoffeeContainer = document.querySelectorAll(".products__list");
const divClassicos = divAllCoffeeContainer[0];
const divGelados = divAllCoffeeContainer[1];

async function loadProducts() {
  const response = await getProducts();
  console.log(response);

  for (let i = 0; i < response.length; i++) {
    const product = response[i];
    const produto = generateCoffeeCards(product);

    if (product.categoria === "classicos") {
      divClassicos.appendChild(produto);
    }

    if (product.categoria === "gelados") {
      divGelados.appendChild(produto);
    }
  }
}
loadProducts();

function generateCoffeeCards(product) {
  const linkCoffeeCard = document.createElement("a");
  linkCoffeeCard.href = `./product.html?p=${product.id}`;
  linkCoffeeCard.classList.add("products__list--item");

  const imgCoffeeCard = document.createElement("img");
  imgCoffeeCard.src = product.imagem;

  const h3CoffeeCard = document.createElement("h3");
  h3CoffeeCard.classList.add("products__list--price");
  h3CoffeeCard.textContent = formatCoffeePrice(product.preco.por);

  const h3SpanCoffeeCard = document.createElement("span");

  if (product.preco.de) {
    h3SpanCoffeeCard.textContent = formatCoffeePrice(product.preco.de);
  }

  const h4CoffeCard = document.createElement("h4");
  h4CoffeCard.classList.add("products__list--name");
  h4CoffeCard.textContent = product.nome;

  const divCoffeeCard = document.createElement("div");
  divCoffeeCard.classList.add("product__tag");

  if (product.vegano) {
    divCoffeeCard.innerHTML = `<img src="./image/Plant.png" alt="planta"> <span>Vegano</span>`;
  } else {
    divCoffeeCard.innerHTML = `<img src="./image/Cow.png" alt="Lactose"> <span>Contém lactose</span>`;
  }

  linkCoffeeCard.appendChild(imgCoffeeCard);
  h3CoffeeCard.appendChild(h3SpanCoffeeCard);
  linkCoffeeCard.appendChild(h3CoffeeCard);
  linkCoffeeCard.appendChild(h4CoffeCard);
  linkCoffeeCard.appendChild(divCoffeeCard);

  return linkCoffeeCard;
}
