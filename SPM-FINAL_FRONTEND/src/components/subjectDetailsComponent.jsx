import React, { Component } from 'react'
import service from '../services/SchoolManagementSystemServices'
import axios from 'axios';
import Swal from 'sweetalert2';
const Imageurl = "http://localhost:8070/uploads/LectureSlides/";

export default class subjectDetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // view variables
            viewSubjectDatabaseID: this.props.match.params.id,
            viewSubjectID: '',
            viewSubjectName: '',
            viewSubjectGrade: '',
            viewSubjectDescription: '',

            // form Variables
            Topic: '',
            Description: '',
            type: '',
            filename: '',

            //get all details variables
            allLectures: [],
            notices: [],
        }
    }
    //add handler
    changeLectureSlidesToipcHandler = (event) => {
        this.setState({ Topic: event.target.value });
    }
    changeLectureSlidesDescriptionHandler = (event) => {
        this.setState({ Description: event.target.value });
    }
    changeLectureSlidestypeHandler = (event) => {
        this.setState({ type: event.target.value });
    }
    changeFilenameHandler = (event) => {
        this.setState({ filename: event.target.files[0] });
    }
    //get all lecture notices
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
    //sign out
    signout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.clear();
        console.log('helloo');
        this.props.history.push('/');
    }
    //add a notice
    addNotice = (e) => {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-5',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Add New Notice?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.Topic !== "" && this.state.Description !== '') {

                    const refreshPage = () => {
                        window.location.reload();
                    }
                    let LectureNotice = {
                        subject_ID: this.state.viewSubjectDatabaseID,
                        Topic: this.state.Topic,
                        Description: this.state.Description,
                        type: "Notice"
                    };
                    console.log('LectureNotice => ' + JSON.stringify(LectureNotice));

                    service.addNewLectueNotice(LectureNotice).then(res => {
                        this.props.history.push('/subjectdetails/' + this.state.viewSubjectDatabaseID);
                        refreshPage();
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'All Input Fields Should Fill!'
                    })
                }
            }
        })
    }

    //add lecture slides
    addLectureSlides = (e) => {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-5',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Add New Lecture Slides?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.state.Topic !== "" && this.state.Description !== '' && this.state.filename !== '') {
                    const formData = new FormData();
                    formData.append('subject_ID', this.state.viewSubjectDatabaseID);
                    formData.append('Topic', this.state.Topic);
                    formData.append('Description', this.state.Description);
                    formData.append('type', "LectureSlides");
                    formData.append('lectureslide', this.state.filename);
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    };
                    const refreshPage = () => {
                        window.location.reload();
                    }
                    axios.post("http://localhost:8070/lectureslides/addlectures", formData, config).then(res => {
                        this.props.history.push('/subjectdetails/' + this.state.viewSubjectDatabaseID);
                        refreshPage();
                    })
                    console.log(this.state.subject)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'All Input Fields Should Fill!'
                    })
                }
            }
        })
    }
    //delete notice
    deletenotice(e, id) {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-5',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Delete This Data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                service.Deleteleturenotice(id).then(res => {
                    this.props.history.push('/subjectdetails/' + this.state.viewSubjectDatabaseID);
                    window.location.reload();
                });
            }
        })
    }
    deletelectureslides(e, id, lectureslide) {
        e.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-5',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to Delete This Data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                service.Deletelectureslides(id, lectureslide).then(res => {
                    this.props.history.push('/subjectdetails/' + this.state.viewSubjectDatabaseID);
                    window.location.reload();
                });
            }
        })
    }
    render() {
        return (
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
                    <a href="/teacherDashboard"><i class="fas fa-desktop mt-4 mb-4"></i><span>Dashboard</span></a>
                    <a href="/allocatedSub"><i class="fa fa-book mt-4 mb-4"></i><span>Subjects</span></a>
                </div>

                <div class="content mt-4" >
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
                            <div className="row  d-flex justify-content-center">
                                <div className="col-md-6"></div>
                                <div className="col-md-3">
                                    <button type="button" class="btn btn-warning btn-block" data-toggle="modal" data-target="#exampleModalCenter">
                                        ADD NOTICE
                                    </button>
                                </div>
                                <div className="col-md-3">
                                    <button type="button" class="btn btn-warning btn-block" data-toggle="modal" data-target="#exampleModalCenter1">
                                        ADD LECTURE SLIDES
                                    </button>
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
                                                        <div className="row mt-2">
                                                            <div className="col-md-10"></div>
                                                            <div className="col-md-2">
                                                                <button className="d-flex justify-content-center btn btn-danger fa fa-trash" onClick={e => this.deletenotice(e, notices._id)}></button>
                                                            </div>
                                                        </div>
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
                                                            <div className="col-md-9 mt-3">
                                                                <textarea placeholder="Description" class="form-control" name="description"
                                                                    rows="2" value={allLectures.Description} disabled />
                                                            </div>
                                                            <div className="col-md-3 d-flex align-items-center">
                                                                <div className="col-md-1 mt-3">
                                                                    <div className="row d-flex justify-content-center mt-1 ">
                                                                        <div className="col-12">
                                                                            <a href={Imageurl + allLectures.lectureslide} target="_blank"><button className=" btn btn-success fa fa-cloud-download">Download Slide</button></a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row d-flex justify-content-center mt-1 ml-3">
                                                                        <div className="col-md-4"></div>
                                                                        <div className="col-md-4">
                                                                            <button className="btn btn-danger fa fa-trash" onClick={e => this.deletelectureslides(e, allLectures._id, allLectures.lectureslide)}>Delete Details</button>
                                                                        </div>
                                                                        <div className="col-md-4"></div>
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
                {/* form modal 1*/}
                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title " id="exampleModalLongTitle">ADD NOTICE</h1>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="glass bg-info mb-2 ml-3 mr-3">
                                    <form className="form-container">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 ml-2 mr-2 mt-3">
                                                <div className="form-group">
                                                    <h5>Notice Topic</h5>
                                                    <input placeholder="Toipc" name="subject_ID" className="form-control"
                                                        value={this.state.Topic} onChange={this.changeLectureSlidesToipcHandler} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 ml-2 mr-2 mt-3">
                                                <div className="form-group">
                                                    <h5>Description</h5>
                                                    <textarea placeholder="Description" class="form-control" name="description"
                                                        rows="3" value={this.state.Description} onChange={this.changeLectureSlidesDescriptionHandler} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" onClick={this.addNotice}>Add Notice</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* form modal 2*/}
                <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title " id="exampleModalLongTitle">ADD LECTURE SLIDES</h1>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="glass bg-info mb-2 ml-3 mr-3">
                                    <form className="form-container">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 ml-2 mr-2 mt-3">
                                                <div className="form-group">
                                                    <h5>Topic</h5>
                                                    <input placeholder="Toipc" name="subject_ID" className="form-control"
                                                        value={this.state.Topic} onChange={this.changeLectureSlidesToipcHandler} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 ml-2 mr-2 mt-3">
                                                <div className="form-group">
                                                    <h5>Description</h5>
                                                    <textarea placeholder="Description" class="form-control" name="description"
                                                        rows="3" value={this.state.Description} onChange={this.changeLectureSlidesDescriptionHandler} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-11 ml-2 mr-2 mt-3">
                                                <div className="form-group">
                                                    <h5>Lecture Slide</h5>
                                                    <input className="form-control bg-primary mt-2 mb-3" type="file" name="profile_Picture"
                                                        onChange={this.changeFilenameHandler} /> {console.log(this.state.profile_Picture)}
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" onClick={this.addLectureSlides}>Add Details</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
