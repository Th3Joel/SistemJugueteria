import { CostumerForm } from "@/modules/costumer/components/CostumerForm";
import { Card } from "@/modules/core/components/Card";
import { useParams } from "react-router-dom"
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { IParams } from "@/types";


const EditCostumer:React.FC = () => {
    const {id} = useParams<IParams>();
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Editar cliente");
    }, [])
  return (
    <Card btnBack btnBackLink="/clientes">
      <div className="flex justify-center m-5">
        <CostumerForm isEdit id={id} />
      </div>
    </Card>
  )
}
export default EditCostumer;