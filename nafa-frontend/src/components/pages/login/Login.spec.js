import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "./Login";

describe("Login", () => {
  describe("Layout", () => {
    it("has header of Login", () => {
      render(<Login />);
      const header = screen.getByRole("heading", { name: /Login/i });
      expect(header).toHaveTextContent("Login");
    });

    it("has input for username", () => {
      render(<Login />);
      const usernameInput = screen.getByPlaceholderText(/your username/i);
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      render(<Login />);
      const passwordInput = screen.getByPlaceholderText("password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<Login />);
      const passwordInput = screen.getByPlaceholderText("password");
      expect(passwordInput.type).toBe("password");
    });

    it("has login button", () => {
      // render
      render(<Login />);
      const button = screen.getByRole("button", { name: /Login/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("interactions",()=>{

    const changeEvent = (content) => {
        return {
          target: {
            value: content,
          },
        };
      };

    it("sets username value into state", () => {
        render(<Login />);
        const usernameInput = screen.getByPlaceholderText(/your username/i);
        fireEvent.change(usernameInput, changeEvent("my-user-name"));
        expect(usernameInput).toHaveValue("my-user-name");
      });
      

      it("sets password value into state", () => {
        render(<Login />);
        const passwordInput = screen.getByPlaceholderText("password");
        fireEvent.change(passwordInput, changeEvent("my-pasword"));
        expect(passwordInput).toHaveValue("my-pasword");
      });

  })

});
