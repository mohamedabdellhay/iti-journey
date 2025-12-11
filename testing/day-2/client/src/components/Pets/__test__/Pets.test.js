/* eslint-disable jest/valid-title */
import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import Pets from "../Pets";
import { rest } from "msw";
import mockedCats from "../../../mocks/cats.json";
import userEvent from "@testing-library/user-event";
import Card from "../../Card/Card";

// mocking//facking
const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedCats));
  })
);

describe("Test Pets component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Test Initial Component render", async () => {
    render(<Pets />);
    let catCards = await screen.findAllByRole("article");
    expect(catCards.length).toBe(5);
  });

  test("Test render after Gender Filter", async () => {
    render(<Pets />);
    let catCards = await screen.findAllByRole("article");
    // userEvent.selectOptions(screen.getByLabelText(/Gender/i),'male')
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "male" },
    });
    expect(screen.getAllByRole("article").length).toBe(2);
    expect(screen.getAllByRole("article")).toStrictEqual([
      catCards[1],
      catCards[3],
    ]);
  });

  test("Test render after Favoured Filter", async () => {
    render(<Pets />);
    let catCards = await screen.findAllByRole("article");

    userEvent.selectOptions(screen.getByLabelText(/Favourite/i), "favoured");
    expect(screen.getAllByRole("article").length).toBe(2);
    expect(screen.getAllByRole("article")).toStrictEqual([
      catCards[0],
      catCards[1],
    ]);

    userEvent.selectOptions(
      screen.getByLabelText(/Favourite/i),
      "not favoured"
    );
    expect(screen.getAllByRole("article").length).toBe(3);
    expect(screen.getAllByRole("article")).toStrictEqual([
      catCards[2],
      catCards[3],
      catCards[4],
    ]);
  });
});
