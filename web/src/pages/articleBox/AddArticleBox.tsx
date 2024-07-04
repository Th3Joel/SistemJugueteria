import {Card} from "@/modules/core/components/Card.tsx";
import {ArticleBoxForm} from "@/modules/articleBox/components/ArticleBoxForm.tsx";

export const AddArticleBox = () => {
  return (
    <Card>
        <div className="flex justify-center m-5">
            <ArticleBoxForm />
        </div>

    </Card>
  );
};