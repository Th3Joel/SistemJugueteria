import {Card} from "@/modules/core/components/Card.tsx";
import {ArticleBoxForm} from "@/modules/articleBox/components/ArticleBoxForm.tsx";
import {useParams} from "react-router-dom";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { IParams } from "@/types";


const EditArticleBox = () => {
    const {id} = useParams<IParams>();
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Editar caja de artículos");
    }, [])
  return (
      <Card btnBack btnBackLink="/articles-box">
          <div className="flex justify-center m-5">
              <ArticleBoxForm isEdit id={id}/>
          </div>

      </Card>
  );
};

export default EditArticleBox;