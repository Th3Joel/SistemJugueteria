import { Card } from "@/modules/core/components/Card";
import { useParams } from "react-router-dom"

interface Params{
    [key:string]:string
    id:string
}
export const EditClientes:React.FC = () => {
    const {id} = useParams<Params>();
  return (
    <Card>EditClientes {id}</Card>
  )
}
