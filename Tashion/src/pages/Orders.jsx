import React from "react";

const dummyOrders = [
  {
    orderId: "ORD123456",
    date: "2024-07-04",
    status: "Delivered",
    total: 3240,
    items: [
      { name: "Tashion T-shirt", size: "M", qty: 2, price: 1200 },
      { name: "Denim Jeans", size: "32", qty: 1, price: 840 },
    ],
  },
  {
    orderId: "ORD654321",
    date: "2024-06-17",
    status: "Processing",
    total: 2200,
    items: [
      { name: "Linen Kurti", size: "L", qty: 1, price: 1200 },
      { name: "Chinos", size: "30", qty: 1, price: 1000 },
    ],
  },
];

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      {dummyOrders.length === 0 ? (
        <div className="text-center text-gray-500">You have no orders yet.</div>
      ) : (
        <div className="space-y-8">
          {dummyOrders.map((order) => (
            <div key={order.orderId} className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <span className="font-bold">Order ID:</span> {order.orderId}
                  <span className="ml-6 font-bold">Date:</span> {order.date}
                </div>
                <div>
                  <span
                    className={
                      "inline-block px-3 py-1 rounded text-sm font-semibold " +
                      (order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700")
                    }
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <table className="w-full text-left mb-4">
                <thead>
                  <tr className="text-gray-600 border-b">
                    <th className="py-2">Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{item.name}</td>
                      <td>{item.size}</td>
                      <td>{item.qty}</td>
                      <td>৳{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end font-bold text-lg">
                Total: <span className="ml-2 text-black">৳{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
