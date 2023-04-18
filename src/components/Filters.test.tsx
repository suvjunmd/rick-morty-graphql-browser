import { expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

it("should render filters", () => {
  const routes = [
    {
      path: "/",
      element: (
        <Filters
          name=""
          status=""
          species=""
          type=""
          gender=""
          onSubmit={() => {}}
        />
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  const { container } = render(<RouterProvider router={router} />);
  expect(screen.getByText("Filters")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});

it("should call onSubmit prop when clicked on Filter button", () => {
  const handleClick = vi.fn();
  const routes = [
    {
      path: "/",
      element: (
        <Filters
          name=""
          status=""
          species=""
          type=""
          gender=""
          onSubmit={handleClick}
        />
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  render(<RouterProvider router={router} />);
  fireEvent.click(screen.getByText('Filter'));
  expect(handleClick).toHaveBeenCalledTimes(1)
});  

it("should call onSubmit prop when clicked on Reset button", () => {
  const handleClick = vi.fn();
  const routes = [
    {
      path: "/",
      element: (
        <Filters
          name=""
          status=""
          species=""
          type=""
          gender=""
          onSubmit={handleClick}
        />
      ),
    },
  ];
  const router = createMemoryRouter(routes);
  render(<RouterProvider router={router} />);
  fireEvent.click(screen.getByText('Reset'));
  expect(handleClick).toHaveBeenCalledTimes(1)
});  