import React, { useEffect, useState } from "react";
import  "../assets/css/conteudo.css";
import { useFetchPosts } from "../Hooks/useFetchPosts";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Componentes/Header";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Conteudos = () => {
  const { documents, loading, notFound, setSearch, search,requisicao} = useFetchPosts(); //json da api
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
      requisicao('search')
      navigate("/search?q=" + search)
  }


  useEffect(() => {
    if(!search){
      navigate('/')
      requisicao('inicio')
    }
  },[search])

  const formataData = (data, locale = "en-GB") => {
    return new Date(data).toLocaleDateString(locale);
  };

  // fim funções 
  return (
    <>
      <Header />

      <article className={"container_conteudos"}>
        <form>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            name=""
            id={"search"}
            placeholder="Pesquise..."
          />
          <button onClick={handleSubmit}  id={"submitForm"} type="submit">
          <FontAwesomeIcon fontSize="3rem" icon={faMagnifyingGlass} />
          </button>
        </form>
        <h1 id={"titulo_principal"}>Posts recentes</h1>
        {loading && <p id={"loading"}>Carregando</p>}
        {notFound && <p id={"loading"}>Nenhuma postagem...</p>}
        <div className={"flex_conteudos"}>
          {reversedPosts &&
            reversedPosts.map((post) => (
              <div className={"conteudo"}>
                <img
                  src={
                    post.attributes.capa_do_post.data?.attributes?.url
                  }
                  alt="imagem"
                />
                <div className={"titulo_post"}>

                  <div className={"infor_post"}>
                    <h2>{post.attributes.titulo}</h2>
                    <p id={"data_post"}>
                      {formataData(post.attributes.data_post)} -
                    </p>
                    <p id={"nome_autor"}>Postador por {post.attributes.autor_post}</p>
                  </div>

                  <p id={"descricao_post"}>{post.attributes.descricao}</p>
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
