import {useParams} from 'react-router-dom';
import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function JournalDetail() {
  // return <div>JournalDetail</div>;

  const { accessToken } = useAuthToken();
  const params = useParams();
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [newItemMovie, setNewItemMovie] = useState("");

  console.log(params); // 👉️ {userId: '4200'}

  useEffect(() => {
    async function getJournalFromApi() {
      const data = await fetch(`http://localhost:8000/journal/` + params.journalId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const journal = await data.json();
      console.log(journal)
      //setJournalItem(journal);

      setNewItemTitle(journal.title);
      setNewItemContent(journal.content);
      setNewItemMovie(journal.movie);
    }

    if (accessToken) {
      getJournalFromApi();
    }
  }, [accessToken]);

  return (
    <div>
      <div>
        <h2>Title: {newItemTitle}</h2><br/>
      </div>
      <div><body>Content: {newItemContent}</body></div>
      <div><body>Movie: {newItemMovie}</body></div>
   </div>

  );
}
