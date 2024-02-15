import Home from "./Home";
import { screen, render, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

const fetchAll = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

describe("Assert that all 3 homepage cards rendered", () => {
  beforeEach(() => {
    render(<Home fetchAll={fetchAll} />);
  });
  it("Renders CharactersHomepageCard.jsx", () => {
    expect(screen.getByText("Characters")).toBeInTheDocument();
  });
  it("Renders RaidsHomepageCard.jsx", () => {
    expect(screen.getByText("Raids")).toBeInTheDocument();
  });
  it("Renders LootHomepageCard.jsx", () => {
    expect(screen.getByText("Loot")).toBeInTheDocument();
  });
});
