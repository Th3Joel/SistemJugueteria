import {CategoryForm} from "@/modules/category/components/CategoryForm.tsx";
import {Card} from "@/modules/core/components/Card.tsx";

export const AddCategory = () => {
    return (
        <Card>
        <div className="grid place-items-center m-5">
            <CategoryForm/>
        </div>
        </Card>
    )
}