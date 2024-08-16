import wifiImg from "@/assets/wifi.png";
import { useEffect, useState } from "react";

export const OfflineNetwork = () => {
    const [offline, SetOffline] = useState(false);
    useEffect(() => {
        window.addEventListener("offline", () => {
            SetOffline(true);
        });
        window.addEventListener("online", () => {
            SetOffline(false);
        });
    }, []);
    return (
        offline &&
        <div className="z-30 fixed top-0 left-0 w-full h-[100dvh] 
                grid place-items-center backdrop-blur-sm
                bg-slate-500/20 text-white animate__fadeIn">
            <div>
                <img src={wifiImg} alt="wifi" width={300} />
                <p className="text-red-600">Comprueba tu conexión a internet</p>
            </div>
        </div>
    )
}
