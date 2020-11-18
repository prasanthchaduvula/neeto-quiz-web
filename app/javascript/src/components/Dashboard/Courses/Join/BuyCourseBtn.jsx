import React, { Fragment, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button } from "nitroui";

import { createOrder } from "apis/orders";
import { showToastr, loadRazorpayCheckoutScript } from "common";

const BuyCourseBtn = ({ course }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const createCheckoutPayload = (key, order) => {
    return {
      key: key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.razorpay_order_id,
      name: order.merchant_name,
      handler: () => {
        showToastr("success", "Order placed successfully! 🎉");
        history.push("/profile?orders");
      },
    };
  };

  const handleOnClick = async () => {
    setLoading(true);
    setDisabled(true);

    const res = await loadRazorpayCheckoutScript();

    if (!res) {
      showToastr("error", "Request failed. Are you online?");
      return;
    }

    const response = await createOrder({ course_id: course.id });

    if (!response) {
      showToastr("error", "Request failed. Please retry.");
      return;
    }

    const { key, order } = response.data;

    const options = createCheckoutPayload(key, order);
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <Fragment>
      <Button
        label={`Buy this course for ₹ ${Math.round(course.price)}`}
        size="large"
        fullWidth
        className="ml-2 text-center text-base font-bold"
        onClick={handleOnClick}
        loading={loading}
        disabled={disabled}
      />
    </Fragment>
  );
};

export default withRouter(BuyCourseBtn);
