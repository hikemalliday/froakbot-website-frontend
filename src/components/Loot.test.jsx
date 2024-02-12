import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Loot from "./Loot";

beforeEach(() => {
  const setActiveView = jest.fn();
  const lootFetchObject = {};
  lootFetchObject.getLootFetch = [{ itemName: "Fizz" }, { itemName: "Buzz" }];
  render(
    <Loot setActiveView={setActiveView} lootFetchObject={lootFetchObject} />
  );
});

jest.mock("../helper", () => ({
  setActiveViewState: jest.fn(),
}));

it("Renders the payload onto the screen", () => {
  const fizzElement = screen.getByText(/Fizz/);
  const buzzElement = screen.getByText(/Buzz/);

  expect(fizzElement).toBeInTheDocument();
  expect(buzzElement).toBeInTheDocument();
});

it("helper.setActiveViewState is called once", () => {
  expect(require("../helper").setActiveViewState).toHaveBeenCalled();
});

it("'Loading...' is not in the document, meaning we recieved a payload to render", () => {
  expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument();
});
