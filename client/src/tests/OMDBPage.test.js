import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OMBDPage from "../components/OMBDPage";

test("renders search box and movie list", async () => {
  render(<OMBDPage />);

  const searchBox = screen.getByRole("textbox", { name: "Search movies" });
  const movieList = await screen.findByRole("list", { name: "Movies" });

  expect(searchBox).toBeInTheDocument();
  expect(movieList).toBeInTheDocument();
});

test("searches for movies when search value is entered", async () => {
  render(<OMBDPage />);

  const searchBox = screen.getByRole("textbox", { name: "Search movies" });

  fireEvent.change(searchBox, { target: { value: "Batman" } });

  await waitFor(() => {
    const movieItems = screen.getAllByRole("listitem");
    expect(movieItems.length).toBeGreaterThan(0);
  });
});
