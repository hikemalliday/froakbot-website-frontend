import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Characters from "./Characters";

jest.mock("../helper", () => ({
  setActiveViewState: jest.fn(),
}));

beforeEach(() => {
  const setActiveView = jest.fn();
  const charactersFetchObject = {};
  charactersFetchObject.getCharactersFetch = [
    { charName: "Fizz" },
    { charName: "Buzz" },
  ];
  render(
    <Characters
      setActiveView={setActiveView}
      charactersFetchObject={charactersFetchObject}
    />
  );
});

it("Renders payload onto the screen", () => {
  const fizzElement = screen.getByText(/Fizz/);
  const buzzElement = screen.getByText(/Buzz/);

  expect(fizzElement).toBeInTheDocument();
  expect(buzzElement).toBeInTheDocument();
});

it("helper.stateActiveViewState is called once", async () => {
  expect(require("../helper").setActiveViewState).toHaveBeenCalled();
});

it("'Loading...' is not in the document, meaning we recieved a payload to render", () => {
  expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
});
