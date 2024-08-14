import {SupplierForm} from "@/modules/supplier/components/supplierForm.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import {useParams} from "react-router-dom";

interface IParams {
    [key: string]: string;
    id: string;
}
const EditSupplier = () => {
    const {id} = useParams<IParams>()
  return (
      <Card>
        <div className="grid place-items-center m-5">
          <SupplierForm isEdit id={id} />
        </div>
      </Card>
  );
};
export default EditSupplier;