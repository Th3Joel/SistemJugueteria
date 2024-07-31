import {Card} from "@/modules/core/components/Card.tsx";
import {SupplierForm} from "@/modules/supplier/components/supplierForm.tsx";

export const AddSupplier = () => {
  return (
      <Card>
          <div className="grid place-items-center m-5">
              <SupplierForm />
          </div>
      </Card>
  );
};