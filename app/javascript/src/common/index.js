import { Toastr as ToastrComponent } from "nitroui";

const RAZORPAY_CHECKOUT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export const showToastr = (type, ...rest) => {
  if (type === "error") {
    ToastrComponent[type](...rest);
  } else {
    ToastrComponent[type](
      ...rest,
      {},
      { positionClass: "toast-bottom-center", progressBar: true, timeOut: 2500 }
    );
  }
};

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
  transfer_settled: "green",
  transfer_processed: "green",
  order_created: "yellow",
  payment_initiated: "yellow",
  payment_captured: "yellow",
  payment_failed: "red",
};

export const ORDER_STATUS_STEP_MAPPING = {
  order_created: 20,
  payment_initiated: 40,
  payment_captured: 60,
  transfer_settled: 80,
  transfer_processed: 100,
};
