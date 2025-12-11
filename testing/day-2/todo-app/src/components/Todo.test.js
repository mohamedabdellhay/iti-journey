import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo Component", () => {
  test("should render new todo after adding it", () => {
    render(<Todo />);

    // Find input and type a task
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    fireEvent.change(inputElement, { target: { value: "Buy milk" } });

    // Find add button and click
    const buttonElement = screen.getByText(/Add/i);
    fireEvent.click(buttonElement);

    // Check if the task is in the list
    const todoItem = screen.getByText("Buy milk");
    expect(todoItem).toBeInTheDocument();
  });
});
