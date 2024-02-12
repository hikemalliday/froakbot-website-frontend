import { render, fireEvent } from "@testing-library/react";
import * as React from "react";
import "@testing-library/jest-dom";
import CharactersCard from "./CharactersHomepageCard";
import LootCard from "./LootHomepageCard";
import RaidsCard from "./RaidsHomepageCard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe("Assert that all 3 homepage cards gain class 'active' on mousedown", () => {
  it("<RaidsHomepageCard/>: Element by id 'raid-card' gains class 'active' on mousedown", () => {
    render(<RaidsCard />);
    const raidsCardElement = document.getElementById("raid-card");
    fireEvent.mouseDown(raidsCardElement);
    expect(raidsCardElement.classList.contains("active")).toBe(true);
  });
  it("<LootHomepageCard/>: Element by id 'loot-card' gains class 'active' on mousedown", () => {
    render(<LootCard />);
    const lootCardElement = document.getElementById("loot-card");
    fireEvent.mouseDown(lootCardElement);
    expect(lootCardElement.classList.contains("active")).toBe(true);
  });
});
