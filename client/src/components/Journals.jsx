import "../style/journalList.css";

import { useState } from "react";
import useJournals from "../hooks/useJournals";
import { useAuthToken } from "../AuthTokenContext";

export default function Journals() {
  const [newItemText, setNewItemText] = useState("");
  const [journalsItems, setJournalsItems] = useJournals();
  const { accessToken } = useAuthToken();

  async function insertJournal(title) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/journals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: title,
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

    if (!newItemText) return;

    const newJournal = await insertJournal(newItemText);
    if (newJournal) {
      setJournalsItems([...journalsItems, newJournal]);
      setNewItemText("");
    }
  };

  return (
    <div className="journal-list">
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="journal-form"
        autoComplete="off"
      >
        <input
          type="text"
          name="item"
          id="item"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
        />
        <button type="submit">+ Add Item</button>
      </form>

      <ul className="list">
        {journalsItems.map((item) => {
          return (
            <li key={item.id} className="journal-item">
              <input
                onChange={(e) => console.log(e.target)}
                value={item.id}
                type="checkbox"
                checked={item.completed}
              />
              <span className="itemName">{item.title}</span>
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
