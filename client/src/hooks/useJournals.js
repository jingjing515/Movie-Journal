import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useJournals() {
  const [journalsItems, setJournalsItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getJournalsFromApi() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/journals`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const journals = await data.json();

      setJournalsItems(journals);
    }

    if (accessToken) {
      getJournalsFromApi();
    }
  }, [accessToken]);

  return [journalsItems, setJournalsItems];
}
