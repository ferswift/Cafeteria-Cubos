import { produtos, carrinho } from "./database.js";
import formatCoffeePrice from "../utils/formatPrice.js";
import { getCartById, getProductById, postCart, putCart } from "./axios.js";
import { loadDataCart } from "./cart.js";

const params = new URLSearchParams(window.location.search);
const idProduto = params.get("p");
let product = {};
// const product = produtos.find((produto) => produto.id === idProduto);

async function loadProductById() {
  const response = await getProductById(idProduto);
  console.log(response);

  if (!response) {
    return;
  }
  product = response;

  imgProduct.src = product.imagem;
  titleProduct.textContent = product.nome;
  valueProduct.textContent = formatCoffeePrice(product.preco.por);
  descriptionProduct.textContent = product.descricao;

  if (product.vegano) {
    categoryProduct.innerHTML = `<img src="./image/Plant.png" alt="planta"> <span>Vegano</span>`;
  } else {
    categoryProduct.innerHTML = `<img src="./image/Cow.png" alt="Lactose"> <span>Contém lactose</span>`;
  }
}
loadProductById();

const imgProduct = document.querySelector(".product__image");
const titleProduct = document.querySelector(".product__title");
const valueProduct = document.querySelector(".product__price");
const categoryProduct = document.querySelector(".product__tag");
const descriptionProduct = document.querySelector(".product__description");

const btnBuy = document.querySelector(".product__button");
const inputQuantity = document.querySelector(".product__quantity--input");
const inputObservation = document.querySelector("#observation");
const btnQuantityMinus = document.querySelector(".product__quantity--minus");
const btnQuantityPlus = document.querySelector(".product__quantity--plus");

btnBuy.addEventListener("click", async () => {
  const productCart = await getCartById(idProduto);
  console.log(productCart);

  if (productCart) {
    productCart.quantidade += parseInt(inputQuantity.value);
    await putCart(productCart.id, productCart);
  } else {
    const newProduct = {
      id: idProduto,
      idProduto,
      nome: product.nome,
      imagem: product.imagem,
      preco: product.preco.por,
      vegano: product.vegano,
      quantidade: parseInt(inputQuantity.value),
      observacao: inputObservation.value,
    };
    const response = await postCart(newProduct);
    console.log(response);
  }
  loadDataCart();
});

function updateQuantity(value) {
  const currentValue = parseInt(inputQuantity.value);
  inputQuantity.value = currentValue + value;
}

btnQuantityPlus.addEventListener("click", () => {
  updateQuantity(+1);
});

btnQuantityMinus.addEventListener("click", () => {
  if (parseInt(inputQuantity.value) === 1) {
    btnQuantityMinus.style.cursor = "not-allowed";
    return;
  } else {
    btnQuantityMinus.style.cursor = "pointer";
  }
  updateQuantity(-1);
});

const minicart = document.querySelector(".minicart-main");
const deleteBtn = document.querySelector(".delete-button");
const carrinhoImg = document.querySelector(".carrinho-img");

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  minicart.classList.add("hidden");
});

carrinhoImg.addEventListener("click", (e) => {
  e.preventDefault();

  minicart.classList.remove("hidden");
});
