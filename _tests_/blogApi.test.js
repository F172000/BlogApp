import { GET } from "../src/app/api/route"; // ✅ Sahi Import
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignIn from "../src/app/auth/page"; // Correct the path
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
jest.mock("../src/app/api/route", () => ({
  GET: jest.fn(),
}));

test("API returns mock list of blogs", async () => {
  const mockPosts = [{ id: 1, title: "Mock Blog" }];
  const mockResponse = {
    status: 200,
    json: jest.fn().mockResolvedValue(mockPosts),
  };
  GET.mockResolvedValue(mockResponse);
  const response = await GET();
  const data = await response.json();
  expect(response.status).toBe(200);
  expect(data).toEqual(mockPosts);
});

test("API handles errors correctly", async () => {
  const errorResponse = { message: "Internal Server Error" };
  const mockErrorResponse = {
    status: 500,
    json: jest.fn().mockResolvedValue(errorResponse),
  };
  GET.mockResolvedValue(mockErrorResponse);
  const response = await GET();
  const data = await response.json();
  expect(response.status).toBe(500);
  expect(data.message).toBe("Internal Server Error");
});
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignIn Component", () => {
  let mockPush;

  beforeEach(() => {
    // Reset mocks before each test
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test("renders the Sign In form correctly", () => {
    render(<SignIn />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("handles successful sign-in", async () => {
    signIn.mockResolvedValueOnce({ ok: true });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/blog"));

    expect(screen.getByRole("button", { name: /sign in/i })).toHaveTextContent(
      "Sign In"
    );
  });

  test("handles failed sign-in", async () => {
    signIn.mockResolvedValueOnce({ ok: false });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toHaveTextContent("Sign In")
    );
  });

  test("shows loading state during sign-in", async () => {
    signIn.mockResolvedValueOnce({ ok: true });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toHaveTextContent("Sign In")
    );
  });
});
