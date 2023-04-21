import "../style/journalList.css";
import { useState } from "react";
import useJournals from "../hooks/useJournals";
import { useAuthToken } from "../AuthTokenContext";

export default function Journals() {
  // const [newItemText, setNewItemText] = useState("");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [newItemMovie, setNewItemMovie] = useState("");
  const [journalsItems, setJournalsItems] = useJournals();
  const { accessToken } = useAuthToken();

  async function insertJournal(title, content, movie) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
        movie: movie,
      }),
    });
    if (data.ok) {
      const journal = await data.json();
      return journal;
    } else {
      return null;
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newItemTitle || !newItemContent || !newItemMovie) return;

    const newJournal = await insertJournal(
      newItemTitle,
      newItemContent,
      newItemMovie
    );
    if (newJournal) {
      setJournalsItems([...journalsItems, newJournal]);
      // setNewItemText("");
      setNewItemTitle("");
      setNewItemContent("");
      setNewItemMovie("");
    }
  };

  return (
    <div className="journal-list">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="journal-form"
        autoComplete="off"
      >
        {/* <input
          type="text"
          name="item"
          id="item"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        /> */}

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Input title..."
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />

        <input
          type="text"
          name="content"
          id="content"
          placeholder="Input content..."
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
        />

        <input
          type="text"
          name="movie"
          id="movie"
          placeholder="Input the movie..."
          value={newItemMovie}
          onChange={(e) => setNewItemMovie(e.target.value)}
        />

        <button type="submit">+ Add Journal</button>
      </form>

      <ul className="list">
        {journalsItems.map((item) => {
          return (
            <li key={item.id} className="journal-item">
              <span className="itemName">{item.title}</span>
              <span className="itemContent">{item.content}</span>
              {/* add content */}
              <span className="itemMovie">{item.Movie}</span>
              {/* add movie name? */}
              <button aria-label={`Remove ${item.title}`} value={item.id}>
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
