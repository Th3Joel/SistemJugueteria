import {useParams} from "react-router-dom";
import {Card} from "@/modules/core/components/Card.tsx";
import {CategoryForm} from "@/modules/category/components/CategoryForm.tsx";

interface IParams {
    [key: string]: string;
    id: string;
}
const EditCategory = () => {
    const {id} = useParams<IParams>()
    return <Card>
        <div className="flex justify-center m-5">
            <CategoryForm isEdit id={id}/>
        </div>
    </Card>
}
export default EditCategory;