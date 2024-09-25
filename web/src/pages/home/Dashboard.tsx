import { Card } from "@/modules/core/components/Card";
import { AuthState } from "@/modules/core/states/auth-state";
import { TitleState } from "@/modules/core/states/title-state";
import { LinesChart } from "@/modules/home/components/LinesChart";
import { SectionCounters } from "@/modules/home/components/SectionCounters";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = AuthState();
  const { setTitle } = TitleState();
  useEffect(() => {
    setTitle("Dashboard");
  }, [])
  return (
    <Card>
      <div className="p-3">
        {
          user.Role == "admin" &&
          <>
            <SectionCounters />
            <LinesChart />
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