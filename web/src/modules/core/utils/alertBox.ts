import Swal, { SweetAlertIcon } from "sweetalert2";
const alertBox = (tipo:SweetAlertIcon,title:string,text:string,textbtn:string,callback:()=>void) => {
  Swal.fire({
    title,
    text,
    icon: tipo,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: textbtn,
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export default alertBox;
