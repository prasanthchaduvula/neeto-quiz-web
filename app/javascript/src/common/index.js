import { Toastr as ToastrComponent } from "nitroui";
import Swal from "sweetalert2";

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

export const showSweetAlert = (resourceName, resourceType) => {
  return Swal.fire({
    title: `Delete ${resourceName} ${resourceType}.`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });
};
