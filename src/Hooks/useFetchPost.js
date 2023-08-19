import React, { useEffect, useState } from "react";

export const useFetchPost = (slug) => {
  const [documents, setDocuments] = useState([]);
  const [cancelled, setCancelled] = useState(false);

  const endpoint = slug
  const url = "http://192.168.100.79:1337/api/posts/"+endpoint

  const authToken =
    "661b6593d83bf765b5ebedf9ce92b4a120ac11301b6612547607c216c361cf806027e3d484ec6c31b9c4232a05a601991538181560692434c9892404c97ce894c7d595a37c18083f706a410c19768ab91d7a26cfec195941becedd929fbddec19525d7c22a6c8d097119c2ce63a2d27670552eaecea4c5de62684f62d81511c7";

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.log(error.massage);
      }
    }

    fetchDocuments();
  }, []);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents };
};
