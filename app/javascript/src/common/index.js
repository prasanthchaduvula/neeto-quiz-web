const RAZORPAY_CHECKOUT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export const loadRazorpayCheckoutScript = () => {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_URL;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export const ORDER_STATUS_COLOR_MAPPING = {
  order_created: "yellow",
  payment_initiated: "yellow",
  payment_failed: "red",
  payment_captured: "green",
  transfer_initiated: "green",
  transfer_settled: "green",
  transfer_processed: "green",
};

export const ORDER_STATUS_STEP_MAPPING = {
  order_created: 15,
  payment_initiated: 30,
  payment_captured: 45,
  transfer_initiated: 60,
  transfer_processed: 75,
  transfer_settled: 100,
};
