import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import LoaderSplash from "@/modules/core/components/LoaderSplash";
import { AuthState } from "@/modules/core/states/auth-state";
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
import AddPurchase from "@/pages/purchase/AddPurchase";
import ViewPurchase from "@/pages/purchase/ViewPurchase";
import Purchase from "@/pages/purchase/Purchase";
import AddSale from "@/pages/sale/AddSale";
import Sale from "@/pages/sale/Sale";
import YouBox from "@/pages/cashRegister/tabs/YouBox";
import History from "@/pages/cashRegister/tabs/History";
import ViewCash from "@/modules/cashRegister/ViewCash";
import ViewSale from "@/pages/sale/ViewSale";
import Reports from "@/pages/reports/Reports";
import InventoryReport from "@/pages/reports/InventoryReport";
import LayoutReport from "@/pages/reports/LayoutReport";
import SpecificSale from "@/pages/reports/SpecificSale";
import SpecificPurchase from "@/pages/reports/SpecificPurchase";
import SuppliersReport from "@/pages/reports/SuppliersReport";
import CostumersReport from "@/pages/reports/CostumersReport";
import PurchasesReport from "@/pages/reports/PurchasesReport";
import SalesReport from "@/pages/reports/SalesReport";
import PettyCash from "@/pages/pettyCash/PettyCash";
import Business from "@/pages/business/Business";
import CashRegisterReport from "@/pages/reports/CashRegisterReport";
import OtherInventoryOutputs from "@/pages/reports/OtherInventoryOutputs";
import About from "@/pages/about/About";

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