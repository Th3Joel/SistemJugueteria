import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/Router";
import { Toaster } from "sonner";
import { OfflineNetwork } from "./modules/core/components/OfflineNetwork";

function App() {

    return (
        <BrowserRouter>
            <OfflineNetwork />
            <Toaster richColors closeButton />
            <Router />
        </BrowserRouter>
    );
}

export default App;
