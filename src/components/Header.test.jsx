import React from "react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

it("Checks that 'FILTERS' link is visible because 'activeView' != 'home'", () => {
  const modalObject = {};
  const entireFetchObject = {};
  const activeView = "test";

  render(
    <Router>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
    </Router>
  );

  expect(screen.getByText(/FILTERS/)).toBeInTheDocument();
});

it("Checks that 'FILTERS' link is NOT visible because 'activeView' == 'home", () => {
  const modalObject = {};
  const entireFetchObject = {};
  const activeView = "home";

  render(
    <Router>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
    </Router>
  );

  expect(screen.queryByText(/FILTERS/)).not.toBeInTheDocument();
});

it("Checks that 'openModal' is called when 'FILTERS' is clicked and 'activeView' == 'characters'", () => {
  const modalObject = {
    setIsOpenRaidFiltersModal: jest.fn(),
    setIsOpenLootFiltersModal: jest.fn(),
    setIsOpenCharactersFiltersModal: jest.fn(),
  };
  const entireFetchObject = {};
  const activeView = "characters";

  render(
    <Router>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
    </Router>
  );

  const filtersLink = screen.getByText(/FILTERS/);
  fireEvent.click(filtersLink);

  expect(modalObject.setIsOpenCharactersFiltersModal).toHaveBeenCalled();
});

it("Checks that 'openModal' is called when 'FILTERS' is clicked and 'activeView' == 'raids'", () => {
  const modalObject = {
    setIsOpenRaidFiltersModal: jest.fn(),
    setIsOpenLootFiltersModal: jest.fn(),
    setIsOpenCharactersFiltersModal: jest.fn(),
  };
  const entireFetchObject = {};
  const activeView = "raids";

  render(
    <Router>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
    </Router>
  );

  const filtersLink = screen.getByText(/FILTERS/);
  fireEvent.click(filtersLink);

  expect(modalObject.setIsOpenRaidFiltersModal).toHaveBeenCalled();
});

it("Checks that 'openModal' is called when 'FILTERS' is clicked and 'activeView' == 'loot'", () => {
  const modalObject = {
    setIsOpenRaidFiltersModal: jest.fn(),
    setIsOpenLootFiltersModal: jest.fn(),
    setIsOpenCharactersFiltersModal: jest.fn(),
  };
  const entireFetchObject = {};
  const activeView = "loot";

  render(
    <Router>
      <Header
        modalObject={modalObject}
        entireFetchObject={entireFetchObject}
        activeView={activeView}
      />
    </Router>
  );

  const filtersLink = screen.getByText(/FILTERS/);
  fireEvent.click(filtersLink);

  expect(modalObject.setIsOpenLootFiltersModal).toHaveBeenCalled();
});
