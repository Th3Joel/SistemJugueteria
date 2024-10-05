import {
  FaCartShopping,
  FaMoneyBillTrendUp,
  FaUserPlus,
  FaUsers,
  FaPeopleCarryBox,
} from "react-icons/fa6";
import { BoxCounterInfo } from "./BoxCounterInfo";
import { useForm } from "@/modules/core/hooks/useForm";
import { useEffect } from "react";
import { formatNumber } from "@/modules/core/utils/formatNumber";

interface ICounters {
  costumersCount: number;
  suppliersCount: number;
  usersCount: number;
  totalPurchases: number;
  totalSales: number;
}
export const SectionCounters = () => {
  const { get, loading, data } = useForm<ICounters>({
    costumersCount: 0,
    suppliersCount: 0,
    usersCount: 0,
    totalPurchases: 0,
    totalSales: 0,
  });

  useEffect(() => {
    get("/home/counters");
  }, []);
  return (
    <div className="flex gap-3 flex-wrap justify-center mb-5">
      <BoxCounterInfo
        counter={"C$ "+formatNumber(data.totalPurchases+"")}
        title="Compras hoy"
        color="#17A2B8"
        link="/"
        isLoading={loading}
        icon={<FaCartShopping />}
      />

      <BoxCounterInfo
        counter={"C$ "+formatNumber(data.totalSales+"")}
        title="Ventas hoy"
        color="#22A745"
        link="/"
        isLoading={loading}
        icon={<FaMoneyBillTrendUp />}
      />

      <BoxCounterInfo
        counter={""+data.usersCount}
        title="Usuarios"
        color="#E261B1"
        link="/settings/users"
        isLoading={loading}
        icon={<FaUserPlus />}
      />

      <BoxCounterInfo
        counter={""+data.costumersCount}
        title="Clientes"
        color="#1976D2"
        link="/clientes"
        isLoading={loading}
        icon={<FaUsers />}
      />

      <BoxCounterInfo
        counter={""+data.suppliersCount}
        title="Proveedores"
        color="#c98c30"
        link="/suppliers"
        isLoading={loading}
        icon={<FaPeopleCarryBox />}
      />
    </div>
  );
};
