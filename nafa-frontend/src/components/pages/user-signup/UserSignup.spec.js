import React from 'react';
import { render,screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserSignup from './UserSignup';

describe('UserSignup', ()=> {

    describe('Layout', ()=>{

        it('has header of Sign Up',()=>{
            render(<UserSignup />)
            const header = screen.getByRole("heading", {name:/Sign Up/i})
            expect(header).toHaveTextContent('Sign Up');
        })

        it('has input for username',()=>{
            render(<UserSignup />);
            const usernameInput = screen.getByPlaceholderText(/your username/i);
            expect(usernameInput).toBeInTheDocument();
        })

        it('has input for email',()=>{
            render(<UserSignup />);
            const emailInput = screen.getByPlaceholderText(/name@example.com/i);
            expect(emailInput).toBeInTheDocument();
        })


        it('has email type for email input',()=>{
            render(<UserSignup />);
            const emailInput = screen.getByPlaceholderText(/name@example.com/i);
            expect(emailInput.type).toBe('email')
        })
        
        it('has input for password',()=>{
            render(<UserSignup />);
            const passwordInput = screen.getByPlaceholderText('password');
            expect(passwordInput).toBeInTheDocument();
        })

        it('has password type for password input',()=>{
            render(<UserSignup />);
            const passwordInput = screen.getByPlaceholderText('password');
            expect(passwordInput.type).toBe('password')
        })


        it('has input for password',()=>{
            render(<UserSignup />);
            const passwordInputRepeat = screen.getByPlaceholderText('Repeat your password');
            expect(passwordInputRepeat).toBeInTheDocument();
        })

        it('has password type for repeat password input',()=>{
            render(<UserSignup />);
            const passwordInputRepeat = screen.getByPlaceholderText('Repeat your password');
            expect(passwordInputRepeat.type).toBe('password')
        })

        it("has submit button", () => {
            // render
            render(<UserSignupPage />);
            const buttonElement = screen.getByRole("button", { name: /sign up/i });
            expect(buttonElement).toBeInTheDocument();
          });
      

    })

    describe('interactions',()=>{
        it('sets username value into state',()=>{

        })
    })

})