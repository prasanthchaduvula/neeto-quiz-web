import { Toastr as ToastrComponent } from "nitroui";
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
