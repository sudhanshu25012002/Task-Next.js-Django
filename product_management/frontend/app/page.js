"use client";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProducts, deleteProduct } from "../services/productService";

export default function Home() {
  const [prodcuts, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const success = await deleteProduct(id);
    if (success) {
      setProducts(prodcuts.filter((prodcut) => prodcut.id !== id));
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Product Management</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prodcuts.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>
                  <img src={`http://localhost:8000${prodcut.image}`} alt={prodcut.name} style={{width: '100px', height: 'auto' }} /> 
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}