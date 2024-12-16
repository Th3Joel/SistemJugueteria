import {Card} from "@/modules/core/components/Card.tsx";
import { TitleState } from "@/modules/core/states/title-state";
import { StateDriver, stepsFormAdd } from "@/modules/core/utils/driver";
import {SupplierForm} from "@/modules/supplier/components/supplierForm.tsx";
import { useEffect } from "react";

const AddSupplier = () => {
    const { setTitle } = TitleState();
    const {setSteps} = StateDriver();
    useEffect(() => {
        setTitle("Agregar proveedor");
        setSteps(stepsFormAdd);
    }, [])
  return (
      <Card btnBack btnBackLink="/suppliers">
          <div className="grid place-items-center m-5 formAdd">
              <SupplierForm />
          </div>
      </Card>
  );
};
export default AddSupplier;