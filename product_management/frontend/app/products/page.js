"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const fetchProducts = async () => {
        const token = localStorage.getItem("accessToken");
  
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/products/?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setProducts(data.results);
            setHasNextPage(data.next !== null);
          } else {
            alert("Failed to fetch products");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchProducts();
    }, [page]);
  
    const handleNextPage = () => setPage(page + 1);
    const handlePreviousPage = () => setPage(page - 1);
  
    const handleDelete = async (productId) => {
      const token = localStorage.getItem("accessToken");
  
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;
  
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/products/${productId}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          alert("Product deleted successfully");
          // Remove the deleted product from the state
          setProducts(products.filter((product) => product.id !== productId));
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <div className="container">
        <h1 className="my-4">Product List</h1>
        <button
          className="btn btn-success mb-4"
          onClick={() => router.push("/add-product")}
        >
          Add New Product
        </button>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card">
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => router.push(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleNextPage}
            disabled={!hasNextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }