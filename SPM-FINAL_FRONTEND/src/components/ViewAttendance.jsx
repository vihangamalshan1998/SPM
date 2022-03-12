import React, {Component} from 'react';
import Adm from "./Admin-SideNavBar";
import AdminHeader from "./AdminHeader";
import SchoolManagementSystemServices from "../services/SchoolManagementSystemServices";

class ViewAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Students:[],
            status:'',
        }
        this.changeClassnameHander = this.changeClassnameHander.bind(this);
    }
    //Handlers
    changeStatus = (event) => {
        this.setState({ status: event.target.value });
    }
    changeClassnameHander = (event) =>{
        this.setState({cName : event.target.value});
    }
    //View Details
    ViewDetails(e,admissionNumber,AtId){
        e.preventDefault();
        this.setState({
                stID : admissionNumber,
                attId : AtId
            }
        )
    }
    //Save Details
    saveChanges =(e) =>{
        e.preventDefault();
        console.log(this.state.attId,this.state.status)
        let attendance = {_id : this.state.attId,StudentId : this.state.stID, status : this.state.status,className:this.state.cName}
        SchoolManagementSystemServices.UpdateAttendance(attendance).then(()=>{
            this.props.history.push("/ViewAttendance");
        })
    }

    deleteAttendance(e,attId){
        e.preventDefault();
        SchoolManagementSystemServices.DeleteAttendance(attId).then(r => {
            this.props.history.push("/MarkAttendance");
        }).catch((err)=>{
            alert("Can not delete" + attId);
        })
    }
    //View students
    VIewStudents = (e) =>{
        e.preventDefault();
        if(this.state.cName != ""){
            SchoolManagementSystemServices.ViewAttendance(this.state.cName).then((res) => {
                this.setState({ Students: res.data});
            });
        }else{
            alert("Class Name is empty!")
        }
    }
    render() {
        return (
            <div className="row bg-light background">
                <div className="col-sm-3">
                    <Adm />
                </div>
                <div className="col-sm-9">
                    <AdminHeader />
                    <div className="row">
                        <h3><b>View Attendance</b></h3>
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
                                    <div className="col-sm-6 bg-warning m-2"  key = {student._id }>
                                        <div className="row">
                                            <div className="col-sm-9">
                                                <p className={"m-2"}><b>Student Admission Number </b>: {student.StudentId}</p>
                                                <p className={"m-2"}><b>Date </b>: {student.date}</p>
                                                <p className={"m-2"}><b>Status  </b>: {student.status}</p>
                                            </div>
                                            <div className="col-sm-3 mt-4">
                                                <i onClick={e => this.deleteAttendance(e,student._id)} className="removeIcon fas fa-minus-circle"></i>
                                                <i className="editIcon fas fa-edit" onClick={e => this.ViewDetails(e,student.StudentId,student._id)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                            </div>
                                        </div>
                                    </div>
                            )
                        }
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Attendance</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control m-2" placeholder="Student ID "
                                           aria-label="Student ID" aria-describedby="basic-addon1"
                                           value={this.state.stID}/>
                                    <div className="input-group mb-3">
                                        <select className="custom-select" name="point" type="allocated_Grade"
                                                placeholder={"Allocated Grade"}
                                                onChange={this.changeStatus}>
                                            <option selected>Choose...</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    {/*Close Button*/}
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    {/*Save Button*/}
                                    <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save
                                        changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default ViewAttendance;