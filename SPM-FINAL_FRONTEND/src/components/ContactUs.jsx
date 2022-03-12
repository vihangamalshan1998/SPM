import React, {Component} from 'react';
import IndexHeader from "./IndexHeader";
class ContactUs extends Component {
    render() {
        return (
            <div className="container-fluid about">
                <IndexHeader/>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10 bodyText">
                        <br/>
                        <h1 data-testid="test_header" className="text headingText">Contact Us</h1>
                        <small className="smallText" style={{color:"#FFBA01",fontWeight: "bold",fontSize: "20px",fontFamily: "sans-serif"}}>
                            KIDZ School is an online based School Management System that provides educators with
                            the tools and
                            <br/>
                            data needed to handle daily activities. Any size of academy institute can use it
                            — be it school or a college.
                            <br/>
                            By automating your tasks like Teacher Details Management, Student Details Management, Attendance tracking,
                            <br/>
                            Grading, and Reporting, it results in improved efficiency and increased productivity. Both the teacher and
                            <br/>students are benefited from the system.
                            <br/>
                            <br/>
                            <br/>
                            <h6 data-testid="test_address">SLIIT, New Kandy Road, Malabe, Sri Lanka</h6>
                            <br/>
                            <h6 data-testid="test_number">T: +94 11 7544806</h6>
                        </small>
                    </div>
                </div>

            </div>
        );
    }
}

export default ContactUs;