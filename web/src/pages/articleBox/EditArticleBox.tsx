import {Card} from "@/modules/core/components/Card.tsx";
import {ArticleBoxForm} from "@/modules/articleBox/components/ArticleBoxForm.tsx";
import {useParams} from "react-router-dom";

interface IParams {
    [key: string]: string;
  id: string;
}

const EditArticleBox = () => {
    const {id} = useParams<IParams>();
  return (
      <Card>
          <div className="flex justify-center m-5">
              <ArticleBoxForm isEdit id={id}/>
          </div>

      </Card>
  );
};

export default EditArticleBox;