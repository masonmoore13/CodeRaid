import axios from "axios";
import * as apiCalls from "./apiCalls"

const apiUrl = "http://localhost:8000/accounts/register/";
const loginUrl = "http://localhost:8000/accounts/login/"

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

  describe("login", () => {
    it(`calls ${loginUrl}`, () => {
      const mockLogin = jest.fn();
      axios.post = mockLogin;

      apiCalls.login({
        username: "my-username",
        password: "P4assword"
      });
      
      const path = mockLogin.mock.calls[0][0];
      expect(path).toBe(`${loginUrl}`);

    });
  });

});
