import { createAsyncThunk } from "@reduxjs/toolkit";


const URL = "https://dummyjson.com";

const userLogin = async (username, password) => {
  try {
    console.log(URL)
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
}


const getAllProducts = async (skip) => {
  try {
    const response = await fetch(
      `${URL}/products?limit=10&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

const getProductById = async (id) => {
  try {
    const response = await fetch(`${URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export { userLogin, getAllProducts, getProductById };