import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Raids from "./Raids";

jest.mock("../helper", () => ({
  setActiveViewState: jest.fn(),
}));

beforeEach(() => {
  const setActiveView = jest.fn();
  const raidsFetchObject = {};
  raidsFetchObject.getRaidsFetch = [
    { raidName: "Fizz", raidId: 1, raidDate: "09-01-1987" },
    { raidName: "Buzz", raidId: 2, raidDate: "09-01-1987" },
  ];
  render(
    <Raids setActiveView={setActiveView} raidsFetchObject={raidsFetchObject} />,
  );
});

it("Renders payload onto the screen", () => {
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
