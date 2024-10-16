import Swal, { SweetAlertIcon } from "sweetalert2";
const alertBox = (tipo: SweetAlertIcon, title: string, text: string, textbtn: string, callback: () => void, cancelHandler?: () => void) => {
  Swal.fire({
    title,
    text,
    icon: tipo,
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: textbtn,
    cancelButtonText: cancelHandler ? "No, cerrar sesión" : "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
    if (result.dismiss == Swal.DismissReason.cancel) {
      if (cancelHandler) {
        cancelHandler()
      }
    }
  });
};

export default alertBox;
