import { Card } from "@/modules/core/components/Card";
import { useFetch } from "@/modules/core/hooks/useFetch";
import { AuthState } from "@/modules/core/states/auth-state";
import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsDashboard } from "@/modules/core/utils/driver";
import { LinesChart } from "@/modules/home/components/LinesChart";
import { SectionCounters } from "@/modules/home/components/SectionCounters";
import { IResponseFetch } from "@/types";
import { useEffect, useState } from "react";

interface IDataGraph {
  time: string
  total_ventas: number
}

const Dashboard = () => {
  const { user } = AuthState();
  const { setTitle } = TitleState();
  const { setSteps } = StateDriver();
  const [dataGraph, setDataGraph] = useState<IDataGraph[]>([])
  // const datas = [
  //   { year: 2010, count: 13 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 40.78 },
  //   { year: 2014, count: 22.9 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ];
  const getData = async () => {
    const res = await useFetch<IResponseFetch<IDataGraph[]>>("/home/total-sales", "GET")
    if (res.status) {
      setDataGraph(res.find)
    }
  }
  useEffect(() => {
    setTitle("Dashboard");
    setSteps(stepsDashboard);
    getData()
  }, [])
  return (
    <Card>
      <div className="p-3">
        {
          user.Role == "admin" &&
          <>
            <div className="counters">
              <SectionCounters />
            </div>
            <div className="graphSales">
              <div className="border rounded-lg border-[#28A745] p-2 overflow-x-hidden">
                <LinesChart data={dataGraph.map((d) => d.total_ventas)} labels={dataGraph.map((d) => d.time)} />
              </div>
            </div>
          </>
        }

        {
          user.Role == "vendedor" &&
          <div className="flex flex-col items-center">
            <h1 className="text-4xl">Bienvenido</h1>
            <h1 className="text-2xl">
              {user.Name}
            </h1>
          </div>
        }


      </div>
    </Card>
  );
};
export default Dashboard;