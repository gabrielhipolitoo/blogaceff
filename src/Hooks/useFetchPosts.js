import React, { useEffect, useState } from "react";

export const useFetchPosts = () => {
  const [documents, setDocuments] = useState([]); //documentos do post
  const [loading,setloading] = useState(true) //estado de loading na pagina
  const [search,setSearch] = useState("")
  const [dispatch,setDispatch] = useState(true)
  const [notFound,setNotFound] = useState(false)
  const [cancelled, setCancelled] = useState(false); // memory leak

  let url = "http://192.168.100.79:1337/api/posts?populate=*"

  const authToken =
    "661b6593d83bf765b5ebedf9ce92b4a120ac11301b6612547607c216c361cf806027e3d484ec6c31b9c4232a05a601991538181560692434c9892404c97ce894c7d595a37c18083f706a410c19768ab91d7a26cfec195941becedd929fbddec19525d7c22a6c8d097119c2ce63a2d27670552eaecea4c5de62684f62d81511c7";

    useEffect(() => {
      if(search){
       url = `http://192.168.100.79:1337/api/posts?_q=${search}&populate=*`
      }

      else{
        url = "http://192.168.100.79:1337/api/posts?populate=*"
       
      }
    },[search,documents])

    async function fetchDocuments() {


      setloading(true)
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        });
        setloading(false)
        const data = await response.json();
        console.log(data)
        if(data.data.length >=1 ){
          setDocuments(data);
          console.log('teste')
          setNotFound(false)
          console.log(data.data.length)
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

  useEffect(() => {
    fetchDocuments()
    return () => setCancelled(true);
  }, [search]);

  return { documents,loading,notFound,setSearch,search,setDispatch,dispatch,
    fetchDocuments
  };
};
