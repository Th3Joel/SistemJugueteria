import LoaderSplash from "@/modules/core/components/LoaderSplash";
import { AuthState } from "@/modules/core/globalStates/auth-state";
import { Layout } from "@/pages/Layout";
import { Login } from "@/pages/auth/Login";
import { AddClientes } from "@/pages/clientes/AddClientes";
import { Clientes } from "@/pages/clientes/Clientes";
import { EditClientes } from "@/pages/clientes/EditClientes";
import { Dashboard } from "@/pages/home/Dashboard";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
export const Router = () => {
  const auth = AuthState();

  useEffect(() => {
    auth.verify();
  }, []);

  return (<>
   
      {auth.loading ? (
        <LoaderSplash />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />}/>
              <Route path="/clientes/editar/:id" element={<EditClientes/>}/>
              <Route path="/clientes/agregar" element={<AddClientes/>}/>
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<div>Not fount</div>} />
        </Routes>
      )}
    </>
  );
};
