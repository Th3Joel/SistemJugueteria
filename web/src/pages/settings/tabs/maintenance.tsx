import dbImage from "@/assets/db.png";
import {Button} from "@mui/material";
export const Maintenance = () =>{
    return(
        <div className="flex justify-center m-3">
            <div className="w-[350px] flex flex-col gap-3 p-2 items-center shadow-md rounded-lg  animate__fadeIn">
                <img src={dbImage} alt="db" width={150}/>
                <Button variant="contained" color="primary">Crear copia de base de datos</Button>
                <Button variant="contained" color="primary">Restaurar base de datos</Button>
            </div>
        </div>
    );
}