import { ClientesForm } from "@/modules/clientes/components/ClientesForm";
import { Card } from "@/modules/core/components/Card";

export const AddClientes = () => {
  return (
    <Card>
      <div className="flex justify-center m-5">
        <ClientesForm />
      </div>
    </Card>
  );
};
