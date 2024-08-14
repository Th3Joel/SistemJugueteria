import {UsersForm} from "@/modules/settings/components/UsersForm.tsx";
import {useParams} from "react-router-dom";

interface Params {
    [key: string]: string;
  id: string;
}
const EditUsers = () => {
    const {id} = useParams<Params>();
  return (
      <div className="flex justify-center">
        <UsersForm isEdit id={id}/>
      </div>
  )
}
export default EditUsers;