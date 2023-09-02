import React, { useEffect, useState } from "react";

export const useFetchPosts = () => {
  const [documents, setDocuments] = useState([]); //documentos do post
  const [loading,setloading] = useState(true) //estado de loading na pagina
  const [search,setSearch] = useState("")
  const [dispatch,setDispatch] = useState(true)
  const [notFound,setNotFound] = useState(false)
  const [cancelled, setCancelled] = useState(false); // memory leak

  // const url = "https://strapi-production-36c0.up.railway.app/api/posts?populate=*"
  const url = process.env.REACT_APP_URL
  const endpoint= `/api/posts?_q=${search}&populate=*`
  const urlSearch = process.env.REACT_APP_URL_SEARCH+endpoint

  const authToken = process.env.REACT_APP_TOKEN

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
