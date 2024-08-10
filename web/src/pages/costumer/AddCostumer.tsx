import { CostumerForm } from "@/modules/costumer/components/CostumerForm";
import { Card } from "@/modules/core/components/Card";

export const AddCostumer = () => {
  return (
    <Card>
      <div className="flex justify-center m-5">
        <CostumerForm />
      </div>
    </Card>
  );
};
