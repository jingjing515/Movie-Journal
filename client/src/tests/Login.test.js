import { render, screen, fireEvent } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

test("renders login and signup buttons", () => {
  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
  });

  render(<Login />);

  const loginButton = screen.getByRole("button", { name: "Login" });
  const signUpButton = screen.getByRole("button", { name: "Create Account" });

  expect(loginButton).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test("clicking login button calls loginWithRedirect", () => {
  const loginWithRedirect = jest.fn();
  useAuth0.mockReturnValue({
    isAuthenticated: false,
    loginWithRedirect: loginWithRedirect,
  });

  render(<Login />);

  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);

  expect(loginWithRedirect).toHaveBeenCalledTimes(1);
});

test("renders enter app button when authenticated", () => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
  });
  useNavigate.mockReturnValue(jest.fn());

  render(<Login />);

  const enterAppButton = screen.getByRole("button", { name: "Enter App" });

  expect(enterAppButton).toBeInTheDocument();
});

test("clicking enter app button calls navigate", () => {
  const navigate = jest.fn();
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
  });
  useNavigate.mockReturnValue(navigate);

  render(<Login />);

  const enterAppButton = screen.getByRole("button", { name: "Enter App" });
  fireEvent.click(enterAppButton);

  expect(navigate).toHaveBeenCalledTimes(1);
});
