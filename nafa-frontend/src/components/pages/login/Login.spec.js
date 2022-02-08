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

      const mockAsyncDelayed = () => {
        return jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve({});
            }, 300);
          });
        });
      };
  


      let button, usernameInput, passwordInput
      const setupForSubmit = (props) => {
        const rendered = render(<Login {...props} />);
  
        const { container, queryByPlaceholderText } = rendered;
        usernameInput = queryByPlaceholderText(/Your username/i);
        passwordInput = queryByPlaceholderText("password");

        fireEvent.change(usernameInput, changeEvent("my-user-name"));
        fireEvent.change(passwordInput, changeEvent("my-P4ssword"));
  
        button = container.querySelector("button");
        return rendered;
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


      it("calls postLogin when the fields are valid and the actions provided in props", () => {
        const actions = {
          postLogin: jest.fn().mockResolvedValueOnce({}),
        };
        setupForSubmit({ actions });
        fireEvent.click(button);
        expect(actions.postLogin).toHaveBeenCalledTimes(1);
      });

      it("does not throw exceptions when clicking the login button actions not provided in the props", async () => {
        setupForSubmit();
        expect(() => fireEvent.click(button)).not.toThrow();
      });

      it("calls post with user body when the field are valid", () => {
        const actions = {
          postLogin: jest.fn().mockResolvedValueOnce({}),
        };
        setupForSubmit({ actions });
        fireEvent.click(button);
        const expectedUserObject = {
          username: "my-user-name",
          password: "my-P4ssword",
        };
  
        expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
      });

      it("enables the login button when username and password are not empty", () => {
        setupForSubmit();
        expect(button).not.toBeDisabled();
      });

      it("disables the login button when username is empty", () => {
        setupForSubmit();
        fireEvent.change(usernameInput,changeEvent(''))
        expect(button).toBeDisabled();
      });

      it('displays alert when login fails', async () => {
        const actions = {
          postLogin: jest.fn().mockRejectedValue({
            response: {
              data: {
                message: 'Login failed',
              },
            },
          }),
        };
        const { findByText } = setupForSubmit({ actions });
        fireEvent.click(button);
  
        const alert = await findByText('Login failed');
        expect(alert).toBeInTheDocument();
      });

      it('hides alert when input change', async () => {
        const actions = {
          postLogin: jest.fn().mockRejectedValue({
            response: {
              data: {
                message: 'Login failed',
              },
            },
          }),
        };
        const { findByText } = setupForSubmit({ actions });
        fireEvent.click(button);
  
        await findByText('Login failed');

        fireEvent.change(usernameInput,changeEvent("new-username"));
        const alert = screen.queryByText("Login failed");
        expect(alert).not.toBeInTheDocument();
      });

      it("does not let the user click the login button when there is an ongoing api call", () => {
        const actions = {
          postLogin: mockAsyncDelayed(),
        };
        setupForSubmit({ actions });
        fireEvent.click(button);
        fireEvent.click(button);
  
        expect(actions.postLogin).toHaveBeenCalledTimes(1);
      });

      it("displays spinner when there is an ongoing Api call", () => {
        const actions = {
          postLogin: mockAsyncDelayed(),
        };
  
        setupForSubmit({ actions });
  
        fireEvent.click(button);
  
        const spinner = screen.queryByText("Loading...");
        expect(spinner).toBeInTheDocument();
      });

      it("it hides the spinner after api call finishes successfully ", async () => {
        const actions = {
          postLogin: mockAsyncDelayed(),
        };
  
        setupForSubmit({ actions });
  
        fireEvent.click(button);
  
        const spinner = await screen.findByText("Loading...");
        await waitFor(() => expect(spinner).not.toBeInTheDocument());
      });

      it("it hides the spinner after api call finishes with error", async () => {
        const actions = {
          postLogin: jest.fn().mockImplementation(() => {
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
  

      
  

  })

});

console.error=()=>{}