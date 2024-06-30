import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import {useParams} from "react-router-dom";

interface Params {
    [key: string]: string;
  id: string;
}
export const EditUsers = () => {
    const {id} = useParams<Params>();
    window.document.title = "Editar Usuario";
  return (
      <div className="flex justify-center">
        <UsersForm isEdit id={id}/>
      </div>
  )
}
