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
    <div id="orders">
      <label>
        Hide confirmed:
        <input
          type="checkbox"
          checked={hideConfirmed}
          onChange={handleHideConfirmedCheckbox}
        />
      </label>
      {orders
        .filter((order) => (hideConfirmed ? !order.confirmed : true))
        .map((order) => (
          <div
            className={"order" + (order.confirmed ? "-confirmed" : "")}
            key={order._id}
          >
            <div className="order-wrap">
              {order.confirmed ? "CONFIRMED" : ""}
              <button
                className="deleteBtn"
                onClick={() => deleteOrder(order._id)}
              >
                ❌
              </button>
              <h5 style={{ textAlign: "center" }}>Order ID: {order._id}</h5>
              <h4>Email: {order.email}</h4>
              <h4>Adress: {order.adress}</h4>
              <ol>
                {order.cartItems.map((item, index) => (
                  <li key={index}>
                    {item.name}, {item.selectedPizzaSize}, X {item.quantity}
                  </li>
                ))}
              </ol>
              <button onClick={() => confirmOrder(order._id)}>
                Confirm order
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrdersPage;
