import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

afterEach(() => {
    cleanup();
});

it("should render pagination", () => {
    const { container } = render(
        <Pagination page={1} totalPages={1} onNavigateToPage={() => {}} />,
    );
    expect(screen.getByText("page 1 of 1")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});

it("should render disabled Previous button on first page", () => {
    const { container } = render(
        <Pagination page={1} totalPages={10} onNavigateToPage={() => {}} />,
    );
    expect(screen.getByText("Previous")).toBeDisabled();
    expect(screen.getByText("Next")).toBeEnabled();
    expect(container).toMatchSnapshot();
});

it("should render disabled Next button on last page", () => {
    const { container } = render(
        <Pagination page={10} totalPages={10} onNavigateToPage={() => {}} />,
    );
    expect(screen.getByText("Previous")).toBeEnabled();
    expect(screen.getByText("Next")).toBeDisabled();
    expect(container).toMatchSnapshot();
});

it("should call onNavigateToPage prop when clicked on Previous button", () => {
    const handleClick = vi.fn();

    render(
        <Pagination page={10} totalPages={10} onNavigateToPage={handleClick} />,
    );
    fireEvent.click(screen.getByText("Previous"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});

it("should call onNavigateToPage prop when clicked on Next button", () => {
    const handleClick = vi.fn();

    render(
        <Pagination page={1} totalPages={10} onNavigateToPage={handleClick} />,
    );
    fireEvent.click(screen.getByText("Next"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});
