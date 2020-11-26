import React, { useState, useEffect, Fragment } from "react";
import { PageLoader, Toastr } from "neetoui";

import { fetchAllOrders } from "apis/orders";
import OrderCard from "./OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      let response = await fetchAllOrders();
      let { orders } = response.data;
      setOrders(orders);
    } catch {
      Toastr.error("Request failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const renderLoader = () => <PageLoader />;

  const renderNoData = () => {
    return (
      <Fragment>
        <div className="flex items-center justify-center min-h-screen">
          <h4 className="text-xl">Nothing to show here, yet!</h4>
        </div>
      </Fragment>
    );
  };

  const renderOrdersList = () => {
    return (
      <Fragment>
        <div className="w-full bg-white shadow overflow-hidden sm:rounded-md">
          <ul>
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </ul>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      {loading
        ? renderLoader()
        : orders.length
        ? renderOrdersList()
        : renderNoData()}
    </Fragment>
  );
};

export default Orders;
