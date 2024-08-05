import { Card } from "@/modules/core/components/Card.tsx";
import { useParams } from "react-router-dom";
import { ArticleForm } from "@/modules/articles/components/ArticleForm";

interface IParams {
  [key: string]: string;
  id: string;
}

export const EditArticles = () => {
  const { id } = useParams<IParams>();
  return (
    <Card>
      <div className="flex justify-center m-5">
        <ArticleForm isEdit id={id} />
      </div>
    </Card>
  );
};