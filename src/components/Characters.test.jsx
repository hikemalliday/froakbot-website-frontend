import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Characters from "./Characters";

beforeEach(() => {
  const charactersFetchObject = {};
  charactersFetchObject.fetchCharacters = jest.fn(); // Mock the fetchCharacters function
  charactersFetchObject.getCharactersFetch = [
    { charName: "Fizz" },
    { charName: "Buzz" },
  ];
  render(<Characters charactersFetchObject={charactersFetchObject} />);
});

it("Renders payload onto the screen", () => {
  const fizzElement = screen.getByText(/Fizz/);
  const buzzElement = screen.getByText(/Buzz/);

  expect(fizzElement).toBeInTheDocument();
  expect(buzzElement).toBeInTheDocument();
});

it("'Results not found.' is not in the document, meaning we received a payload to render", () => {
  expect(screen.queryByText(/Results not found./)).not.toBeInTheDocument();
});
