import React, { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // Add product with specific size to cart (or increase quantity)
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

    // Remove a product/size combo from cart
    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            delete cartData[itemId][size];
            // If all sizes for this product are removed, remove the productId key too
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
    };

    // Update quantity for a given product/size (set to newQuantity, or remove if <= 0)
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
