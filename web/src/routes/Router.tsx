import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import LoaderSplash from "@/modules/core/components/LoaderSplash";
import { AuthState } from "@/modules/core/states/auth-state";
import Layout from "@/modules/layouts/Layout";
import Login from "@/modules/auth/pages/Login";
import AddCostumer from "@/modules/costumer/pages/AddCostumer";
import Clientes from "@/modules/costumer/pages/Costumer";
import EditCostumer from "@/modules/costumer/pages/EditCostumer";
import Dashboard from "@/modules/home/pages/Dashboard";
import Setting from "@/modules/settings/pages/Setting";
import Company from "@/modules/settings/pages/tabs/Company";
import Profile from "@/modules/settings/pages/tabs/Profile";
import Users from "@/modules/settings/pages/tabs/users/Users";
import Maintenance from "@/modules/settings/pages/tabs/maintenance";
import AddUsers from "@/modules/settings/pages/tabs/users/AddUsers";
import EditUsers from "@/modules/settings/pages/tabs/users/EditUsers";
import ArticleBox from "@/modules/articleBox/pages/ArticleBox";
import EditArticleBox from "@/modules/articleBox/pages/EditArticleBox";
import AddArticleBox from "@/modules/articleBox/pages/AddArticleBox";
import Category from "@/modules/category/pages/Category";
import EditCategory from "@/modules/category/pages/EditCategory";
import AddCategory from "@/modules/category/pages/AddCategory";
import Suppliers from "@/modules/supplier/pages/Suppliers";
import AddSupplier from "@/modules/supplier/pages/AddSupplier";
import EditSupplier from "@/modules/supplier/pages/EditSupplier";
import Articles from "@/modules/articles/pages/Articles";
import AddArticles from "@/modules/articles/pages/AddArticles";
import EditArticles from "@/modules/articles/pages/EditArticles";
import CashRegister from "@/modules/cashRegister/pages/CashRegister";
import AuthLayout from "@/modules/auth/pages/AuthLayout";
import ForgotPasswd from "@/modules/auth/pages/ForgotPasswd";
import ResetPasswd from "@/modules/auth/pages/ResetPasswd";
import AddPurchase from "@/modules/purchase/pages/AddPurchase";
import ViewPurchase from "@/modules/purchase/pages/ViewPurchase";
import Purchase from "@/modules/purchase/pages/Purchase";
import AddSale from "@/modules/sale/pages/AddSale";
import Sale from "@/modules/sale/pages/Sale";
import YouBox from "@/modules/cashRegister/pages/tabs/YouBox";
import History from "@/modules/cashRegister/pages/tabs/History";
import ViewCash from "@/modules/cashRegister/components/ViewCash";
import ViewSale from "@/modules/sale/pages/ViewSale";
import Reports from "@/modules/reports/pages/Reports";
import InventoryReport from "@/modules/reports/pages/InventoryReport";
import LayoutReport from "@/modules/reports/pages/LayoutReport";
import SpecificSale from "@/modules/reports/pages/SpecificSale";
import SpecificPurchase from "@/modules/reports/pages/SpecificPurchase";
import SuppliersReport from "@/modules/reports/pages/SuppliersReport";
import CostumersReport from "@/modules/reports/pages/CostumersReport";
import PurchasesReport from "@/modules/reports/pages/PurchasesReport";
import SalesReport from "@/modules/reports/pages/SalesReport";
import PettyCash from "@/modules/pettyCash/pages/PettyCash";
import Business from "@/modules/business/Business";
import CashRegisterReport from "@/modules/reports/pages/CashRegisterReport";
import OtherInventoryOutputs from "@/modules/reports/pages/OtherInventoryOutputs";
import About from "@/modules/about/About";

const Router = () => {
    const auth = AuthState();
    useEffect(() => {
        auth.verify();
    }, []);

    return (
        <>

            {auth.loading ? (
                <LoaderSplash />
            ) : (
                <Routes>
                    <Route path="/" element={<Layout />}>
                        
                        <Route index element={<Dashboard />} />
                        {
                            (auth.user.Role == "admin" || auth.user.Role == "") &&
                            <>
                                <Route path="/clientes" element={<Clientes />} />
                                <Route path="/clientes/edit/:id" element={<EditCostumer />} />
                                <Route path="/clientes/add" element={<AddCostumer />} />

                                <Route path="/suppliers" element={<Suppliers />} />
                                <Route path="/suppliers/add" element={<AddSupplier />} />
                                <Route path="/suppliers/edit/:id" element={<EditSupplier />} />

                                <Route path="/articles-box" element={<ArticleBox />} />
                                <Route path="/articles-box/edit/:id" element={<EditArticleBox />} />
                                <Route path="/articles-box/add" element={<AddArticleBox />} />

                                <Route path="/purchases" element={<Purchase />} />
                                <Route path="/purchases/add" element={<AddPurchase />} />
                                <Route path="/purchases/edit/:id" element={<ViewPurchase />} />

                                <Route path="/articles" element={<Articles />} />
                                <Route path="/articles/edit/:id" element={<EditArticles />} />
                                <Route path="/articles/add" element={<AddArticles />} />

                                <Route path="/categories" element={<Category />} />
                                <Route path="/categories/edit/:id" element={<EditCategory />} />
                                <Route path="/categories/add" element={<AddCategory />} />

                                <Route path="/reports" element={<Reports />} />
                            </>
                        }
                        <Route path="/petty-cash" element={<PettyCash />} />

                        <Route path="/settings" element={<Setting />}>
                            {
                                (auth.user.Role == "admin" || auth.user.Role == "") &&
                                <>
                                    <Route index element={<Users />} />
                                    <Route path="users" element={<Users />} />
                                    <Route path="users/add" element={<AddUsers />} />
                                    <Route path="users/edit/:id" element={<EditUsers />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="company" element={<Company />} />
                                    <Route path="maintenance" element={<Maintenance />} />
                                </>
                            } 
                            {
                                (auth.user.Role == "vendedor" || auth.user.Role == "") &&
                                <>
                                    <Route index element={<Profile />} />
                                    <Route path="profile" element={<Profile />} />
                                </>
                            }
                        </Route>

                        <Route path="/business" element={<Business/>} />
                        <Route path="/cash-register" element={<CashRegister />} />
                        <Route path="/about" element={<About/>} />

                        <Route path="/sales" element={<Sale />} />
                        <Route path="/sales/add" element={<AddSale />} />
                        <Route path="/sales/edit/:id" element={<ViewSale />} />

                        <Route path="/cash-register" element={<CashRegister />}>
                            <Route index element={<YouBox />} />
                            <Route path="you-box" element={<YouBox />} />
                            <Route path="history" element={<History />} />
                            <Route path="show/:id" element={<ViewCash />} />
                        </Route>
                    </Route>
                    {
                        (auth.user.Role == "admin" || auth.user.Role == "") &&    
                        <Route path="report" element={<LayoutReport />}>
                            <Route path="inventory/:id?" element={<InventoryReport />} />
                            <Route path="specific-sale/:id" element={<SpecificSale />} />
                            <Route path="specific-purchase/:id" element={<SpecificPurchase />} />
                            <Route path="suppliers" element={<SuppliersReport />} />
                            <Route path="costumers" element={<CostumersReport />} />
                            <Route path="purchases/:filter?" element={<PurchasesReport />} />
                            <Route path="sales/:filter?" element={<SalesReport />} />

                            <Route path="cashRegister/:filter?" element={<CashRegisterReport />} />
                            <Route path="othersInventoryOutputs/:filter?" element={<OtherInventoryOutputs />} />

                        </Route>
                    }

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