import { Layout } from "@/pages/Layout";
import { Login } from "@/pages/auth/Login";
import { Clientes } from "@/pages/clientes/Clientes";
import { Dashboard } from "@/pages/home/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes/>} />
        </Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="*" element={<div>Not fount</div>} />
      </Routes>
    </BrowserRouter>
  );
};
