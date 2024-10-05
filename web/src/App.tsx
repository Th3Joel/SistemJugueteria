import { BrowserRouter } from "react-router-dom";
import Router from "@/routes/Router";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter basename="/sis">
      {/* <OfflineNetwork /> */}
      <Toaster richColors closeButton />
      <Router />
    </BrowserRouter>
  );
}

export default App;
