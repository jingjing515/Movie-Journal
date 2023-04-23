import "../style/journalList.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import useJournals from "../hooks/useJournals";
import { useAuthToken } from "../AuthTokenContext";
import "../style/appLayout.css";
import "../style/home.css";
import "../style/list.css";

export default function Home() {
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
        id
      }),
    });
    setJournalsItems((current) =>
    current.filter((item) => item.id !== id)
  );
 
  };

  const handleDetails = async (item) => {
    const newContent = window.prompt("Current content: \n"+item.content +"\n New Content");
    //window.open('childcomponent.js','Data','height=250,width=250');
    if (newContent) {
      const data = await fetch(`http://localhost:8000/journal`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id:item.id,
          content: newContent
        }),
      });
      if (data.ok) {

        window.location.reload(false);
  
      } else {
        console.error("Failed to update user name");
      }
    }
  };


  return (
    
    <div >

      <div class="header">
      <h3>My Movie Journal</h3>
  </div>

<div class="row">
  <div class="leftcolumn">

    <div class="card">
      <h2>Trending Journals</h2>
      <h5>Updated at, Apr 23, 2023</h5>

      <ul className="list">
        {journalsItems.map((item) => {
          return (
            <li data-emoji="😁" key={item.id}>
               <span className="itemId">ID: {item.id} </span><br/>
              <span className="itemName">Title: {item.title}</span><br/>
              <span className="itemContent">{item.content}</span><br/>
              <span className="itemMovie">{item.movie}</span><br/>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
  <div class="rightcolumn">

    <div class="card">
      <Link to="/app/login">Read More</Link>
      {/* <h3>Follow Me</h3>
      <p>Some text..</p> */}
    </div>
  </div>
</div>


    </div>
  );
}
