import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CharactersCard from "./CharactersHomepageCard";

beforeEach(() => {
  render(
    <MemoryRouter>
      <CharactersCard />
    </MemoryRouter>,
  );
});

it("'Characters' text is in the document", () => {
  const charactersDiv = screen.getByText(/Characters/);
  expect(charactersDiv).toBeInTheDocument();
});

it("Card element should have 3 event listeners", () => {
  const card = document.getElementById("characters-card");
  expect(card.onmousedown).toBeDefined();
  expect(card.onmouseup).toBeDefined();
  expect(card.onmouseout).toBeDefined();
});

it("Element by id 'characters-card' gains class 'active' on mousedown", () => {
  const charactersCardElement = document.getElementById("characters-card");
  fireEvent.mouseDown(charactersCardElement);
  expect(charactersCardElement.classList.contains("active")).toBe(true);
});
