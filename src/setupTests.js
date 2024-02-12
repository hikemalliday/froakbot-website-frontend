import "@testing-library/jest-dom";

beforeEach(() => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: jest.fn().mockImplementation(({ children }) => children),
  }));
});
