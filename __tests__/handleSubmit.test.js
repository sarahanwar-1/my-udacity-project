// __tests__/handleSubmit.test.js
import { handleSubmit } from "../src/client/js/formHandler"; 
import { isValidURL } from "../src/client/js/urlValidator"; // Import URL validator for mocking
import { checkForName } from "../src/client/js/nameChecker"; // Import checkForName for mocking

// Mocking external dependencies
jest.mock("../src/client/js/urlValidator", () => ({
  isValidURL: jest.fn(), // Mock the function to control its behavior in tests
}));

jest.mock("../src/client/js/nameChecker", () => ({
  checkForName: jest.fn(), // Mock the function to track its calls
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ polarity: "positive", subjectivity: "objective" }), // Mock API response
  })
);

describe("Testing the handleSubmit functionality", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test to avoid interference
  });

  test("handleSubmit should be defined", () => {
    expect(handleSubmit).toBeDefined(); // Ensure the function exists
  });

  test("handleSubmit should call preventDefault", () => {
    // Mock the event object
    const mockEvent = { preventDefault: jest.fn() };

    // Call the function with the mocked event
    handleSubmit(mockEvent);

    // Assert that preventDefault was called to prevent form submission
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  test("handleSubmit should validate URL and call fetch on valid input", async () => {
    const mockValue = "https://example.com"; // Example valid URL
    const mockEvent = { preventDefault: jest.fn() };

    // Mocking DOM input retrieval
    document.getElementById = jest.fn((id) => {
      if (id === "name") return { value: mockValue }; // Return mocked input
      return null;
    });

    // Mock isValidURL to return true
    isValidURL.mockReturnValue(true);

    // Call the function
    await handleSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that the URL was validated
    expect(isValidURL).toHaveBeenCalledWith(mockValue);

    // Assert that fetch was called with the correct payload
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mockValue }),
      })
    );

    // Assert that checkForName was called with the URL
    expect(checkForName).toHaveBeenCalledWith(mockValue);
  });

  test("handleSubmit should alert on invalid URL", () => {
    const mockValue = "invalid-url"; // Example invalid URL
    const mockEvent = { preventDefault: jest.fn() };

    // Mocking DOM input retrieval
    document.getElementById = jest.fn((id) => {
      if (id === "name") return { value: mockValue }; // Return mocked input
      return null;
    });

    // Mock isValidURL to return false
    isValidURL.mockReturnValue(false);

    // Spy on alert
    global.alert = jest.fn();

    // Call the function
    handleSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that the URL was validated
    expect(isValidURL).toHaveBeenCalledWith(mockValue);

    // Assert that alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid URL.");
  });

  test("handleSubmit should handle API errors gracefully", async () => {
    const mockValue = "https://example.com";
    const mockEvent = { preventDefault: jest.fn() };

    // Mocking DOM input retrieval
    document.getElementById = jest.fn((id) => {
      if (id === "name") return { value: mockValue }; // Return mocked input
      return null;
    });

    // Mock isValidURL to return true
    isValidURL.mockReturnValue(true);

    // Mock fetch to simulate an error
    fetch.mockRejectedValue(new Error("API Error"));

    // Spy on console.error
    console.error = jest.fn();

    // Call the function
    await handleSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that console.error was called with the error message
    expect(console.error).toHaveBeenCalledWith("Error submitting the form:", new Error("API Error"));
  });
});
