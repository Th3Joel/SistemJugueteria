import dbImage from "@/assets/db.png";
import { TitleState } from "@/modules/core/states/title-state";
import {Button} from "@mui/material";
import { useEffect } from "react";
const Maintenance = () =>{
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Mantenimiento");
    }, [])
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
export default Maintenance;