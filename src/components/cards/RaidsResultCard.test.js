import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RaidsResultCard from "./RaidsResultCard";

beforeEach(() => {
  const raidObject = {
    raidId: 1,
    raidName: "test raid name",
    raidDate: "09-01-1987",
  };
  render(<RaidsResultCard raid={raidObject} />);
});

it("Renders the mock object results into the document", () => {
  const raidIdElement = screen.getByTestId("raid-id");
  const raidNameElement = screen.getByTestId("raid-name");
  const raidDateElement = screen.getByTestId("raid-id");

  expect(raidIdElement).toBeInTheDocument();
  expect(raidNameElement).toBeInTheDocument();
  expect(raidDateElement).toBeInTheDocument();
});
