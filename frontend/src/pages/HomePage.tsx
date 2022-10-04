import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

interface Note {
  body: string;
  id: number;
}

const HomePage = () => {
  const { user, AuthTokens, LogoutUser } = useContext(AuthContext);
  const [Notes, setNotes] = useState([]);

  const GetNotes = async () => {
    const url = "http://127.0.0.1:8000/api/notes/";

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(AuthTokens.access),
      },
    });

    let data = await response.json();
    if (response.ok) setNotes(data);
    else if (response.statusText === "Unauthorized") LogoutUser();
  };

  useEffect(() => {
    GetNotes();
  }, []);

  return (
    <div className='homepage-container container'>
      <h3>Notes for {user.username}</h3>
      <ul>
        {Notes.map((note: Note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
