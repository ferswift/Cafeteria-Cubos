// import axios from "axios";

const url = "http://localhost:3000/";

const api = axios.create({
  baseURL: url,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getProducts() {
  try {
    const response = await api.get(`${url}produtos`);

    return response.data;
  } catch (error) {
    alert(error.message || "Algo inesperado aconteceu.");
    console.log("Fechting Error", error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const response = await api.get(`${url}produtos/${id}`);

    const data = await response.data;
    return data;
  } catch (error) {
    console.log("Fetching Error", error);
  }
}

export async function getCart() {
  try {
    const response = await api.get(`${url}carrinho`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log("Fechting Error", error);
  }
}

export async function getCartById(id) {
  try {
    const response = await api.get(`${url}carrinho?idProduto=${id}`);

    return response.data[0];
  } catch (error) {
    console.log("Fechting Error", error);
  }
}

export async function postCart(obj) {
  try {
    const response = await api.post(`${url}carrinho`, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function putCart(id, obj) {
  try {
    const response = await api.put(`${url}carrinho/${id}`, obj);

    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function deleteCartItemById(id) {
  try {
    const response = await api.delete(`${url}carrinho/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

