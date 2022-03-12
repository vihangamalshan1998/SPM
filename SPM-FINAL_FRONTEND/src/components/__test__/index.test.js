import React, {Component} from 'react';
import Index from '../index';

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", ()=>{
    const {getByTestId} = render(<Index/>);
    const headerEl = getByTestId("test_header");
    expect(headerEl.textContent).toBe("Kidz School Management System");
})

test("header render with correct text", ()=>{
    const {getByTestId} = render(<Index/>);
    const headerEl = getByTestId("test_getStarted");
    expect(headerEl.textContent).toBe("Get Started");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<Index/>);
    const headerEl = getByTestId("test_getStarted");
    expect(headerEl.textContent).toBe("Get Started");
})