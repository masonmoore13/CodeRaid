import axios from "axios";
import * as apiCalls from "./apiCalls"

const apiUrl = "https://coderaid.free.beeceptor.com/signup";

describe("apiCalls", () => {
  describe("signup", () => {
    it(`calls ${apiUrl}`, () => {
      const mockSignup = jest.fn();
      axios.post = mockSignup;

      apiCalls.signup();
      
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe(`${apiUrl}`);

    });
  });
});
