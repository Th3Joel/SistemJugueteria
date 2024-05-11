import Swal from "sweetalert2";
const alertBox = (tipo:any,title:string,text:string,textbtn:string,callback:any) => {
  Swal.fire({
    title,
    text,
    icon: tipo,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: textbtn,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};

export default alertBox;
