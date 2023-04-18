import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Character, { GET_CHARACTER_QUERY } from "./Character";

const mocks = [
  {
    request: {
      query: GET_CHARACTER_QUERY,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        character: {
          id: "1",
          name: "Rick",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: {
            name: "Earth (C-137)",
          },
          location: {
            name: "Citadel of Ricks",
          },
          image: "1.jpeg",
          created: "2022-11-04T18:48:46.250Z",
        },
      },
    },
  },
];

it("should render character", async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Character id="1" />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Citadel of Ricks")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it("should render no results message", async () => {
  const noResultsMock = {
    request: {
      query: GET_CHARACTER_QUERY,
      variables: {
        id: "1",
      },
    },
    result: {},
  };
  render(
    <MockedProvider mocks={[noResultsMock]} addTypename={false}>
      <Character id="1" />
    </MockedProvider>
  );
  expect(await screen.findByText("No results")).toBeInTheDocument();
});

it("should render network error message", async () => {
  const errorMock = {
    request: {
      query: GET_CHARACTER_QUERY,
      variables: {
        id: "1",
      },
    },
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <Character id="1" />
    </MockedProvider>
  );
  expect(
    await screen.findByText("Error : An error occurred")
  ).toBeInTheDocument();
});
