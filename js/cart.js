import formatCoffeePrice from "../utils/formatPrice.js";
import { deleteCartItemById, getCart, putCart } from "./axios.js";
const totalItemsCart = document.querySelector(".badge__quantity");
const divProductListCart = document.querySelector(".productListCart");
const quantityCartSpan = document.querySelector(".quantityCartSpan");
const deleteCartItems = document.querySelector(".deleteCartItems");
const minicartFooterItemPriceSubtotal = document.querySelector(
  ".minicart-footer-item-price-subtotal"
);
const minicartFooterItemPriceEntrega = document.querySelector(
  ".minicart-footer-item-price-entrega"
);
const minicartFooterItemPriceTotal = document.querySelector(
  ".minicart-footer-item-price-total"
);

deleteCartItems.addEventListener("click", async () => {
  const response = await getCart();

  for (const item of response) {
    await deleteProductFromCart(item.id);
  }

  loadDataCart();
});

export async function loadDataCart() {
  const response = await getCart();
  console.log(response);
  totalItemsCart.textContent = `${response.length}`;
  quantityCartSpan.textContent = `${response.length} Items`;
  let subtotal = 0;
  let entrega = 0;

  divProductListCart.innerHTML = "";
  for (const item of response) {
    subtotal += item.quantidade * item.preco;
    const divElementProduct = document.createElement("div");
    divElementProduct.classList.add("div-product-cart");
    const imgElementProduct = document.createElement("img");
    imgElementProduct.src = item.imagem;
    imgElementProduct.classList.add("card-product-img-cart");

    const productTrashImg = document.createElement("button");
    productTrashImg.innerHTML = '<img src="./image/Trash.svg" alt="trash">';
    productTrashImg.classList.add("trash");
    productTrashImg.addEventListener("click", () => {
      deleteProductFromCart(item.id);
    });

    const titleElementProduct = document.createElement("h3");
    titleElementProduct.classList.add("titleElementProduct");
    titleElementProduct.textContent = item.nome;

    const categoryProduct = document.createElement("div");
    if (item.vegano) {
      categoryProduct.innerHTML = `<img src="./image/Plant.svg" alt="planta"> `;
    } else {
      categoryProduct.innerHTML = `<img src="./image/Cow.svg" alt="Lactose"> `;
    }

    const priceElementProduct = document.createElement("h1");
    priceElementProduct.classList.add("priceElementProduct");
    priceElementProduct.textContent = formatCoffeePrice(item.preco);

    const quantityMinusElementProduct = document.createElement("button");
    quantityMinusElementProduct.classList.add("quantityBtnElementProduct");
    quantityMinusElementProduct.innerHTML =
      '<img src="./image/Minus.svg" alt="minus">';
    quantityMinusElementProduct.addEventListener("click", () => {
      if (item.quantidade > 1) {
        updateQuantityItemCart(item, -1);
      }
    });
    const quantityPlusElementProduct = document.createElement("button");
    quantityPlusElementProduct.classList.add("quantityBtnElementProduct");

    quantityPlusElementProduct.innerHTML =
      '<img src="./image/Plus.svg" alt="plus">';
    quantityPlusElementProduct.addEventListener("click", () => {
      updateQuantityItemCart(item, 1);
    });

    const inputProductElement = document.createElement("input");
    inputProductElement.classList.add("inputQuantity");
    inputProductElement.value = item.quantidade;

    const divElementContent = document.createElement("div");
    divElementContent.classList.add("divElementContent");

    const divElementContentPrice = document.createElement("div");
    divElementContentPrice.classList.add("divElementContentPrice");

    const divElementContentQuantity = document.createElement("div");
    divElementContentQuantity.classList.add("divElementContentQuantity");

    divElementProduct.appendChild(imgElementProduct);
    divElementContent.appendChild(titleElementProduct);
    divElementContent.appendChild(categoryProduct);
    divElementContent.appendChild(productTrashImg);

    divElementContentPrice.appendChild(priceElementProduct);

    divElementContentQuantity.appendChild(quantityMinusElementProduct);
    divElementContentQuantity.appendChild(inputProductElement);
    divElementContentQuantity.appendChild(quantityPlusElementProduct);

    divElementContentPrice.appendChild(divElementContentQuantity);
    divElementContent.appendChild(divElementContentPrice);
    divElementProduct.appendChild(divElementContent);
    divProductListCart.appendChild(divElementProduct);
  }
  minicartFooterItemPriceSubtotal.textContent = formatCoffeePrice(subtotal);
  minicartFooterItemPriceTotal.textContent = formatCoffeePrice(
    subtotal + entrega
  );
}

async function deleteProductFromCart(id) {
  const findIndexProduct = await deleteCartItemById(id);
  console.log(findIndexProduct);

  loadDataCart();
}

loadDataCart();

async function updateQuantityItemCart(product, value) {
  product.quantidade = Number(product.quantidade) + value;
  const findProduct = await putCart(product.id, product);

  loadDataCart();
}
