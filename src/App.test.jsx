import App from "./App";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("./fetches", () => ({
  getCharacters: jest.fn(),
  getRaids: jest.fn(),
  getLoot: jest.fn(),
}));

beforeEach(() => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
});

it("calls fetch functions in useEffect", async () => {
  await waitFor(() => {
    expect(require("./fetches").getCharacters).toHaveBeenCalled();
    expect(require("./fetches").getRaids).toHaveBeenCalled();
    expect(require("./fetches").getLoot).toHaveBeenCalled();
  });
});

it("renders 'FILTERS when 'CharactersHomepageCard' is clicked, then hides it again when 'FROKBOT' logo/link is clicked", () => {
  const charactersHomepageCard = document.getElementById("characters-card");
  const froakbotLink = screen.getByText(/FROAKBOT/);
  act(() => {
    charactersHomepageCard.click();
  });
  const filtersLink = screen.getByText(/FILTERS/);
  expect(filtersLink).toBeInTheDocument();

  act(() => {
    froakbotLink.click();
  });
  expect(filtersLink).not.toBeInTheDocument();
});

it("renders 'FILTERS when 'LootHomepageCare' is clicked", () => {
  const charactersHomepageCard = document.getElementById("loot-card");
  const froakbotLink = screen.getByText(/FROAKBOT/);

  act(() => {
    charactersHomepageCard.click();
  });
  const filtersLink = screen.getByText(/FILTERS/);
  expect(filtersLink).toBeInTheDocument();

  act(() => {
    froakbotLink.click();
  });
  expect(filtersLink).not.toBeInTheDocument();
});

it("renders 'FILTERS when 'RaidsHomepageCard' is clicked", () => {
  const charactersHomepageCard = document.getElementById("raid-card");
  const froakbotLink = screen.getByText(/FROAKBOT/);

  act(() => {
    charactersHomepageCard.click();
  });
  const filtersLink = screen.getByText(/FILTERS/);
  expect(filtersLink).toBeInTheDocument();

  act(() => {
    froakbotLink.click();
  });
  expect(filtersLink).not.toBeInTheDocument();
});
