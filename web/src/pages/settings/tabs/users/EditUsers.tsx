import { TitleState } from "@/modules/core/states/title-state";
import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import { IParams } from "@/types";
import { useEffect } from "react";
import {useParams} from "react-router-dom";


const EditUsers = () => {
    const {id} = useParams<IParams>();
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Configuración | Editar usuario");
    }, [])
  return (
      <div className="flex justify-center">
        <UsersForm isEdit id={id}/>
      </div>
  )
}
export default EditUsers;