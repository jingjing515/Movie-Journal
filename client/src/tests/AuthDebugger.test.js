import { render, screen } from "@testing-library/react";
import AuthDebugger from "../components/AuthDebugger";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

jest.mock("@auth0/auth0-react");
jest.mock("../AuthTokenContext");
const mockUser = {
  name: "Jin Ma",
  email: "jinma@example.com",
};

const mockAccessToken = "abc123";

useAuth0.mockReturnValue({
  user: mockUser,
});

useAuthToken.mockReturnValue({
  accessToken: mockAccessToken,
});

test("renders user info and access token", () => {
  render(<AuthDebugger />);
  const userInfoElement = screen.getByText(/User Info/i);
  const accessTokenElement = screen.getByText(/Access Token/i);
  expect(userInfoElement).toBeInTheDocument();
  expect(accessTokenElement).toBeInTheDocument();
});
