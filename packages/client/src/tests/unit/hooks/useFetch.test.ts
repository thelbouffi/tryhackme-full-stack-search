import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useFetch from "src/hooks/useFetch";

// Mocking the fetch function
global.fetch = vi.fn();

describe.skip("useFetch Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return data after a successful fetch", async () => {
    const mockData = { status: "ok", body: { name: "Test City" }, message: "" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() =>
      useFetch("http://example.com/api/city/1")
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toEqual(mockData.body);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle a 404 error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ status: "error", message: "Not Found" }),
    });

    const { result } = renderHook(() =>
      useFetch("http://example.com/api/city/unknown")
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle a network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error")
    );

    const { result } = renderHook(() =>
      useFetch("http://example.com/api/city/1")
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe("Network Error");
    expect(result.current.isLoading).toBe(false);
  });
});
