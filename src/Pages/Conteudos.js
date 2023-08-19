import React, { useEffect, useState } from "react";
import style from "../assets/css/conteudo.module.css";
import { useFetchPosts } from "../Hooks/useFetchPosts";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Componentes/Header";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Conteudos = () => {
  const { documents, loading, notFound, setSearch, search,setDispatch,dispatch,fetchDocuments } = useFetchPosts(); //json da api
  const posts = documents.data; // buscando dados apatir do json data
  const [value,setValue] = useState()
  const reversedPosts = posts?.slice().reverse(); //invertendo json

  const navigate = useNavigate();

  // funções ⬇⬇
  function handlePost(slug) {
    navigate("/post/" + slug);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value) {
      setSearch(value)
      return navigate("/search?q=" + search);
    }
  }

  const formataData = (data, locale = "en-GB") => {
    return new Date(data).toLocaleDateString(locale);
  };



  useEffect(() => {
    if(!value) 
    fetchDocuments()
      return navigate("/");

  }, [search,value,dispatch]);

  // fim funções 🔚
  return (
    <>
      <Header />

      <article className={style.container_conteudos}>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setValue(e.target.value)}
            type="search"
            name=""
            id={style.search}
            placeholder="Pesquise..."
          />
          <button id={style.submitForm} type="submit">
          <FontAwesomeIcon fontSize="3rem" icon={faMagnifyingGlass} />
          </button>
        </form>
        <h1 id={style.titulo_principal}>Posts recentes</h1>
        {loading && <p id={style.loading}>Carregando</p>}
        {notFound && <p id={style.loading}>Nenhuma postagem...</p>}
        <div className={style.flex_conteudos}>
          {reversedPosts &&
            reversedPosts.map((post) => (
              <div className={style.conteudo}>
                <img
                  src={
                    "http://localhost:1337" +
                    post.attributes.capa_do_post.data?.attributes?.url
                  }
                  alt="imagem"
                />
                <div className={style.titulo_post}>

                  <div className={style.infor_post}>
                    <h2>{post.attributes.titulo}</h2>
                    <p id={style.data_post}>
                      {formataData(post.attributes.data_post)} -
                    </p>
                    <p id={style.nome_autor}>Postador por {post.attributes.autor_post}</p>
                  </div>

                  <p id={style.descricao_post}>{post.attributes.descricao}</p>
                  <button  onClick={() => handlePost(post.attributes.slug)}>
                    Ler mais{" "}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </article>
    </>
  );
};

export default Conteudos;
