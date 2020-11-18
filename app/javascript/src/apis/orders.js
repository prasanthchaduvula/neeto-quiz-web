import axios from "axios";

export const fetchAllOrders = () => axios.get("/api/v1/orders");

export const createOrder = payload => axios.post("/api/v1/orders", payload);
