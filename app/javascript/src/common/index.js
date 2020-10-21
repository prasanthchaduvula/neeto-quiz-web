import { Toastr as ToastrComponent } from "nitroui";
// import { toast, Slide } from "react-toastify";

// const showToastr = message => {
//   toast.success(<ToastrComponent type="success" message={message} />, {
//     position: toast.POSITION.BOTTOM_CENTER,
//     transition: Slide,
//   });
// };

// const isError = e => e && e.stack && e.message;

// export const showErrorToastr = error => {
//   let errorMessage = error;
//   if (isError(error)) {
//     errorMessage = error.message;
//   }
//   toast.error(<ToastrComponent type="error" message={errorMessage} />, {
//     position: toast.POSITION.BOTTOM_CENTER,
//     transition: Slide,
//   });
// };

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

// export const Toastr = {
//   success: showToastr,
//   error: showErrorToastr,
// };
