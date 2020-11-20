import React, { Fragment, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button, Toastr } from "nitroui";

import { createOrder } from "apis/orders";
import { loadRazorpayCheckoutScript } from "common";

const BuyCourseBtn = ({ course }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const disableButtonAndStartLoader = bool => {
    setLoading(bool);
    setDisabled(bool);
  };

  const createCheckoutPayload = (key, order) => {
    return {
      key: key,
      amount: order.amount,
      currency: order.currency,
      order_id: order.razorpay_order_id,
      name: order.business_name,
      handler: () => {
        Toastr.success("Order placed successfully! 🎉");
        history.push("/profile?orders");
      },
    };
  };

  const handleOnClick = async () => {
    disableButtonAndStartLoader(true);

    try {
      await loadRazorpayCheckoutScript();
    } catch {
      Toastr.error("Request failed. Are you online?");
      disableButtonAndStartLoader(false);
      return;
    }

    try {
      const response = await createOrder({ course_id: course.id });
      const { key, order } = response.data;

      const options = createCheckoutPayload(key, order);
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (err) {
      Toastr.error(err);
    } finally {
      disableButtonAndStartLoader(false);
    }
  };

  return (
    <Fragment>
      <Button
        label={`Buy this course for ₹ ${course.price}`}
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
