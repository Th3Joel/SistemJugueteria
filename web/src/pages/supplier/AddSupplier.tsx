import {Card} from "@/modules/core/components/Card.tsx";
import { TitleState } from "@/modules/core/states/title-state";
import {SupplierForm} from "@/modules/supplier/components/supplierForm.tsx";
import { useEffect } from "react";

const AddSupplier = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Agregar proveedor");
    }, [])
  return (
      <Card btnBack btnBackLink="/suppliers">
          <div className="grid place-items-center m-5">
              <SupplierForm />
          </div>
      </Card>
  );
};
export default AddSupplier;