import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = ["Women", "Men", "Kids"];
const subCategories = {
    Women: ["Topwear", "Bottomwear", "Dresses"],
    Men: ["Shirts", "T-Shirts", "Pants"],
    Kids: ["Tops", "Shorts", "Sets"]
};
const sizes = ["S", "M", "L"];

const AddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        subCategory: "",
        sizes: [],
        bestseller: false,
        images: [],
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox" && name === "bestseller") {
            setForm({ ...form, bestseller: checked });
        } else if (type === "checkbox" && name === "sizes") {
            setForm({
                ...form,
                sizes: checked
                    ? [...form.sizes, value]
                    : form.sizes.filter((s) => s !== value),
            });
        } else if (type === "file") {
            setForm({ ...form, images: Array.from(files).map((f) => f.name) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try {
            const token = localStorage.getItem("token");
            console.log("Token in AddProduct:", token);
            if (!token) {
                setError("You must be logged in to add products.");
                return;
            }

            const dataToSend = {
                name: form.name,
                description: form.description,
                price: Number(form.price),
                category: form.category,
                subCategory: form.subCategory,
                sizes: form.sizes,
                bestseller: form.bestseller,
                image: form.images,
            };

            const res = await fetch("http://localhost:5000/api/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await res.json();

            if (res.ok) {
                setMessage("Product added successfully!");
                setForm({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    subCategory: "",
                    sizes: [],
                    bestseller: false,
                    images: [],
                });
                // navigate("/admin");
            } else {
                setError(result.msg || "Failed to add product.");
            }
        } catch (err) {
            setError("Network error, please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-5">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block font-semibold mb-1">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="input w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="input w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                {/* Price */}
                <div>
                    <label className="block font-semibold mb-1">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="input w-full border px-3 py-2 rounded"
                        min="1"
                        required
                    />
                </div>
                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="input w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Subcategory */}
                <div>
                    <label className="block font-semibold mb-1">Sub Category</label>
                    <select
                        name="subCategory"
                        value={form.subCategory}
                        onChange={handleChange}
                        className="input w-full border px-3 py-2 rounded"
                        required
                        disabled={!form.category}
                    >
                        <option value="">Select Sub Category</option>
                        {(subCategories[form.category] || []).map((sc) => (
                            <option key={sc} value={sc}>
                                {sc}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Sizes */}
                <div>
                    <label className="block font-semibold mb-1">Sizes</label>
                    <div className="flex gap-3 flex-wrap">
                        {sizes.map((s) => (
                            <label key={s} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="sizes"
                                    value={s}
                                    checked={form.sizes.includes(s)}
                                    onChange={handleChange}
                                />
                                {s}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Images */}
                <div>
                    <label className="block font-semibold mb-1">Product Images</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleChange}
                        className="input w-full"
                    />
                    {form.images.length > 0 && (
                        <div className="mt-2 text-sm text-gray-500">
                            {form.images.length} image(s) selected
                        </div>
                    )}
                </div>
                {/* Bestseller */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="bestseller"
                        checked={form.bestseller}
                        onChange={handleChange}
                    />
                    <label className="font-semibold">Add to Best Sellers</label>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-800">
                    Add Product
                </button>
                {message && <div className="text-green-600 mt-3">{message}</div>}
                {error && <div className="text-red-600 mt-3">{error}</div>}
            </form>
        </div>
    );
};

export default AddProduct;
