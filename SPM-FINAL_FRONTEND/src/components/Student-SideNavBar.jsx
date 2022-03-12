import React, {Component} from 'react';

class StudentSideNavBar extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12 nav_body bg-light">
                    <div className="row">
                        <h1 className="topicRow">KIDZ SCHOOL</h1>
                    </div>
                    <div className="row">
                        <a><p className="NavItem"><i className="fas fa-tachometer-alt m-2"></i> Dashboard</p></a>
                    </div>
                    <div className="row">
                        <a><p className="NavItem"><i className="fas fa-cogs m-2"></i>Management</p></a>
                    </div>
                    <div className="row">
                        <a href={"/BackendTeacher"}><p className="NavItem"><i className="fas fa-chalkboard-teacher m-2"></i>Teacher</p></a>
                    </div>
                    <div className="row">
                        <small className="text-muted NavItem2"> More Infor</small>
                    </div>
                    <div className="row">
                        <a><p className="NavItem"><i className="fas fa-school m-2"></i>Class</p></a>
                    </div>
                    <div className="row">
                        <a href={"/studentallocatedSub"}><p className="NavItem"><i className="fas fa-book m-2"></i>Subject</p></a>
                    </div>
                    <div className="row">
                        <a href={"/adminStudentDashboard"}><p className="NavItem"><i className="fas fa-tasks m-2"></i>Notices</p></a>
                    </div>
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                    </div>
                </div>
            </div>
        );
    }
}

export default StudentSideNavBar;