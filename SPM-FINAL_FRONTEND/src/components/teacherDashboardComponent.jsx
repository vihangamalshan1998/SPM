import React, { Component } from 'react'
import jwt_decord from "jwt-decode";
import service from '../services/SchoolManagementSystemServices'
const Imageurl = "http://localhost:8070/uploads/teachers/";
const StudentImageurl = "http://localhost:8070/uploads/"

export default class teacherDashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // view edit variables
            viewTeacherDatabaseID: jwt_decord(localStorage.getItem("token")).id,
            viewTeacherID: '',
            viewTeacherName: '',
            viewTeacherEmail: '',
            viewTeacherNIC: '',
            viewTeacherGrade: '',
            viewTeacherSubjects: [],
            viewTeacherDescription: '',
            viewTeacherProdilePicture: '',
            EditProdilePicture: '',
            //get allocated Student Varianle
            Student: []
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
    //View Teacher Details
    componentDidMount() {
        service.GetOneTeachers(this.state.viewTeacherDatabaseID).then((res => {
            let OneTeacher = res.data;
            console.log(res.data)
            this.setState({
                viewTeacherID: OneTeacher.teacher_ID,
                viewTeacherName: OneTeacher.teacher_Name,
                viewTeacherEmail: OneTeacher.email,
                viewTeacherNIC: OneTeacher.NIC,
                viewTeacherGrade: OneTeacher.allocated_Grade,
                viewTeacherSubjects: OneTeacher.subject,
                viewTeacherDescription: OneTeacher.description,
                viewTeacherProdilePicture: OneTeacher.profile_Picture
            });
            console.log(this.state.viewTeacherSubjects)
        })).then((res => {
            service.getAllStudentUsingSection(this.state.viewTeacherGrade).then((res => {
                this.setState({ Student: res.data });
            }))
        }))
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
                        <a onClick={this.signout} class="logout_btn">Log Out</a>
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
                    <a className="active" href="/teacherDashboard"><i class="fas fa-desktop mt-4 mb-4"></i><span>Dashboard</span></a>
                    <a href="/allocatedSub"><i class="fa fa-book mt-4 mb-4"></i><span>Subjects</span></a>
                </div>
                {/* end navbar */}
                <div class="content mt-4" >
                    <div className="container-fluid mt-5">
                        <div className="glass scroll">
                            <div className="row text-center">
                                <div className="col-12 mt-2">
                                    <h1>TEACHER DASHBOARD</h1>
                                    <div className="row ">
                                        <div className="col-md-4"></div>
                                        <div className="col-md-4 d-flex justify-content-center mb-3">
                                            <div className="breake">
                                            </div>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="glass2 bg-info mb-2 ml-3 mr-3">
                                    <div className="row ">
                                        <div className="col-12 mt-2 ml-2">
                                            <h5>Details</h5>
                                            <div className="row ">
                                                <div className="col-md-2 mb-2">
                                                    <div className="breake">
                                                    </div>
                                                </div>
                                                <div className="col-md-10"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ml-3 mr-3 mb-3">
                                        <div className="col-md-3 d-flex justify-content-center align-items-center border border-light bg-light rounded">
                                            <img src={Imageurl + this.state.viewTeacherProdilePicture} alt="" srcset="" style={{ width: "100%", height: "80%", zIndex: "revert" }} />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label className="font-weight-bold" htmlFor="">TEACHER ID:-</label>
                                                    <input disabled placeholder={this.state.viewTeacherID} style={{}} />
                                                </div>

                                                <div className="col-md-9">
                                                    <label className="font-weight-bold" htmlFor="">TEACHER NAME:-</label>
                                                    <input disabled placeholder={this.state.viewTeacherName} style={{}} />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-7">
                                                    <label className="font-weight-bold" htmlFor="">EMAIL:-</label>
                                                    <input disabled placeholder={this.state.viewTeacherEmail} style={{}} />
                                                </div>

                                                <div className="col-md-5">
                                                    <label className="font-weight-bold" htmlFor="">NIC:-</label>
                                                    <input disabled placeholder={this.state.viewTeacherNIC} style={{}} />
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label className="font-weight-bold" htmlFor="">ALLOCATED GRAGE:-</label>
                                                    <input disabled placeholder={"Grade-" + this.state.viewTeacherGrade} style={{}} />
                                                </div>
                                                <div className="col-md-8">
                                                    <label className="font-weight-bold" htmlFor="">ALLOCATED SUBJECTS:-</label>
                                                    {
                                                        this.state.viewTeacherSubjects.map(
                                                            subjects =>
                                                                <input disabled placeholder={"Grade-" + subjects.allocated_Grade + ' ' + subjects.subject_Name} className="mt-1" />

                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container  mb-3">
                                <div className="row ">
                                    <div className="col-12 mt-3 ml-2">
                                        <h3>{"GRADE-" + this.state.viewTeacherGrade} STUDENTS</h3>
                                        <div className="row ">
                                            <div className="col-md-2 mb-2">
                                                <div className="breake">
                                                </div>
                                            </div>
                                            <div className="col-md-10"></div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.Student.map(
                                        Student =>
                                            <div className="row bg-info mt-3 ml-3 mr-3 subjectinfo">
                                                <div className="col-md-2 d-flex justify-content-center align-items-center border border-light bg-light rounded mb-3 mt-3 ml-3 mr-3">
                                                    <img src={StudentImageurl + Student.image} alt="" srcset="" style={{ width: "80%", height: "80%" }} />
                                                </div>
                                                <div className="col-md-9 mt-3 mb-3">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <label className="font-weight-bold" htmlFor="">STUDENT ID:-</label>
                                                            <input disabled placeholder={Student.admissionNumber} style={{}} />
                                                        </div>

                                                        <div className="col-md-9">
                                                            <label className="font-weight-bold" htmlFor="">STUDENT NAME:-</label>
                                                            <input disabled placeholder={Student.firstName + " " + Student.lastName}style={{}} />
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-6">
                                                            <label className="font-weight-bold" htmlFor="">ADDRESS:-</label>
                                                            <input disabled placeholder={Student.address} style={{}} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="font-weight-bold" htmlFor="">CLASS NAME:-</label>
                                                            <input disabled placeholder={Student.className} style={{}} />
                                                        </div>
                                                        <div className="col-md-3">
                                                            <label className="font-weight-bold" htmlFor="">DATE OF BIRTH:-</label>
                                                            <input disabled placeholder={Student.dateOfBirth} style={{}} />
                                                        </div>
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
        )
    }
}
