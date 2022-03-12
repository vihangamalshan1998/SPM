import React, {Component} from 'react';
import AboutUs from '../AboutUs'
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("header render with correct text", ()=>{
    const {getByTestId} = render(<AboutUs/>);
    const headerEl = getByTestId("test_header");
    expect(headerEl.textContent).toBe("About Us");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<AboutUs/>);
    const headerEl = getByTestId("test_header_team");
    expect(headerEl.textContent).toBe("Meet Our Team");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<AboutUs/>);
    const headerEl = getByTestId("test_header_lead");
    expect(headerEl.textContent).toBe("Maleesha Wickramarathna");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<AboutUs/>);
    const headerEl = getByTestId("test_header_member1");
    expect(headerEl.textContent).toBe("Kithmini De Silva");
})
test("header render with correct text", ()=>{
    const {getByTestId} = render(<AboutUs/>);
    const headerEl = getByTestId("test_header_member2");
    expect(headerEl.textContent).toBe("Vihanga Lekamalage");
})
