import React, {Component} from 'react';
import Adm from "./Admin-SideNavBar";
import AdminHeader from "./AdminHeader";
import SchoolManagementSystemServices from "../services/SchoolManagementSystemServices";

class AttendanceMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Students:[],
            status:'',
            cName:''
        }
        this.changeClassnameHander = this.changeClassnameHander.bind(this);
    }
    //View Details
    ViewDetails(e,admissionNumber){
        e.preventDefault();
        this.setState({
            stID : admissionNumber
        }
        )
    }
    //Handlers
    changeClassnameHander = (event) =>{
        this.setState({cName : event.target.value});
    }
    changeStatus = (event) => {
        this.setState({ status: event.target.value });
    }
    //View Student
    VIewStudents = (e) =>{
        e.preventDefault();
        if(this.state.cName != ""){
            SchoolManagementSystemServices.GetAllStudentsForAttendanceMark(this.state.cName).then((res) => {
                this.setState({ Students: res.data});
            });
        }else{
            alert("Class Name is empty!")
        }
    }
    //Save Details
    saveChanges =(e) =>{
        e.preventDefault();
        let attendance = {StudentId : this.state.stID, status : this.state.status, className : this.state.cName}
        SchoolManagementSystemServices.MarkAttendance(attendance).then(()=>{
            this.props.history.push("/MarkAttendance");
        })
    }
    render() {
        return (
            <div className="row background">
                <div className="col-sm-3">
                    <Adm />
                </div>
                <div className="col-sm-9">
                    <AdminHeader />
                    <div className="row">
                        {/*Heading*/}
                        <h3><b>Mark Attendance</b></h3>
                    </div>
                    <div className="row m-2 searchRow">
                        <div className="col-sm-5">
                            <input type="text" className="form-control" onChange={this.changeClassnameHander} value={this.state.cName} placeholder="Search By Class ID" aria-label="Username"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="col-sm-3">
                            <button className="MarkAttendanceSearch" onClick={this.VIewStudents}>Search</button>
                        </div>
                        <div className="col-sm-3 ">
                            <div className="dropdown dropdownBtn">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select Attendance Options
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="/ViewAttendance">View Attendance</a></li>
                                    <li><a className="dropdown-item" href="#">Generate Reports</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <h6>Students List</h6>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.Students.map(
                                student =>
                                    <div  className="col-sm-6  m-2 card" onClick={e => this.ViewDetails(e,student.admissionNumber)} data-bs-toggle="modal" data-bs-target="#exampleModal" key = {student.admissionNumber }>
                                        <p className={"m-2"}>{student.admissionNumber}</p>
                                        <p className={"m-2"}>{student.firstName + " " + student.lastName}</p>
                                    </div>
                            )
                        }
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Mark Attendance</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input type="text" className="form-control m-2" placeholder="Student ID "
                                           aria-label="Student ID" aria-describedby="basic-addon1" value={this.state.stID}/>
                                    <div className="input-group mb-3">
                                        <select className="custom-select" name="point" type="allocated_Grade" placeholder={"Allocated Grade"}
                                                onChange={this.changeStatus}>
                                            <option selected>Choose...</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    {/*Close Button*/}
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/*Save Button*/}
                                    <button type="button" class="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*    End Second column*/}
            </div>
        );
    }
}

export default AttendanceMark;