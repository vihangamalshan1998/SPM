import React, {Component} from 'react';
import ContactUs from "../ContactUs";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", ()=>{
    const {getByTestId} = render(<ContactUs/>);
    const headerEl = getByTestId("test_header");
    expect(headerEl.textContent).toBe("Contact Us");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<ContactUs/>);
    const headerEl = getByTestId("test_address");
    expect(headerEl.textContent).toBe("SLIIT, New Kandy Road, Malabe, Sri Lanka");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<ContactUs/>);
    const headerEl = getByTestId("test_number");
    expect(headerEl.textContent).toBe("T: +94 11 7544806");
})