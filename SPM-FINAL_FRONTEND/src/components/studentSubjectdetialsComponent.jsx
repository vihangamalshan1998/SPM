import React, { Component } from 'react'
import service from '../services/SchoolManagementSystemServices'
import StudentSideNavBar from "./Student-SideNavBar";
const Imageurl = "http://localhost:8070/uploads/LectureSlides/";

export default class studentSubjectdetialsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // view variables
            viewSubjectDatabaseID: this.props.match.params.id,
            viewSubjectID: '',
            viewSubjectName: '',
            viewSubjectGrade: '',
            viewSubjectDescription: '',

            //get all details variables
            allLectures: [],
            notices: [],
        }
    }
    componentDidMount() {
        service.getalllecturenotices(this.state.viewSubjectDatabaseID).then((res => {
            this.setState({ notices: res.data });
            console.log(this.state.notices)
        })).then((res => {
            service.getalllectureslides(this.state.viewSubjectDatabaseID).then((res => {
                this.setState({ allLectures: res.data })
                console.log(this.state.allLectures)
            }))
        })).then((res => {
            service.GetOneSubject(this.state.viewSubjectDatabaseID).then(res => {
                let OneSubect = res.data;
                console.log(res.data)
                this.setState({
                    viewSubjectID: OneSubect.subject_ID,
                    viewSubjectName: OneSubect.subject_Name,
                    viewSubjectGrade: OneSubect.allocated_Grade,
                    viewSubjectDescription: OneSubect.description
                });
                console.log(this.state.viewSubjectDatabaseID)
            })
        }
        ))
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
                                            <h1>{this.state.viewSubjectName + " " + "(Grade-" + this.state.viewSubjectGrade + ")"}</h1>
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
                                    
                                    <div className="row text-center d-flex justify-content-center mb-2">
                                        <div className="col-md-4">
                                            <h1>Subject Notices</h1>
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="col-md-2"></div>

                                    </div>
                                    <div className="row d-flex justify-content-center mb-5">
                                        {
                                            this.state.notices.map(
                                                notices =>
                                                    <div className="col-md-5 ml-3 mr-3 mt-2 " style={{ cursor: "pointer" }}>
                                                        <div className="card bg-info subjectinfo" >
                                                            <div class="card-body" style={{ cursor: "pointer" }}>
                                                                <h5>{notices.Topic} </h5>
                                                                <textarea placeholder="Description" class="form-control" name="description"
                                                                    rows="2" value={notices.Description} disabled />
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                            )
                                        }
                                    </div>
                                    <div className="row text-center d-flex justify-content-center mb-3">
                                        <div className="col-md-4">
                                            <h1>Lecture Slides</h1>
                                        </div>
                                        <div className="col-md-6"></div>
                                        <div className="col-md-2"></div>

                                    </div>
                                    <div className="row d-flex justify-content-center mb-5">
                                        {
                                            this.state.allLectures.map(
                                                allLectures =>
                                                    <div className="col-md-10 ml-3 mr-3 mt-2 " style={{ cursor: "pointer" }}>
                                                        <div className="card bg-info subjectinfo" >
                                                            <div class="card-body" style={{ cursor: "pointer" }}>
                                                                <h5>{allLectures.Topic} </h5>
                                                                <div className="row">
                                                                    <div className="col-md-10 mt-3">
                                                                        <textarea placeholder="Description" class="form-control" name="description"
                                                                            rows="2" value={allLectures.Description} disabled />
                                                                    </div>
                                                                    <div className="col-md-2 d-flex align-items-center">
                                                                        <div className="col-md-1 mt-3">
                                                                            <div className="row d-flex justify-content-center mt-1 ">
                                                                                <div className="col-12">
                                                                                    <a href={Imageurl + allLectures.lectureslide} target="_blank"><button className=" btn btn-success fa fa-cloud-download">Download Slides</button></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
                </div>
            </div>
        )
    }
}
