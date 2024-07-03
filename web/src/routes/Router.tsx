import LoaderSplash from "@/modules/core/components/LoaderSplash";
import {AuthState} from "@/modules/core/globalStates/auth-state";
import {Layout} from "@/pages/Layout";
import {Login} from "@/pages/auth/Login";
import {AddClientes} from "@/pages/clientes/AddClientes";
import {Clientes} from "@/pages/clientes/Clientes";
import {EditClientes} from "@/pages/clientes/EditClientes";
import {Dashboard} from "@/pages/home/Dashboard";
import {Setting} from "@/pages/settings/Setting";
import {Company} from "@/pages/settings/tabs/Company";
import {Profile} from "@/pages/settings/tabs/Profile";
import {Users} from "@/pages/settings/tabs/users/Users";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {Maintenance} from "@/pages/settings/tabs/maintenance.tsx";
import {AddUsers} from "@/pages/settings/tabs/users/AddUsers.tsx";
import {EditUsers} from "@/pages/settings/tabs/users/EditUsers.tsx";
import {ArticleBox} from "@/pages/articleBox/ArticleBox.tsx";
import {EditArticleBox} from "@/pages/articleBox/EditArticleBox.tsx";
import {AddArticleBox} from "@/pages/articleBox/AddArticleBox.tsx";

export const Router = () => {
    const auth = AuthState();

    useEffect(() => {
        auth.verify();
    }, []);

    return (
        <>
            {auth.loading ? (
                <LoaderSplash/>
            ) : (
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="/clientes" element={<Clientes/>}/>
                        <Route path="/clientes/editar/:id" element={<EditClientes/>}/>
                        <Route path="/clientes/agregar" element={<AddClientes/>}/>

                        <Route path="/settings" element={<Setting/>}>
                            <Route index element={<Users/>}/>
                            <Route path="users" element={<Users/>}/>
                            <Route path="users/agregar" element={<AddUsers/>}/>
                            <Route path="users/editar/:id" element={<EditUsers/>}/>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="company" element={<Company/>}/>
                            <Route path="maintenance" element={<Maintenance/>}/>
                        </Route>

                        <Route path="/articles-box" element={<ArticleBox/>}/>
                        <Route path="/articles-box/edit/:id" element={<EditArticleBox/>}/>
                        <Route path="/articles-box/add" element={<AddArticleBox/>}/>

                    </Route>
                    <Route path="/auth/login" element={<Login/>}/>
                    <Route path="*" element={<div>Not fount</div>}/>
                </Routes>
            )}
        </>
    );
};
