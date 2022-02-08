import React from "react";
import {
  render,screen,fireEvent
  
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";


describe("Layout", ()=>{

    it('has input item',()=>{
        const{container} = render(<Input />)
        const input = container.querySelector('input')
        expect(input).toBeInTheDocument();
    })

    it('displays the label provided in props',()=>{
       render(<Input label="Test label" />)
        const label = screen.getByText('Test label')
        expect(label).toBeInTheDocument();
    });

    it('does not display label when not provided in props',()=>{
        render(<Input />)
         const label = screen.queryByText('Test label');
         expect(label).not.toBeInTheDocument();
     });

     it('has text type for input when type is not provided in props',()=>{
        const{container} = render(<Input />)
        const input = container.querySelector('input')
        expect(input.type).toBe('text');
    })

    it('has password type for input when password type is provided in props',()=>{
        const{container} = render(<Input type="password"/>)
        const input = container.querySelector('input')
        expect(input.type).toBe('password');
    })

    it('displays placeholder when provided as prop',()=>{
        const{container} = render(<Input placeholder="test-placeholder"/>)
        const input = container.querySelector('input')
        expect(input.placeholder).toBe('test-placeholder');
    })
    
    it('has value for input when provided as prop',()=>{
        const{container} = render(<Input value="test-value"/>)
        const input = container.querySelector('input')
        expect(input.value).toBe('test-value');
    })

    it('has onChange callback when provided as prop',()=>{
        const onChange = jest.fn()
        const{container} = render(<Input onChange={onChange}/>)
        const input = container.querySelector('input')
        fireEvent.change(input, {target:{value: 'new-input'}})
        expect(onChange).toHaveBeenCalledTimes(1);
    })

    it('has default style when no validation error or success',()=>{
        const{container} = render(<Input />)
        const input = container.querySelector('input')
        expect(input.className).toBe('form-control');
    })

    it('has success style when error property is false',()=>{
        const{container} = render(<Input hasError={false}/>)
        const input = container.querySelector('input')
        expect(input.className).toBe('is-valid form-control');
    })

    it('has  style for error case when error property is true',()=>{
        const{container} = render(<Input hasError={true}/>)
        const input = container.querySelector('input')
        expect(input.className).toBe('is-invalid form-control');
    })

    it('has displays error when provided',()=>{
        const{queryByText} = render(<Input hasError={true} error="Cannot be null" />)
        const error = queryByText("Cannot be null")
        expect(error).toBeInTheDocument();
    })

    it('has does not display error when not provided',()=>{
        const{queryByText} = render(<Input  error="Cannot be null" />)
        const error = queryByText("Cannot be null")
        expect(error).not.toBeInTheDocument();
    })
})
