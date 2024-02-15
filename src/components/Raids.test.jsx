import { screen, render } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import Raids from "./Raids";

beforeEach(() => {
  const raidsFetchObject = {};
  raidsFetchObject.fetchRaids = jest.fn();
  raidsFetchObject.getRaidsFetch = [
    {
      raidName: "Fizz",
      raidId: 1,
      raidDate: "09-01-1987",
      usernames: ["fizz", "buzz"],
      loot: ["fizz", "buzz"],
    },
    {
      raidName: "Buzz",
      raidId: 2,
      raidDate: "09-01-1987",
      usernames: ["fizz", "buzz"],
      loot: [],
    },
  ];
  render(<Raids raidsFetchObject={raidsFetchObject} />);
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
