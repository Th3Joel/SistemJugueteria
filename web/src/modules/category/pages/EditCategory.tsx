import { useParams } from "react-router-dom";
import { Card } from "@/modules/core/components/Card.tsx";
import { CategoryForm } from "@/modules/category/components/CategoryForm.tsx";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { IParams } from "@/types";


const EditCategory = () => {
    const { id } = useParams<IParams>()
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Editar categoría");
    }, [])
    return (
        <Card btnBack btnBackLink="/categories">
            <div className="flex justify-center m-5">
                <CategoryForm isEdit id={id} />
            </div>
        </Card>)
}
export default EditCategory;