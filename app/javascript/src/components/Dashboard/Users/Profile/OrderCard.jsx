import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { ORDER_STATUS_COLOR_MAPPING, ORDER_STATUS_STEP_MAPPING } from "common";

const OrderCard = ({ order }) => {
  const {
    razorpay_order_id,
    amount,
    status,
    created_at,
    course_name,
    course_id,
    business_name,
  } = order;

  const statusColor = ORDER_STATUS_COLOR_MAPPING[status];
  const orderStep = ORDER_STATUS_STEP_MAPPING[status] || 100;

  return (
    <Fragment>
      <li className="border-t border-gray-200">
        <div className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
          <div className="px-4 py-4 sm:px-6">
            <div className="my-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <div className="mr-6 flex items-center text-xs leading-5 text-gray-500">
                  <time>
                    {moment(created_at).format("D MMMM YYYY, hh:mm A")}
                  </time>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link
                className="text-lg leading-5 font-medium text-indigo-600 truncate"
                to={`/courses/${course_id}`}
              >
                {course_name}
              </Link>
              <div className="ml-2 flex-shrink-0 flex">
                <span className="px-2 inline-flex text-lgleading-5 font-semibold rounded-full bg-blue-500 bg-opacity-20 text-black-800">
                  ₹ {amount}
                </span>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <div className="text-xs font-light text-gray-500">
                  {business_name}
                </div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="text-sm leading-5 text-gray-500 sm:mt-0">
                  <span>{razorpay_order_id.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${statusColor}-600 bg-${statusColor}-200`}
                  >
                    {status
                      .split("_")
                      .join(" ")
                      .toUpperCase()}
                  </span>
                </div>
              </div>
              <div
                className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${statusColor}-200`}
              >
                <div
                  style={{ width: `${orderStep}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${statusColor}-500`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default OrderCard;
