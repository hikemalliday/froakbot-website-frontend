import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LootCard from "./LootHomepageCard";

beforeEach(() => {
  render(
    <MemoryRouter>
      <LootCard />
    </MemoryRouter>
  );
});

it("'Loot' text is in the document", () => {
  const lootDiv = screen.getByText(/Loot/);
  expect(lootDiv).toBeInTheDocument();
});

it("Card element should have 3 event listeners", () => {
  const cardElement = document.getElementById("loot-card");
  expect(cardElement.onmousedown).toBeDefined();
  expect(cardElement.onmouseup).toBeDefined();
  expect(cardElement.onmouseout).toBeDefined();
});

it("Element by id 'loot-card' gains class 'active' on mousedown", async () => {
  const lootCardElement = document.getElementById("loot-card");
  fireEvent.mouseDown(lootCardElement);
  expect(lootCardElement.classList.contains("active")).toBe(true);
});
