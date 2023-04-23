import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";

test("renders the journal list", async () => {
  render(<Home />);

  // Wait for the journals to load
  const items = await screen.findAllByRole("listitem");

  // Check that the list contains at least one item
  expect(items.length).toBeGreaterThan(0);
});

// test("adds a new journal item", async () => {
//   render(<Home />);

//   // Fill out the form
//   const titleInput = screen.getByLabelText("Title:");
//   const contentInput = screen.getByLabelText("Content:");
//   const movieInput = screen.getByLabelText("Movie:");
//   const submitButton = screen.getByRole("button", { name: "Add" });

//   fireEvent.change(titleInput, { target: { value: "My Journal" } });
//   fireEvent.change(contentInput, { target: { value: "This is my journal." } });
//   fireEvent.change(movieInput, { target: { value: "My Movie" } });
//   fireEvent.click(submitButton);

//   // Wait for the new item to appear in the list
//   const newItem = await screen.findByText("My Journal");

//   // Check that the new item is in the list
//   expect(newItem).toBeInTheDocument();
// });

// test("deletes a journal item", async () => {
//   render(<Home />);

//   // Wait for the journals to load
//   const items = await screen.findAllByRole("listitem");

//   // Check that the list contains at least one item
//   expect(items.length).toBeGreaterThan(0);

//   // Delete the first item
//   const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
//   fireEvent.click(deleteButton);

//   // Wait for the item to be removed from the list
//   await screen.findByRole("listitem", { name: /ID: \d+/ }, { timeout: 500 });

//   // Check that the first item is no longer in the list
//   const remainingItems = await screen.findAllByRole("listitem");
//   expect(remainingItems.length).toEqual(items.length - 1);
// });

// test("updates a journal item", async () => {
//   render(<Home />);

//   // Wait for the journals to load
//   const items = await screen.findAllByRole("listitem");

//   // Check that the list contains at least one item
//   expect(items.length).toBeGreaterThan(0);

//   // Update the first item
//   const detailsButton = screen.getAllByRole("button", { name: "Details" })[0];
//   fireEvent.click(detailsButton);

//   // Enter new content for the item
//   const contentInput = screen.getByLabelText("New Content:");
//   const saveButton = screen.getByRole("button", { name: "Save" });

//   fireEvent.change(contentInput, {
//     target: { value: "This is my updated journal." },
//   });
//   fireEvent.click(saveButton);

//   // Wait for the item to be updated in the list
//   await screen.findByText("This is my updated journal.");

//   // Check that the first item has the updated content
//   const updatedItem = await screen.findByText("This is my updated journal.");
//   expect(updatedItem).toBeInTheDocument();
// });
