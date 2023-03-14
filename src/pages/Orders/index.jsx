import React, { useEffect, useState } from "react";
import Api from "../../Api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [hideConfirmed, setHideConfirmed] = useState(true);
  useEffect(() => {
    Api()
      .get("/orders")
      .then((response) => setOrders(response.data))
      .catch(console.error);
  }, []);
  const deleteOrder = (orderId) => {
    //eslint-disable-next-line no-restricted-globals
    const confirmationAnswer = confirm(
      "Are you sure you want to delete oreder? " + orderId
    );
    if (!confirmationAnswer) return;
    Api()
      .delete(`/orders/${orderId}`)
      .then((response) => {
        //console.log("response", response);
        const { data } = response;
        if (data.deletedCount === 1) {
          const newOrders = orders.filter((order) => order._id !== orderId);
          setOrders(newOrders);
        } else {
          alert("Something went wrong");
        }
      })
      .catch(console.error);
  };
  const confirmOrder = (orderId) => {
    Api()
      .put(`/orders/${orderId}`, {
        confirmed: true,
      })
      .then((response) => {
        //console.log("response", response);
        const { data } = response;
        if (data && data.ok === 1) {
          const newOrders = orders.map((order) => {
            if (order._id === orderId) {
              return { ...order, confirmed: true };
            }
            return order;
          });
          setOrders(newOrders);
        }
      })
      .catch(console.error);
  };
  const handleHideConfirmedCheckbox = (e) => setHideConfirmed(e.target.checked);

  return (
    <div id="orders" className="bg-gray-200 p-4">
      <div className="flex flex-col items-center mx-auto justify-center py-4 border border-gray-400 w-[65%] rounded-md p-2 relative">
        <h3 className="text-lg font-bold text-white text-center bg-gray-600 rounded-md px-8 py-2 mb-6 w-full">
          Orders
        </h3>
        <div className="flex items-center absolute justify-center py-2 md:top-20 right-5 top-14">
          <label
            htmlFor="toggleConfirmed"
            className="flex items-center cursor-pointer"
          >
            <div className="text-gray-700 font-medium mx-4">Hide Confirmed</div>
            <div className="relative">
              <input
                type="checkbox"
                id="toggleConfirmed"
                className="sr-only"
                checked={hideConfirmed}
                onChange={handleHideConfirmedCheckbox}
              />
              <div
                className={`w-12 h-6 ${
                  hideConfirmed ? "bg-teal-500" : "bg-gray-400"
                } rounded-full shadow-inner`}
              ></div>
              <div
                className={`toggle__dot absolute top-0 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  hideConfirmed ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        {orders
          .filter((order) => (hideConfirmed ? !order.confirmed : true))
          .map((order) => (
            <div
              key={order._id}
              className="w-full max-w-lg mx-auto mt-4 rounded-md shadow-md overflow-hidden"
            >
              <div
                className={`px-4 py-3 flex items-center mt-4 justify-between bg-gray-100 ${
                  order.confirmed
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <span className="text-sm font-medium">
                  {order.confirmed ? "CONFIRMED" : "UNCONFIRMED"}
                </span>
                <button
                  className="deleteBtn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                  onClick={() => deleteOrder(order._id)}
                >
                  Delete
                </button>
              </div>
              <div className="px-4 py-3">
                <h5 className="text-lg font-bold text-center mb-4">
                  Order ID: {order._id}
                </h5>
                <div className="mb-4">
                  <h4 className="font-medium">Email:</h4>
                  <p>{order.email}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium">Address:</h4>
                  <p>{order.adress}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-medium">Items:</h4>
                  <ol className="list-decimal pl-4">
                    {order.cartItems.map((item, index) => (
                      <li key={index} className="ml-2">
                        {item.name} ({item.selectedPizzaSize}), X{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ol>
                </div>
                <button
                  className={`w-full text-white rounded-lg py-3 font-medium transition-colors duration-300 ${
                    order.confirmed
                      ? "bg-green-500 cursor-default"
                      : "bg-teal-500 hover:bg-teal-600"
                  }`}
                  onClick={() => confirmOrder(order._id)}
                >
                  {order.confirmed ? "Confirmed" : "Confirm Order"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersPage;
