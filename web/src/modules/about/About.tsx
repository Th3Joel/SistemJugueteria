import { Card } from "@/modules/core/components/Card"
import joelImg from "@/assets/joel.webp"
import juanImg from "@/assets/juan.webp"
import { FaEnvelope, FaGithub, FaPhone } from "react-icons/fa6"
import { useEffect } from "react"
import { TitleState } from "@/modules/core/states/title-state"
const About = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Acerca de");
    }, [])
    return (
        <Card>
            <div className="flex items-center flex-col py-6 gap-5">
                <div className="flex items-center">
                    <section className="w-[150px] h-[150px] rounded-full border-2 grid place-items-center overflow-hidden">
                        <img src={joelImg} alt="Ing. Joel Urbina" width={150} />
                    </section>
                    <main className="ml-4">
                        <h2 className="font-bold text-xl text-gray-700">Ing. Joel Calderón Urbina</h2>
                        <h3>Desarrollador Web, Backend</h3>
                        <span className="flex items-center gap-2">
                            <FaEnvelope className="text-gray-500 text-xl" />
                            <h3 className="text-gray-500">joel8080ur@gmail.com</h3>
                        </span>

                        <span className="flex items-center gap-2">
                            <FaGithub className="text-gray-500 text-xl" />
                            <a href="https://github.com/th3joel" target="_blank" rel="noreferrer">
                                <h3 className="text-gray-500 hover:underline">Ir al perfil</h3>
                            </a>
                        </span>

                        <span className="flex items-center gap-2">
                            <FaPhone className="text-gray-500 text-xl" />
                            <h3 className="text-gray-500">+505 5820-9439</h3>
                        </span>
                    </main>
                </div>
                <hr className="w-[400px]" />
                <div className="flex items-center">
                    <section className="w-[150px] h-[150px] rounded-full border-2 grid place-items-center overflow-hidden">
                        <img src={juanImg} alt="Ing. Juan Jenkins" width={150} />
                    </section>
                    <main className="ml-4">
                        <h2 className="font-bold text-xl text-gray-700">Ing. Juan Jenkins Martínez</h2>
                        <h3>Desarrollador Web</h3>
                        <span className="flex items-center gap-2">
                            <FaEnvelope className="text-gray-500 text-xl" />
                            <h3 className="text-gray-500">jm151925@gmail.com</h3>
                        </span>

                        <span className="flex items-center gap-2">
                            <FaGithub className="text-gray-500 text-xl" />
                            <a href="https://github.com/Jenmarth" target="_blank" rel="noreferrer">
                                <h3 className="text-gray-500 hover:underline">Ir al perfil</h3>
                            </a>
                        </span>
                        <span className="flex items-center gap-2">
                            <FaPhone className="text-gray-500 text-xl" />
                            <h3 className="text-gray-500">+505 8336-3085</h3>
                        </span>
                    </main>
                </div>
            </div>
        </Card>
    )
}

export default About