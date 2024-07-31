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

interface ICounters {
  costumersCount: number;
  suppliersCount: number;
  usersCount: number;
  purchasesCount: number;
  salesCount: number;
}
export const SectionCounters = () => {
  const { get, loading, data } = useForm<ICounters>({
    costumersCount: 0,
    suppliersCount: 0,
    usersCount: 0,
    purchasesCount: 0,
    salesCount: 0,
  });

  useEffect(() => {
    get("/home/counters");
  }, []);
  return (
    <div className="flex gap-3 flex-wrap justify-center mb-5">
      <BoxCounterInfo
        counter={data.purchasesCount}
        title="Compras"
        color="#17A2B8"
        link="/"
        isLoading={loading}
        icon={<FaCartShopping />}
      />

      <BoxCounterInfo
        counter={data.salesCount}
        title="Ventas"
        color="#22A745"
        link="/"
        isLoading={loading}
        icon={<FaMoneyBillTrendUp />}
      />

      <BoxCounterInfo
        counter={data.usersCount}
        title="Usuarios"
        color="#E261B1"
        link="/settings/users"
        isLoading={loading}
        icon={<FaUserPlus />}
      />

      <BoxCounterInfo
        counter={data.costumersCount}
        title="Clientes"
        color="#1976D2"
        link="/clientes"
        isLoading={loading}
        icon={<FaUsers />}
      />

      <BoxCounterInfo
        counter={data.suppliersCount}
        title="Proveedores"
        color="#c98c30"
        link="/suppliers"
        isLoading={loading}
        icon={<FaPeopleCarryBox />}
      />
    </div>
  );
};
