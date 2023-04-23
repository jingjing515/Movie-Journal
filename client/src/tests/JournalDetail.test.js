import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import JournalDetail from "../components/JournalDetail";

jest.mock("react-router-dom");
jest.mock("../AuthTokenContext");

test("renders journal details", async () => {
  useParams.mockReturnValue({ journalId: "123" });
  useAuthToken.mockReturnValue({ accessToken: "mock-access-token" });

  const mockJournal = {
    title: "Mock Journal Title",
    content: "Mock journal content",
    movie: "Mock movie title",
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockJournal),
    })
  );

  render(<JournalDetail />);

  const titleElement = await screen.findByText("Title: Mock Journal Title");
  const contentElement = await screen.findByText(
    "Content: Mock journal content"
  );
  const movieElement = await screen.findByText("Movie: Mock movie title");

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
  expect(movieElement).toBeInTheDocument();

  //   expect(screen.getByText("Title: Mock Journal Title")).toBeInTheDocument();
  //   expect(screen.getByText("Content: Mock journal content")).toBeInTheDocument();
  //   expect(screen.getByText("Movie: Mock movie title")).toBeInTheDocument();
});
