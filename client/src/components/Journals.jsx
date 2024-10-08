import "../style/journalList.css";
import { useState } from "react";
import useJournals from "../hooks/useJournals";
import { useAuthToken } from "../AuthTokenContext";
import "../style/appLayout.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Journals() {
  const { user, isAuthenticated } = useAuth0();

  // const [name, setName] = useState("");

  // useEffect(() => {
  //   if (user && user.name) {
  //     setName(user.name);
  //   }
  // }, [user]);

  // const [newItemText, setNewItemText] = useState("");
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [newItemMovie, setNewItemMovie] = useState("");
  const [journalsItems, setJournalsItems] = useJournals();
  const { accessToken } = useAuthToken();

  async function insertJournal(title, content, movie) {
    const data = await fetch(`http://localhost:8000/journal`, {
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

      setNewItemTitle("");
      setNewItemContent("");
      setNewItemMovie("");
    }
  };

  const handleDelete = async (id) => {
    const data = await fetch(`http://localhost:8000/journal`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id,
      }),
    });
    setJournalsItems((current) => current.filter((item) => item.id !== id));
  };

  const handleDetails = async (item) => {
    const newContent = window.prompt(
      "Current content: \n" + item.content + "\n New Content"
    );
    //window.open('childcomponent.js','Data','height=250,width=250');
    if (newContent) {
      const data = await fetch(`http://localhost:8000/journal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id: item.id,
          content: newContent,
        }),
      });
      if (data.ok) {
        window.location.reload(false);
      } else {
        console.error("Failed to update journal details");
      }
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="journal-list">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="journal-form"
            autoComplete="off"
          >
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

            <button className="button" type="submit">
              + Add Journal
            </button>
          </form>

          <ul className="list">
            {journalsItems.map((item) => {
              return (
                <li key={item.id} className="journal-item">
                  <span className="itemId">ID: {item.id}</span>
                  <span className="itemName">Title: {item.title}</span>
                  {/* <span className="itemContent">{item.content}</span> */}
                  {/* <span className="itemMovie">{item.movie}</span> */}
                  <button
                    aria-label={`Remove ${item.title}`}
                    value={item.id}
                    onClick={(e) => handleDelete(item.id)}
                  >
                    X
                  </button>
                  <button onClick={(e) => handleDetails(item)}>
                    Show Content & Modify
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <span>Please log in to access this page.</span>
      )}
    </>
  );
}
