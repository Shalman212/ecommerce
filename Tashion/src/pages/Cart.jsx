import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    products,
    currency,
    delivery_fee,
    removeFromCart,
    updateCartQuantity,
  } = useContext(ShopContext);

  // Calculate subtotal
  let subtotal = 0;
  Object.entries(cartItems).forEach(([productId, sizes]) => {
    const product = products.find((p) => String(p._id) === String(productId));
    if (!product) return;
    Object.entries(sizes).forEach(([size, quantity]) => {
      subtotal += product.price * quantity;
    });
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">YOUR <span className="text-gray-700">CART</span></h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Cart Items */}
        <div className="flex-1">
          {Object.entries(cartItems).length === 0 && (
            <p>Your cart is empty.</p>
          )}
          {Object.entries(cartItems).map(([productId, sizes]) => {
            const product = products.find((p) => String(p._id) === String(productId));
            if (!product) return null;
            return Object.entries(sizes).map(([size, quantity]) => (
              <div key={productId + size} className="flex items-center border-b py-6 justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <img src={product.image[0]} alt={product.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-lg">{product.name}</div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-base">{currency}{product.price}</span>
                      <span className="border px-3 py-1 text-sm bg-gray-100">{size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Decrease button */}
                  <button
                    onClick={() =>
                      updateCartQuantity(product._id, size, quantity - 1)
                    }
                    className="border px-2 py-1 rounded text-lg"
                  >
                    -
                  </button>
                  {/* Quantity display */}
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    readOnly
                    className="border w-12 px-2 py-1 text-center rounded"
                  />
                  {/* Increase button */}
                  <button
                    onClick={() =>
                      updateCartQuantity(product._id, size, quantity + 1)
                    }
                    className="border px-2 py-1 rounded text-lg"
                  >
                    +
                  </button>
                  {/* Trash/Delete icon */}
                  <button
                    className="text-gray-500 hover:text-red-500 text-xl"
                    onClick={() =>
                      removeFromCart(product._id, size)
                    }
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ));
          })}
        </div>
        {/* Right: Cart Totals */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 rounded shadow-lg h-fit">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">CART <span className="text-gray-700">TOTALS</span></h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Fee</span>
              <span>{currency} {delivery_fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>{currency} {(subtotal + delivery_fee).toFixed(2)}</span>
            </div>
          </div>
          <button className="bg-black text-white w-full py-3 rounded hover:bg-gray-900 transition">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
