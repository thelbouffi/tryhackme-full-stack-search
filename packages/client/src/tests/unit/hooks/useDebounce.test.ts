import { renderHook, act } from "@testing-library/react";
import useDebounce from "src/hooks/useDebounce";
import { vi, describe, it, expect } from "vitest";

describe("useDebounce Hook", () => {
  vi.useFakeTimers();

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    rerender({ value: "updated", delay: 500 });

    // The value should still be "initial" before the delay
    expect(result.current).toBe("initial");

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The value should now be "updated" after the delay
    expect(result.current).toBe("updated");
  });

  it("should cancel the timeout if the value changes before the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    rerender({ value: "updated", delay: 500 });

    // Fast-forward time by 300ms (less than the delay)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Rerender with a new value
    rerender({ value: "new value", delay: 500 });

    // The value should still be "initial" before the new delay completes
    expect(result.current).toBe("initial");

    // Fast-forward time by 500ms (for the new value)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The value should now be "new value" after the delay
    expect(result.current).toBe("new value");
  });
});
