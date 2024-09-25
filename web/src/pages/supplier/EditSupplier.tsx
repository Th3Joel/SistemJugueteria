import {SupplierForm} from "@/modules/supplier/components/supplierForm.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import {useParams} from "react-router-dom";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { IParams } from "@/types";

const EditSupplier = () => {
    const {id} = useParams<IParams>()
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Editar proveedor");
    }, [])
  return (
      <Card btnBack btnBackLink="/suppliers">
        <div className="grid place-items-center m-5">
          <SupplierForm isEdit id={id} />
        </div>
      </Card>
  );
};
export default EditSupplier;