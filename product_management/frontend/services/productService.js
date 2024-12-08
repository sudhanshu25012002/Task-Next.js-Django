// services/productService.js

export async function getProducts() {
  const res = await fetch("http://localhost:8000/api/products/");
  const data = await res.json();
  return data;
}

export async function addProduct(productData) {
  const res = await fetch("http://localhost:8000/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  return data;
}

export async function editProduct(id, productData) {
  const res = await fetch(`http://localhost:8000/api/products/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  return data;
}

export async function deleteProduct(id) {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: 'DELETE',
    });
    return res.status === 204; // return if deleted 
}