import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserSignup from "./UserSignup";

describe("UserSignup", () => {
  describe("Layout", () => {
    it("has header of Sign Up", () => {
      render(<UserSignup />);
      const header = screen.getByRole("heading", { name: /Sign Up/i });
      expect(header).toHaveTextContent("Sign Up");
    });

    it("has input for username", () => {
      render(<UserSignup />);
      const usernameInput = screen.getByPlaceholderText(/your username/i);
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for email", () => {
      render(<UserSignup />);
      const emailInput = screen.getByPlaceholderText(/name@example.com/i);
      expect(emailInput).toBeInTheDocument();
    });

    it("has email type for email input", () => {
      render(<UserSignup />);
      const emailInput = screen.getByPlaceholderText(/name@example.com/i);
      expect(emailInput.type).toBe("email");
    });

    it("has input for password", () => {
      render(<UserSignup />);
      const passwordInput = screen.getByPlaceholderText("password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<UserSignup />);
      const passwordInput = screen.getByPlaceholderText("password");
      expect(passwordInput.type).toBe("password");
    });

    it("has input for password repeat", () => {
      render(<UserSignup />);
      const passwordInputRepeat = screen.getByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordInputRepeat).toBeInTheDocument();
    });

    it("has password type for repeat password input", () => {
      render(<UserSignup />);
      const passwordInputRepeat = screen.getByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordInputRepeat.type).toBe("password");
    });

    it("has sign up button", () => {
      // render
      render(<UserSignup />);
      const button = screen.getByRole("button", { name: /sign up/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };

    let button, emailInput, usernameInput, passwordInput, passwordRepeat;
    const setupForSubmit = (props) => {
      const rendered = render(<UserSignup {...props} />);

      const { container, queryByPlaceholderText } = rendered;

      emailInput = queryByPlaceholderText(/name@example.com/i);
      usernameInput = queryByPlaceholderText(/Your username/i);
      passwordInput = queryByPlaceholderText("password");
      passwordRepeat = queryByPlaceholderText("Repeat your password");

      fireEvent.change(emailInput, changeEvent("name@example.com"));
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      fireEvent.change(passwordInput, changeEvent("my-password"));
      fireEvent.change(passwordRepeat, changeEvent("my-password"));

      button = container.querySelector("button");
      return rendered;
    };

    it("sets username value into state", () => {
      render(<UserSignup />);
      const usernameInput = screen.getByPlaceholderText(/your username/i);
      fireEvent.change(usernameInput, changeEvent("my-user-name"));
      expect(usernameInput).toHaveValue("my-user-name");
    });

    it("sets email value into state", () => {
      render(<UserSignup />);
      const emailInput = screen.getByPlaceholderText(/name@example.com/i);
      fireEvent.change(emailInput, changeEvent("name@example.com"));
      expect(emailInput).toHaveValue("name@example.com");
    });

    it("sets password value into state", () => {
      render(<UserSignup />);
      const passwordInput = screen.getByPlaceholderText("password");
      fireEvent.change(passwordInput, changeEvent("my-pasword"));
      expect(passwordInput).toHaveValue("my-pasword");
    });

    it("sets repeat value into state", () => {
      render(<UserSignup />);
      const passwordInputRepeat = screen.getByPlaceholderText("password");
      fireEvent.change(passwordInputRepeat, changeEvent("my-pasword"));
      expect(passwordInputRepeat).toHaveValue("my-pasword");
    });

    it("calls postSignup when the fields are valid and the actions provided in props", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("does not throw exceptions when clicking the signup button actions not provided in the props", async () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("calls post with user body when the field are valid", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        username: "my-user-name",
        email: "name@example.com",
        password: "my-password",
      };

      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    it("does not let the user click the signup button when there is an ongoing api call", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("displays spinner when there is an ongoing Api call", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      const spinner = screen.queryByText("Loading...");
      expect(spinner).toBeInTheDocument();
    });

    it("it hides the spinner after api call finishes successfully ", async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      const spinner = await screen.findByText("Loading...");
      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });

    it("it hides the spinner after api call finishes with error", async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: { data: {} },
              });
            }, 300);
          });
        }),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      const spinner = await screen.findByText("Loading...");
      await waitFor(() => expect(spinner).not.toBeInTheDocument());
    });

    it("it displays validation error for username when error is recieved in the field", async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
 
              reject({
                response: {
                  data: {
                    validationErrors: {
                      username: "Cannot be null",
                    },
                  },
                },
              });

          });
        }),
      };

      setupForSubmit({ actions });

      fireEvent.click(button);

      const errorMessage = await screen.findByText("Cannot be null");

      await waitFor(() => expect(errorMessage).toBeInTheDocument());
    });

    it("enables the signup button when the password and repeat password has same value",()=>{
      setupForSubmit();
      expect(button).not.toBeDisabled();
    })

    it("disables the signup button when the password don't match password repeat",()=>{
      setupForSubmit();
      fireEvent.change(passwordRepeat, changeEvent('new-pass'));
      expect(button).toBeDisabled();
    })

    it("disables the signup button when the password repeat don't match password ",()=>{
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent('new-pass'));
      expect(button).toBeDisabled();
    })

    it("displays error style for password repeat if repeat don't match password ",()=>{
      const {queryByText} = setupForSubmit();
      fireEvent.change(passwordRepeat, changeEvent('new-pass'));
      const mismatch = queryByText('Does not match to password');
      expect(mismatch).toBeInTheDocument();
    })

    it("displays error style for password repeat if password input mismatch",()=>{
      const {queryByText} = setupForSubmit();
      fireEvent.change(passwordRepeat, changeEvent('new-pass'));
      const mismatch = queryByText('Does not match to password');
      expect(mismatch).toBeInTheDocument();
    })



  
  });
});

console.error = () => {};
