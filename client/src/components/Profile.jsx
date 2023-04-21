import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function Profile() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();
  const [name, setName] = useState(user.name);

  const handleNameChange = async () => {
    const newName = window.prompt("Enter your new user name", name);
    if (newName) {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/app`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: newName,
        }),
      });
      if (data.ok) {
        setName(newName);
      } else {
        console.error("Failed to update user name");
      }
    }
  };

  // const handleNameChange = () => {
  //   const newName = window.prompt("Enter your new user name", name);
  //   if (newName) {
  //     setName(newName);
  //   }
  // };

  return (
    <div>
      <div>
        <p>Name: {name}</p>
      </div>

      <div>
        <img src={user.picture} width="70" alt="profile avatar" />
      </div>
      <div>
        <p>📧 Email: {user.email}</p>
        <button onClick={handleNameChange}>Edit Name</button>
      </div>

      {/* <div>
        <p>🔑 Auth0Id: {user.sub}</p>
      </div> */}
      {/* <div>
        <p>✅ Email verified: {user.email_verified?.toString()}</p>
      </div> */}
    </div>
  );
}
