import React, {Component} from 'react';
import IndexHeader from "./IndexHeader";

class Index extends Component {
    render() {
        return (
            <div className={"indexBody"}>
                <IndexHeader/>
                <div className={"row"}>
                    <div className="col-sm-5 m-5">
                        <h1 data-testid="test_header" className={"topic"}>Kidz School Management System</h1>
                        <a href={"/login"}>
                            <div className=" m-3 col-sm-3 getStartBtn">
                                <h6 data-testid="test_getStarted">Get Started</h6>
                            </div>
                        </a>
                        <small className="smallText" style={{color:"#FFBA01",fontWeight: "bold",fontSize: "20px",fontFamily: "sans-serif"}}>
                            KIDZ School is an online based School Management System that provides educators with
                            the tools and
                            <br/>
                            data needed to handle daily activities. Any size of academy institute can use it
                            — be it school or a college.
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;