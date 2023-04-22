import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useJournals() {
  const [journalsItems, setJournalsItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getJournalsFromApi() {
      const data = await fetch(`http://localhost:8000/journals`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const journals = await data.json();
      console.log(journals);
      setJournalsItems(journals);
    }

    if (accessToken) {
      getJournalsFromApi();
    }
  }, [accessToken]);

  return [journalsItems, setJournalsItems];
}
