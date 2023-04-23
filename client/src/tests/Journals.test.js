import { render, screen, fireEvent } from "@testing-library/react";
import Journals from "../components/Journals";

// Mock the useJournals hook
jest.mock("../hooks/useJournals", () => () => [[], jest.fn()]);

// Mock the useAuthToken hook
jest.mock("../AuthTokenContext", () => ({
  useAuthToken: () => ({
    accessToken: "fakeAccessToken",
  }),
}));

describe("Journals", () => {
  it("should render the form and list of journals", () => {
    render(<Journals />);
    expect(screen.getByPlaceholderText("Input title...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Input content...")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Input the movie...")
    ).toBeInTheDocument();
    expect(screen.getByText("+ Add Journal")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
