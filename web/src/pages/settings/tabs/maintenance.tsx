import dbImage from "@/assets/db.png";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import { TitleState } from "@/modules/core/states/title-state";
import alertBox from "@/modules/core/utils/alertBox";
import { StateDriver, stepsMaintenance } from "@/modules/core/utils/driver";
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";

type TFiles = string[];
const Maintenance = () => {
    const { setTitle } = TitleState();
    const { get, data } = useForm<TFiles>([]);
    const { get: genBackup, loading: genLoading } = useForm<unknown>({});
    const { setSteps } = StateDriver();
    const getFiles = () => {
        get("/backup/files");
    };

    const handleBakup = () => {
        genBackup("/backup/gen", true).then(() => {
            getFiles();
        });

    };

    const handleRestore = (file: string,name:string) => {
        alertBox("warning", "Está seguro?", "Restaurar base de datos con la copia de seguridad generada: " + name, "Restaurar", async () => {
            genBackup("/backup/restore/" + file, true);
        })
    }

    useEffect(() => {
        setTitle("Configuración | Mantenimiento");
        getFiles();
        setSteps(stepsMaintenance)
    }, [])
    return (
        <div className="flex justify-center m-3">
            <div className="w-[490px] flex flex-col gap-3 p-2 items-center shadow-md rounded-lg  animate__fadeIn backupStep">
                <img src={dbImage} alt="db" width={100} />
                <h1 className="-mt-3">Copia de seguridad de la base de datos</h1>
                <div className="border w-full rounded-lg py-1 px-2 overflow-y-auto max-h-[330px]">
                    {
                        data.length === 0 ?
                            <h3 className="text-gray-600 text-center mt-1 text-xl">No hay elementos</h3>
                            :
                            data.map((d, i) => (
                                <div key={i} className="flex justify-between items-center cursor-pointer">
                                    <p className="text-gray-700 text-lg">{d}</p>
                                    <span className="flex items-center">
                                        {
                                            genLoading ?
                                                <CircularProgress size={25} color="success" />
                                                :
                                                <Tooltip title="Restaurar">
                                                    <IconButton color="success"
                                                        onClick={() => handleRestore(d.split(".")[0],d)}>
                                                        <FaClockRotateLeft />
                                                    </IconButton>
                                                </Tooltip>
                                        }
                                        {/* <Tooltip title="Descargar">
                                            <a href={"/api/backup/download/" + d.split(".")[0]} download>
                                                <IconButton color="primary">
                                                    <FaDownload />
                                                </IconButton>
                                            </a>
                                        </Tooltip> */}


                                    </span>
                                </div>
                            )).reverse()
                    }
                </div>

                <Button variant="contained" color="primary" disabled={genLoading} onClick={handleBakup}>
                    {genLoading ? <LoaderBtn /> : "Crear una copia ahora"}
                </Button>
            </div>
        </div>
    );
}
export default Maintenance;