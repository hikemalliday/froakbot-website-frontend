import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RaidsCard from "./RaidsHomepageCard";

beforeEach(() => {
  render(
    <MemoryRouter>
      <RaidsCard />
    </MemoryRouter>
  );
});
it("'Raids' text is in the document", () => {
  const raidsDiv = screen.getByText(/Raids/);
  expect(raidsDiv).toBeInTheDocument();
});

it("Card element should have 3 event listeners", () => {
  const cardElement = document.getElementById("raid-card");
  expect(cardElement.onmousedown).toBeDefined();
  expect(cardElement.onmouseup).toBeDefined();
  expect(cardElement.onmouseout).toBeDefined();
});

it("Element by id 'raid-card' gains class 'active' on mousedown", () => {
  const raidCardElement = document.getElementById("raid-card");
  fireEvent.mouseDown(raidCardElement);
  expect(raidCardElement.classList.contains("active")).toBe(true);
});
