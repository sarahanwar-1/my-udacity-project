// __tests__/FormHandler.test.js 
import { handleSubmit } from "../src/client/js/formHandler";
import { isValidURL } from "../src/client/js/urlValidator"; // Importing the URL validator
import { checkForName } from "../src/client/js/nameChecker"; // Importing nameChecker

// Mocking `checkForName` and `fetch` for isolated testing
jest.mock("../src/client/js/nameChecker", () => ({
  checkForName: jest.fn(), // Mock to track function calls
}));

global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ polarity: "positive", subjectivity: "subjective" }), // Mock API response
  })
);

describe("Form Handler Tests", () => {
  beforeEach(() => {
    // Reset mocks before each test to avoid cross-test interference
    jest.clearAllMocks();
  });

  test("handleSubmit should validate URL and call fetch with correct payload", async () => {
    // Mock a valid event and input value
    const mockEvent = { preventDefault: jest.fn() };
    const mockValue = "https://example.com"; // Example valid URL
    const mockInput = { value: mockValue };

    // Mocking DOM functions
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === "name") return mockInput; // Return mocked input element
      return null;
    });

    // Mock URL validation to always return true
    jest.mock("../src/client/js/urlValidator", () => ({
      isValidURL: jest.fn(() => true),
    }));

    // Call handleSubmit
    await handleSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that URL was validated
    expect(isValidURL).toHaveBeenCalledWith(mockValue);

    // Assert that fetch was called with the correct server URL and payload
    expect(fetch).toHaveBeenCalledWith(
      "https://localhost:8000/api",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: mockValue }),
      })
    );

    // Assert that checkForName was NOT called (only URL logic should apply here)
    expect(checkForName).not.toHaveBeenCalled();
  });

  test("handleSubmit should alert on invalid URL", () => {
    const mockEvent = { preventDefault: jest.fn() };
    const mockValue = "invalid-url"; // Example invalid URL
    const mockInput = { value: mockValue };

    // Mocking DOM functions
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === "name") return mockInput; // Return mocked input element
      return null;
    });

    // Mock URL validation to return false
    jest.mock("../src/client/js/urlValidator", () => ({
      isValidURL: jest.fn(() => false),
    }));

    // Spy on alert to track calls
    global.alert = jest.fn();

    // Call handleSubmit
    handleSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Assert that alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid URL.");
  });
});
