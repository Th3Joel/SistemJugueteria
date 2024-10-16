import { Outlet } from 'react-router-dom'
import './indexH.css';
import { Button, IconButton } from '@mui/material';
import { FaPrint } from 'react-icons/fa6';
import { AuthState } from '@/modules/core/states/auth-state';
import logoImg from '@/assets/logo.jpg';
const LayoutReport = () => {
    window.document.title = "Reporte";

    const { estado, company } = AuthState();
    return (
        <div>
            {
                !estado ?
                    <div className='grid place-items-center h-[100dvh]'>
                        <Button variant="contained" color="primary" onClick={() => window.location.href = "/auth/login"}>
                            Iniciar sesión
                        </Button>
                    </div>
                    :
                    <>
                        <header className="no-print">
                            <h1 className="text-center text-xl my-2">Imprimir reporte
                                <IconButton color="primary" onClick={() => window.print()}>
                                    <FaPrint />
                                </IconButton>
                            </h1>
                        </header>

                        <div className="flex flex-col items-center print-container">
                            <header className="header w-[800px]"> 
                                <div className="flex gap-2">
                                    <div className="bg-slate-500 h-[100px] w-[100%] rounded-md">
                                        <div className="flex flex-col justify-center items-center h-full text-white">
                                            <h1 className="text-3xl">{company.Name}</h1>
                                            {
                                                company.Phone &&
                                                <h1>
                                                    Contacto: {company.Phone}
                                                </h1>
                                            }
                                            {
                                                company.Email && <h1>Correo: {company.Email}</h1>
                                            }
                                        </div>
                                    </div>
                                    <div className="h-[100px] w-[150px] bg-slate-500 rounded-md">
                                        <div className="flex justify-center items-center h-full">
                                            <img src={company.Logo == "" ? logoImg : "/api/settings/company/logo"} alt="" width={80} />
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <Outlet />
                        </div>
                    </>
            }
        </div>
    )
}

export default LayoutReport