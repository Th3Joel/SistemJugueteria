import dbImage from "@/assets/db.png";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import { useImg } from "@/modules/core/hooks/useImg";
import { TitleState } from "@/modules/core/states/title-state";
import alertBox from "@/modules/core/utils/alertBox";
import { StateDriver, stepsMaintenance } from "@/modules/core/utils/driver";
import { Button, CircularProgress, Collapse, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCircleChevronLeft, FaClockRotateLeft, FaDownload } from "react-icons/fa6";

type TFiles = string[];
const Maintenance = () => {
    const [collapsable, setCollapsable] = useState<boolean>(false)
    const { setTitle } = TitleState();
    const { get, data } = useForm<TFiles>([]);
    const { get: genBackup, loading: genLoading, post } = useForm<unknown>({});
    const { setSteps } = StateDriver();

    const { fileName, handleInputFile, fileRef, handleFile, setFileName } = useImg();

    const getFiles = () => {
        get("/backup/files");
    };

    const handleBakup = () => {
        genBackup("/backup/gen", true).then(() => {
            getFiles();
        });

    };

    const handleRestore = (file: string, name: string) => {
        alertBox("warning", "Está seguro?", "Restaurar base de datos con la copia de seguridad generada: " + name, "Restaurar", async () => {
            genBackup("/backup/restore/" + file, true);
        })
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        alertBox("warning", "Está seguro?", 
            fileName == "" ? "--> Selecciona un archivo <--" : "Restaurar base de datos con el archivo: " + fileName, 
            "Restaurar", () => {
            post("/backup/restore", form, false).then(state => {
                if (state) {
                    if (fileRef.current) {
                        fileRef.current.value = "";
                    }
                    setFileName("Seleccionar archivo");
                    setCollapsable(false);
                }
            })
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

                <form className="border rounded-lg border-blue-300 px-3 py-1 min-w-[300px]" onSubmit={handleForm}>
                    <div className="flex justify-between cursor-row-resize" onClick={() => setCollapsable(d => !d)}>
                        <h2>Restaurar con un archivo</h2>
                        <FaCircleChevronLeft size={24} className={`text-gray-600 duration-300 ${collapsable ? "-rotate-90" : "rotate-0"}`} />
                    </div>
                    <Collapse in={collapsable}>
                        <div className="flex items-center">
                            <div onClick={handleInputFile} className="mx-auto bg-gray-300 cursor-pointer w-full text-center border px-3 py-2 rounded-lg">
                                {fileName ? fileName : "Seleccionar archivo"}
                                <input type="file" accept='.sql' name="file0" onChange={handleFile} className="hidden" ref={fileRef} />
                            </div>
                            {genLoading ?
                                <CircularProgress size={25} color="success" /> :
                                <Tooltip title="Restaurar">
                                    <IconButton color="success" type="submit">
                                        <FaClockRotateLeft />
                                    </IconButton>
                                </Tooltip>
                            }
                        </div>
                    </Collapse>
                </form>

                <div className="border w-full rounded-lg py-1 px-2 overflow-y-auto max-h-[330px]">
                    <h1 className="font-semibold text-gray-500">Copias realizadas</h1>
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
                                                        onClick={() => handleRestore(d.split(".")[0], d)}>
                                                        <FaClockRotateLeft />
                                                    </IconButton>
                                                </Tooltip>
                                        }
                                        <Tooltip title="Descargar script">
                                            <a href={"/api/backup/download/" + d.split(".")[0]} download>
                                                <IconButton color="primary">
                                                    <FaDownload />
                                                </IconButton>
                                            </a>
                                        </Tooltip>


                                    </span>
                                </div>
                            )).reverse()
                    }
                </div>

                <Button variant="contained" color="primary" disabled={genLoading} onClick={handleBakup}>
                    {genLoading ? <LoaderBtn /> : "Crear una copia ahora"}
                </Button>
            </div>
        </div >
    );
}
export default Maintenance;