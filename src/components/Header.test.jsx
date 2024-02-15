import React from "react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

beforeEach(() => {
  const modalObject = {};
  const entireFetchObject = {};

  render(
    <Router>
      <Header modalObject={modalObject} entireFetchObject={entireFetchObject} />
    </Router>,
  );
});

it("Checks that 'FILTERS' dropdown exists when we mouseOver 'RAIDS'", () => {
  const raidsLink = screen.getByText(/RAIDS/);
  fireEvent.mouseOver(raidsLink);
  const filtersLink = screen.getByText(/FILTERS/);
  expect(filtersLink).toBeInTheDocument();
});
