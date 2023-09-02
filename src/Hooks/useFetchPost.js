import React, { useEffect, useState } from "react";

export const useFetchPost = (slug) => {
  const [documents, setDocuments] = useState([]);
  const [cancelled, setCancelled] = useState(false);

  const endpoint = slug
  const url = "http://localhost:1337/api/posts/"+endpoint

  const authToken =
    "d0f8a42a6bb7a5e2dcd06c5ccf2f1b2dc7331d3de7cd40c6310a0d004c4aecbc7277805a450c5c987eb6b89e99445cc9053961ba8cd108a56084d8d72e1a47b12c814053ba4e2f5c520b5c691d6a22495dc5cfcc5e2d23f9b060937d9113e224dd70abdf542abf328ef72a8ac1ae3c29cdd501bc2d3a68db253e51e6323760bf";

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
