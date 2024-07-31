import { Card } from "@/modules/core/components/Card";
import { LinesChart } from "@/modules/home/components/LinesChart";
import { SectionCounters } from "@/modules/home/components/SectionCounters";

export const Dashboard = () => {

  window.document.title = "Dashboard";

  return (
    <Card>
      <div className="p-3">
        <SectionCounters/>
        <LinesChart />
      </div>
    </Card>
  );
};
