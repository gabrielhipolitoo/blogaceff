import React from "react";
import { useParams,useNavigate} from "react-router-dom";
import style from "../assets/css/post.module.css";

//markdom
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

//hooks
import { useFetchPost } from "../Hooks/useFetchPost";



const Post = () => {
  const { slug } = useParams();
  const { documents } = useFetchPost(slug);
  const posts = documents.data?.attributes;

  const formataData = (data, locale = 'en-GB') => {
    return new Date(data).toLocaleDateString(locale);
  };

  const navigate = useNavigate('/')
 

  return (
    <article className={style.post}>
      
      <button onClick={() => {
        navigate('/')

      }} id={style.voltarPagina}> ⬅ Voltar pagina</button>
      {posts && 
        <>
          <header className={style.header_post}>
            <h1>{posts['titulo']}</h1>
            <div className={style.data_autor}>
              <p>{formataData(posts['data_post'])} - </p>
              <p>Publicado por {posts['autor_post']}</p>
            </div>
          </header>
          <ReactMarkdown className={style.conteudo_post} rehypePlugins={[rehypeRaw]}>
            {DOMPurify.sanitize(posts['conteudo'])}
          </ReactMarkdown>
          </>
        
      }
    </article>
  );
};

export default Post;
