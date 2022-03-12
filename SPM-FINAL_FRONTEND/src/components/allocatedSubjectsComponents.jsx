import React, { Component } from 'react'
import jwt_decord from "jwt-decode";
import service from '../services/SchoolManagementSystemServices'

export default class allocatedSubjectsComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // view edit variables
            viewTeacherDatabaseID: jwt_decord(localStorage.getItem("token")).id,
            viewTeacherSubjects: []
        }
    }
     //sign out
    signout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.clear();
        console.log('helloo');
        this.props.history.push('/');
    }
    //Get one Teacher
    componentDidMount() {
        service.GetOneTeachers(this.state.viewTeacherDatabaseID).then((res => {
            let OneTeacher = res.data;
            console.log(res.data)
            this.setState({
                viewTeacherSubjects: OneTeacher.subject
            });
            console.log(this.state.viewTeacherSubjects)

        }))
    }
    //View subject details
    ViewSubjectsInside(e, subjectid) {
        e.preventDefault();
        this.props.history.push('/subjectdetails/' + subjectid);
    }
    render() {
        return (
            // navbar
            <div>
                <input type="checkbox" id="check"></input>
                <header>
                    <label for="check">
                        <i class="fas fa-bars" id="sidebar_btn"></i>
                    </label>
                    <div class="left_area">
                        <h3><span>KIDZ SCHOOL</span></h3>
                    </div>
                    <div class="right_area">
                        <a href="/" class="logout_btn">Log Out</a>
                    </div>
                </header>
                <div class="mobile_nav">
                    <div class="nav_bar">
                        <i class="fa fa-bars nav_btn"></i>
                    </div>
                    <div class="mobile_nav_items">
                        <a href="/teacherDashboard"><i class="fas fa-desktop"></i><span>Dashboard</span></a>
                        <a href="/allocatedSub"><i class="fa fa-book"></i><span>Subjects</span></a>
                    </div>
                </div>
                <div class="sidebar">
                    <a href="/teacherDashboard"><i class="fas fa-desktop mt-4 mb-4"></i><span>Dashboard</span></a>
                    <a className="active" href="/allocatedSub"><i class="fa fa-book mt-4 mb-4"></i><span>Subjects</span></a>
                </div>
                {/* end navbar */}
                <div class="content mt-4" >
                    <div className="container-fluid mt-5">
                        <div className="glass scroll">
                            <div className="row  text-center">
                                <div className="col-12 mt-2">
                                    {/*Heading*/}
                                    <h1>ALLOCATED SUBJECTS</h1>
                                    <div className="row ">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4 d-flex justify-content-center mb-5">
                                            <div className="breake">
                                            </div>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mb-5">
                                {
                                    this.state.viewTeacherSubjects.map(
                                        subjects =>
                                            <div className="col-md-3 ml-3 mr-3 mt-3 " style={{ cursor: "pointer"}}>
                                                <div className="card bg-info subjectinfo" onClick={e => this.ViewSubjectsInside(e, subjects._id)} onMouseOver="" style={{ cursor: "pointer" }}>
                                                    <div class="card-body" style={{ cursor: "pointer" }}>
                                                        <h1 style={{ cursor: "pointer"}}>{subjects.subject_ID + " " + subjects.subject_Name}</h1>
                                                        <input disabled placeholder={"Grade-" +subjects.allocated_Grade} className="mt-1" style={{ cursor: "pointer"}}/>
                                                        <input disabled placeholder={subjects.subject_Name} className="mt-1" style={{ cursor: "pointer"}}/>
                                                        <input disabled placeholder={subjects.description} className="mt-1" style={{ cursor: "pointer"}}/>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
