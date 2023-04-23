import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import Profile from "../components/Profile";

jest.mock("@auth0/auth0-react");
jest.mock("../AuthTokenContext");

test("renders user name and email", () => {
  useAuth0.mockReturnValue({
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      picture: "https://example.com/avatar.jpg",
    },
  });
  useAuthToken.mockReturnValue({ accessToken: "mock-access-token" });

  render(<Profile />);

  //   const nameElement = screen.getByText("Name:");
  //   const emailElement = screen.getByText("Email:");
  const nameElement = screen.getByText(/Name: John Doe/);
  const emailElement = screen.getByText(/Email: john.doe@example.com/);

  expect(nameElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
});

// test("clicking edit name button prompts for new name", () => {
//   useAuth0.mockReturnValue({
//     user: {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       picture: "https://example.com/avatar.jpg",
//     },
//   });
//   useAuthToken.mockReturnValue({ accessToken: "mock-access-token" });

//   render(<Profile />);

//   const editNameButton = screen.getByRole("button", { name: "Edit Name" });
//   fireEvent.click(editNameButton);

//   const prompt = screen.getByText("Enter your new user name");
//   expect(prompt).toBeInTheDocument();
// });

// test("updating name changes displayed name", () => {
//   useAuth0.mockReturnValue({
//     user: {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       picture: "https://example.com/avatar.jpg",
//     },
//   });
//   useAuthToken.mockReturnValue({ accessToken: "mock-access-token" });

//   render(<Profile />);

//   const editNameButton = screen.getByRole("button", { name: "Edit Name" });
//   fireEvent.click(editNameButton);

//   const prompt = screen.getByText("Enter your new user name");
//   // eslint-disable-next-line testing-library/no-node-access
//   const input = prompt.querySelector("input");
//   fireEvent.change(input, { target: { value: "Jane Doe" } });

//   // eslint-disable-next-line testing-library/no-node-access
//   const okButton = prompt.querySelector("button");
//   fireEvent.click(okButton);

//   const nameElement = screen.getByText("Name: Jane Doe");
//   expect(nameElement).toBeInTheDocument();
// });
