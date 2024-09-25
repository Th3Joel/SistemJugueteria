import { CostumerForm } from "@/modules/costumer/components/CostumerForm";
import { Card } from "@/modules/core/components/Card";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";

const AddCostumer = () => {
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Agregar cliente");
    }, [])
  return (
    <Card btnBack btnBackLink="/clientes">
      <div className="flex justify-center m-5">
        <CostumerForm />
      </div>
    </Card>
  );
};
export default AddCostumer;