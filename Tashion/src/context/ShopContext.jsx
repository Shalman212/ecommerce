import React, { createContext, useState, useEffect } from "react";
import { products as localProducts } from "../assets/assets"; // your static/demo products

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState(localProducts);

    useEffect(() => {
        // Fetch backend products and combine with local ones
        fetch("http://localhost:5000/api/products")
            .then(res => res.json())
            .then(data => {
                // Merge local and backend products (no duplicates by _id)
                const merged = [...localProducts];
                data.forEach(apiProduct => {
                    if (!merged.some(lp => lp._id === apiProduct._id)) {
                        merged.push(apiProduct);
                    }
                });
                setProducts(merged);
            })
            .catch(() => setProducts(localProducts)); // fallback if backend fails
    }, []);

    // ---- Cart logic remains the same ----
    const addToCart = (itemId, size) => {
        if (!size) return;
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
    };

    const updateCartQuantity = (itemId, size, newQuantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            if (newQuantity <= 0) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            } else {
                cartData[itemId][size] = newQuantity;
            }
            setCartItems(cartData);
        }
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
