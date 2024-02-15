import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Loot from "./Loot";

beforeEach(() => {
  const lootFetchObject = {};
  lootFetchObject.getLootFetch = [{ itemName: "Fizz" }, { itemName: "Buzz" }];
  lootFetchObject.fetchLoot = jest.fn();
  render(<Loot lootFetchObject={lootFetchObject} />);
});

it("Renders the payload onto the screen", () => {
  const fizzElement = screen.getByText(/Fizz/);
  const buzzElement = screen.getByText(/Buzz/);

  expect(fizzElement).toBeInTheDocument();
  expect(buzzElement).toBeInTheDocument();
});

it("'Results not found.' is not in the document, meaning we received a payload to render", () => {
  expect(screen.queryByText(/Results not found./)).not.toBeInTheDocument();
});
