import { ClientesForm } from "@/modules/clientes/components/ClientesForm";
import { Card } from "@/modules/core/components/Card";
import { useParams } from "react-router-dom"

interface Params{
    [key:string]:string
    id:string
}
export const EditClientes:React.FC = () => {
    const {id} = useParams<Params>();
  window.document.title = "Editar Cliente";
  return (
    <Card>
      <div className="flex justify-center m-5">
        <ClientesForm isEdit id={id} />
      </div>
    </Card>
  )
}
