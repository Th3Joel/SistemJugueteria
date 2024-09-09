import { Button } from "@mui/material"
import { useState } from "react"
import LoaderBtn from "./LoaderBtn"

export interface ModalProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    title: string
    children: React.ReactNode
    loadBtn?: boolean
}

export const useModal = () => {
    const [modalShow, setModalShow] = useState<boolean>(false)
    const Modal: React.FC<ModalProps> = ({ title, children,onSubmit,loadBtn }) => {
        return (
            <div className={`fixed w-full h-[100dvh] top-0 left-0
                             bg-slate-500/20 z-[99] backdrop-blur-sm 
                            grid place-items-center ${!modalShow && "hidden"}`}>
                <form className="w-auto bg-white rounded-xl p-4" onSubmit={onSubmit}>
                    <header className="font-bold text-xl">
                        {title}
                    </header>
                    <hr className="my-3" />
                    <main>
                        {children}
                    </main>
                    <hr className="my-3" />
                    <footer className="flex justify-between">
                        <Button variant="contained" color="error" onClick={() => setModalShow(false)}>
                            Cancelar
                        </Button>
                        <Button disabled={loadBtn} variant="contained" type="submit">
                            {loadBtn ? <LoaderBtn /> : "Aceptar"}
                        </Button>
                    </footer>
                </form>
            </div>
        )
    }
    return {
        RenderModal: Modal,
        setModalShow
    }
}
