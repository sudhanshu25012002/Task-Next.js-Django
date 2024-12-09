'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await fetch(`http://127.0.0.1:8000/products/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setDescription(data.description);
                    setExistingImage(data.image);
                } else {
                    alert('Failed to fetch product details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('accessToken');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/products/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Product updated successfully');
                router.push('/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Current Image
                    </label>
                    <div>
                        {existingImage && (
                            <img
                                src={`http://127.0.0.1:8000${existingImage}`}
                                alt="Current Product"
                                style={{ maxWidth: '100%', marginBottom: '10px' }}
                            />
                        )}
                    </div>
                    <input
                        type="file"
                        id="image"
                        className="form-control"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Product
                </button>
            </form>
        </div>
    );
}
