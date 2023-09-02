import React, { useEffect, useState } from "react";

export const useFetchPosts = () => {
  const [documents, setDocuments] = useState([]); //documentos do post
  const [loading,setloading] = useState(true) //estado de loading na pagina
  const [search,setSearch] = useState("")
  const [dispatch,setDispatch] = useState(true)
  const [notFound,setNotFound] = useState(false)
  const [cancelled, setCancelled] = useState(false); // memory leak

  const url = "https://strapi-production-36c0.up.railway.app/api/posts?populate=*"
  const urlSearch = `https://strapi-production-36c0.up.railway.app/api/posts?_q=${search}&populate=*`
  const authToken =
    "904f674dc5e3d2c9a3c62a09f30447eea5b6afe6c32e69ab91066529d93a6fcb3ba96d94142d59a7c59985284362769aa5f9ceea52e9c2476b5024d7386a2d3bcb9b824d8357e027512d52099244d2481cead7154e79cc7d327e367b014708aeffe683d43a4ae0b2be2473d1b40fcdbf9d97f4452ea4cfdce5f8e5895aab6515"

  const [config,setconfig] = useState(
    url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    }
  )

;

    // useEffect(() => {
    //   if(search){
    //    url = `https://strapi-production-36c0.up.railway.app/api/posts?_q=${search}&populate=*`
    //   }

    //   else{
    //     url = "https://strapi-production-36c0.up.railway.app/api/posts?populate=*"
    //   }
    // },[search,documents])

    const requisicao = (tipo) => {
      if(tipo==="search"){
        setconfig(urlSearch, {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        })
      }
      else if(tipo="inicio"){
        setconfig(url, {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        })
      }
  
    }


    useEffect(() => {
      async function fetchDocuments() {
        setloading(true)
        try {
          const response = await fetch(config);
          setloading(false)
          const data = await response.json();
          console.log(response.url)
          if(data.data.length >=1 ){
            setDocuments(data);
            setNotFound(false)
          }
  
          else{
            setDocuments("")
            setNotFound(true)
          }
        } catch (error) {
          setloading(false)
          console.log(error.massage);
          setNotFound(true)
        }
  
      }

      fetchDocuments()
    },[search,config])
    


    

  useEffect(() => {
    return () => setCancelled(true);
  }, [search]);

  return { documents,loading,notFound,setSearch,search,setDispatch,dispatch,requisicao
    
  };
};
