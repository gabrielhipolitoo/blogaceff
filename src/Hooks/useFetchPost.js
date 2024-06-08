import React, { useEffect, useState } from "react";

export const useFetchPost = (slug) => {
  const [documents, setDocuments] = useState([]);
  const [cancelled, setCancelled] = useState(false);

  const url = process.env.REACT_APP_URL+"/api/posts/"+slug

  const authToken = process.env.REACT_APP_AUTH_TOKEN


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
