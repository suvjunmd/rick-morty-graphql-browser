import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Gallery, { GET_CHARACTERS_QUERY } from "./Gallery";
import { MemoryRouter } from "react-router-dom";

const mocks = [
  {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: {},
      },
    },
    result: {
      data: {
        characters: {
          info: {
            pages: 1,
          },
          results: [
            {
              id: "1",
              name: "Rick Sanchez",
              status: "Alive",
              image: "1.jpeg",
            },
            {
              id: "2",
              name: "Morty Smith",
              status: "Dead",
              image: "2.jpeg",
            },
            {
              id: "3",
              name: "Summer Smith",
              status: "unknown",
              image: "3.jpeg",
            },
          ],
        },
      },
    },
  },
];

it("should render gallery", async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Gallery filterConfig={{}} page={1} onNavigateToPage={() => {}} />
      </MemoryRouter>
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("2 - Morty Smith")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it("should render no results message", async () => {
  const noResultsMock = {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: {},
      },
    },
    result: {},
  };
  render(
    <MockedProvider mocks={[noResultsMock]} addTypename={false}>
      <Gallery filterConfig={{}} page={1} onNavigateToPage={() => {}} />
    </MockedProvider>
  );
  expect(await screen.findByText("No results")).toBeInTheDocument();
});

it("should render network error message", async () => {
  const errorMock = {
    request: {
      query: GET_CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: {},
      },
    },
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Gallery filterConfig={{}} page={1} onNavigateToPage={() => {}} />
    </MockedProvider>
  );
  expect(
    await screen.findByText("Error : An error occurred")
  ).toBeInTheDocument();
});
