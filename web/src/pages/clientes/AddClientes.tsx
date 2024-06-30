import { ClientesForm } from "@/modules/clientes/components/ClientesForm";
import { Card } from "@/modules/core/components/Card";

export const AddClientes = () => {
    window.document.title = "Crear Cliente";
  return (
    <Card>
      <div className="flex justify-center m-5">
        <ClientesForm />
      </div>
    </Card>
  );
};
