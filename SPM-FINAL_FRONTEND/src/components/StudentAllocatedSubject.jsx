import React, { Component } from 'react'
import jwt_decord from "jwt-decode";
import service from '../services/SchoolManagementSystemServices'
import StudentSideNavBar from "./Student-SideNavBar";

export default class StudentAllocatedSubject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // view edit variables
            viewTeacherDatabaseID: jwt_decord(localStorage.getItem("token")).id,
            grade: jwt_decord(localStorage.getItem("token")).section,
            viewstudentSubjects: []

        }
    }
    componentDidMount() {
        service.getAllsubjectUsingSection(this.state.grade).then((res => {
            this.setState({
                viewstudentSubjects: res.data
            });
            console.log(this.state.viewTeacherSubjects)

        }))
    }
    ViewSubjectsInside(e, subjectid) {
        e.preventDefault();
        this.props.history.push('/Studentsubjectdetails/' + subjectid);

    }
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <StudentSideNavBar />
                        </div>
                        <div className="col-md-10">
                                <div className="container-fluid mt-5">
                                    <div className="glass scroll">
                                        <div className="row  text-center">
                                            <div className="col-12 mt-2">
                                            <h1>ALLOCATED SUBJECTS FOR GRADE {this.state.grade }</h1>
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
                                            this.state.viewstudentSubjects.map(
                                                    subjects =>
                                                        <div className="col-md-3 ml-3 mr-3 mt-3 " style={{ cursor: "pointer" }}>
                                                            <div className="card bg-info subjectinfo" onClick={e => this.ViewSubjectsInside(e, subjects._id)} onMouseOver="" style={{ cursor: "pointer" }}>
                                                                <div class="card-body" style={{ cursor: "pointer" }}>
                                                                    <h1 style={{ cursor: "pointer" }}>{subjects.subject_ID + " " + subjects.subject_Name}</h1>
                                                                    <input disabled placeholder={"Grade-" + subjects.allocated_Grade} className="mt-1" style={{ cursor: "pointer" }} />
                                                                    <input disabled placeholder={subjects.subject_Name} className="mt-1" style={{ cursor: "pointer" }} />
                                                                    <input disabled placeholder={subjects.description} className="mt-1" style={{ cursor: "pointer" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}
