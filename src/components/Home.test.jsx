import Home from "./Home";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as React from "react";
import CharactersHomepageCard from "./cards/CharactersHomepageCard";
import LootHomepageCard from "./cards/LootHomepageCard";
import RaidsHomepageCard from "./cards/RaidsHomepageCard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

const setActiveView = jest.fn();
const fetchAll = jest.fn();

describe("Assert that all 3 homepage cards rendered", () => {
  it("Renders CharactersHomepageCard.jsx", () => {
    render(<Home setActiveView={setActiveView} fetchAll={fetchAll} />);
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });
  it("Renders RaidsHomepageCard.jsx", () => {
    render(<Home setActiveView={setActiveView} fetchAll={fetchAll} />);
    expect(screen.getByText("Raids")).toBeInTheDocument();
  });
  it("Renders LootHomepageCard.jsx", () => {
    render(<Home setActiveView={setActiveView} fetchAll={fetchAll} />);
    expect(screen.getByText("Loot")).toBeInTheDocument();
  });
});

describe("Assert that all 3 homepage cards gain class 'active' on mousedown", () => {
  it("<CharactersHomepageCard/>: Element by id 'characters-card' gains class 'active' on mousedown", () => {
    render(<CharactersHomepageCard />);
    const charactersCardElement = document.getElementById("characters-card");
    fireEvent.mouseDown(charactersCardElement);
    expect(charactersCardElement.classList.contains("active")).toBe(true);
  });
  it("<RaidsHomepageCard/>: Element by id 'raid-card' gains class 'active' on mousedown", () => {
    render(<RaidsHomepageCard />);
    const raidsCardElement = document.getElementById("raid-card");
    fireEvent.mouseDown(raidsCardElement);
    expect(raidsCardElement.classList.contains("active")).toBe(true);
  });
  it("<LootHomepageCard/>: Element by id 'loot-card' gains class 'active' on mousedown", () => {
    render(<LootHomepageCard />);
    const lootCardElement = document.getElementById("loot-card");
    fireEvent.mouseDown(lootCardElement);
    expect(lootCardElement.classList.contains("active")).toBe(true);
  });
});
