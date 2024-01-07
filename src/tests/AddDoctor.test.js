import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import AddDoctor from "./../../src/pages/AddDoctor";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
const store = mockStore({});

afterEach(() => {
  mock.reset();
  store.clearActions();
});

it("should render the basic fields", async () => {
  // Mockowanie żądania HTTP
  mock.onPost("/api/v1/user/add-doctor").reply(200, { success: true });

  // Rendrowanie komponentu z użyciem Provider i mock store
  render(
    <BrowserRouter>
      <Provider store={store}>
        <AddDoctor />
      </Provider>
    </BrowserRouter>
  );

  // Oczekiwanie na asynchroniczne operacje (np. żądanie HTTP)
  await act(async () => {
    // Tutaj możesz dodać kod, który może wykonać się asynchronicznie, np. obsługa żądania HTTP
  });

  // Sprawdzanie, czy pola są renderowane
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Specialization")).toBeInTheDocument();
});
