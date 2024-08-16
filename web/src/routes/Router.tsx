import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import LoaderSplash from "@/modules/core/components/LoaderSplash";
import { AuthState } from "@/modules/core/globalStates/auth-state";
import Layout from "@/pages/Layout";
import Login from "@/pages/auth/Login";
import AddCostumer from "@/pages/costumer/AddCostumer";
import Clientes from "@/pages/costumer/Costumer";
import EditCostumer from "@/pages/costumer/EditCostumer";
import Dashboard from "@/pages/home/Dashboard";
import Setting from "@/pages/settings/Setting";
import Company from "@/pages/settings/tabs/Company";
import Profile from "@/pages/settings/tabs/Profile";
import Users from "@/pages/settings/tabs/users/Users";
import Maintenance from "@/pages/settings/tabs/maintenance.tsx";
import AddUsers from "@/pages/settings/tabs/users/AddUsers.tsx";
import EditUsers from "@/pages/settings/tabs/users/EditUsers.tsx";
import ArticleBox from "@/pages/articleBox/ArticleBox.tsx";
import EditArticleBox from "@/pages/articleBox/EditArticleBox.tsx";
import AddArticleBox from "@/pages/articleBox/AddArticleBox.tsx";
import Category from "@/pages/category/Category.tsx";
import EditCategory from "@/pages/category/EditCategory.tsx";
import AddCategory from "@/pages/category/AddCategory.tsx";
import Suppliers from "@/pages/supplier/Suppliers.tsx";
import AddSupplier from "@/pages/supplier/AddSupplier.tsx";
import EditSupplier from "@/pages/supplier/EditSupplier.tsx";
import Articles from "@/pages/articles/Articles";
import AddArticles from "@/pages/articles/AddArticles";
import EditArticles from "@/pages/articles/EditArticles";
import CashRegister from "@/pages/cashRegister/CashRegister";
import AuthLayout from "@/pages/auth/AuthLayout";
import ForgotPasswd from "@/pages/auth/ForgotPasswd";
import ResetPasswd from "@/pages/auth/ResetPasswd";
import { routesTitles, TitleState } from "@/modules/core/globalStates/title-state";


const Router = () => {
    const auth = AuthState();
    const { setTitle, setPath } = TitleState();
    useEffect(() => {
        auth.verify();
    }, []);
    const { pathname } = useLocation();
    useEffect(() => {
        setTitle(routesTitles[pathname] || "Undefinido");
        setPath(pathname);
    }, [pathname])

    return (
        <>
            
            {auth.loading ? (
                <LoaderSplash />
            ) : (
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/clientes/edit/:id" element={<EditCostumer />} />
                        <Route path="/clientes/add" element={<AddCostumer />} />

                        <Route path="/settings" element={<Setting />}>
                            <Route index element={<Users />} />
                            <Route path="users" element={<Users />} />
                            <Route path="users/add" element={<AddUsers />} />
                            <Route path="users/edit/:id" element={<EditUsers />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="company" element={<Company />} />
                            <Route path="maintenance" element={<Maintenance />} />
                        </Route>

                        <Route path="/articles-box" element={<ArticleBox />} />
                        <Route path="/articles-box/edit/:id" element={<EditArticleBox />} />
                        <Route path="/articles-box/add" element={<AddArticleBox />} />

                        <Route path="/categories" element={<Category />} />
                        <Route path="/categories/edit/:id" element={<EditCategory />} />
                        <Route path="/categories/add" element={<AddCategory />} />




                        <Route path="/suppliers" element={<Suppliers />} />
                        <Route path="/suppliers/add" element={<AddSupplier />} />
                        <Route path="/suppliers/edit/:id" element={<EditSupplier />} />

                        <Route path="/articles" element={<Articles />} />
                        <Route path="/articles/edit/:id" element={<EditArticles />} />
                        <Route path="/articles/add" element={<AddArticles />} />

                        <Route path="/cash-register" element={<CashRegister />} />

                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="forgot-password" element={<ForgotPasswd />} />
                        <Route path="reset-password" element={<ResetPasswd />} />
                    </Route>
                    <Route path="*" element={<div>Not fount</div>} />
                </Routes>
            )}
        </>
    );
};

export default Router;