import React, {Component} from 'react';
import Login from "../login";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", ()=>{
    const {getByTestId} = render(<Login/>);
    const headerEl = getByTestId("test_header");
    expect(headerEl.textContent).toBe("Welcome Back");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<Login/>);
    const headerEl = getByTestId("test_forgot");
    expect(headerEl.textContent).toBe("Forgot your password ? ");
})