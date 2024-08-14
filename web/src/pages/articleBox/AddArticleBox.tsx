import {Card} from "@/modules/core/components/Card.tsx";
import {ArticleBoxForm} from "@/modules/articleBox/components/ArticleBoxForm.tsx";
const AddArticleBox = () => {
  return (
    <Card>
        <div className="flex justify-center m-5">
            <ArticleBoxForm />
        </div>

    </Card>
  );
};
export default AddArticleBox;