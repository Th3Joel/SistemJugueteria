import { CostumerForm } from "@/modules/costumer/components/CostumerForm";
import { Card } from "@/modules/core/components/Card";

const AddCostumer = () => {
  return (
    <Card>
      <div className="flex justify-center m-5">
        <CostumerForm />
      </div>
    </Card>
  );
};
export default AddCostumer;