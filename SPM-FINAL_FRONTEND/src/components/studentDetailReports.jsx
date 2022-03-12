import React, {Component} from 'react';
import { saveAs } from 'file-saver';
import axios from "axios";
import AdminSideNavBar from "./Admin-SideNavBar";
import {Table} from "react-bootstrap";
import SchoolManagementSystemServices from "../services/SchoolManagementSystemServices";
import AdminHeader from "./AdminHeader";
const imageUrl = "http://localhost:8070/uploads/";


const sections = [
    {
        label : "Grade 1",
        value : 1
    },
    {
        label : "Grade 2",
        value : 2
    },
    {
        label : "Grade 3",
        value : 3
    },
    {
        label : "Grade 3",
        value : 3
    },
    {
        label : "Grade 4",
        value : 4
    },
    {
        label : "Grade 5",
        value : 5
    },
    {
        label : "Grade 6",
        value : 6
    },
    {
        label : "Grade 7",
        value : 7
    },
    {
        label : "Grade 8",
        value : 8
    },
    {
        label : "Grade 9",
        value : 9
    },
    {
        label : "Grade 10",
        value : 10
    },
    {
        label : "Grade 11",
        value : 11
    },
    {
        label : "Grade 12",
        value : 12
    },
    {
        label : "Grade 13",
        value : 13
    },
]
const className = [
    {
        label : "1-A",
        value : "1-A"
    },
    {
        label : "1-B",
        value : "1-B"
    },
    {
        label : "2-A",
        value : "2-A"
    },
    {
        label : "2-B",
        value : "2-B"
    },
    {
        label : "3-A",
        value : "3-A"
    },
    {
        label : "3-B",
        value : "3-B"
    },
    {
        label : "4-A",
        value : "4-A"
    },
    {
        label : "4-B",
        value : "4-B"
    },
    {
        label : "5-A",
        value : "5-A"
    },
    {
        label : "5-B",
        value : "5-B"
    },
    {
        label : "6-A",
        value : "6-A"
    },
    {
        label : "6-B",
        value : "6-B"
    },
    {
        label : "7-A",
        value : "7-A"
    },
    {
        label : "7-B",
        value : "7-B"
    },{
        label : "8-A",
        value : "8-A"
    },
    {
        label : "8-B",
        value : "8-B"
    },
    {
        label : "9-A",
        value : "9-A"
    },
    {
        label : "9-B",
        value : "9-B"
    },
    {
        label : "10-A",
        value : "10-A"
    },
    {
        label : "10-B",
        value : "10-B"
    },
    {
        label : "11-A",
        value : "11-A"
    },
    {
        label : "11-B",
        value : "11-B"
    },
    {
        label : "12-A",
        value : "12-A"
    },
    {
        label : "12-B",
        value : "12-B"
    },
    {
        label : "13-A",
        value : "13-A"
    },
    {
        label : "13-B",
        value : "13-B"
    }

]
class StudentDetailReports extends Component {
    constructor(props){
        super(props)
        this.state = {
            students: [],
            SectionType : '',
            ClassType : ''
        }
    }
    componentDidMount(){
        SchoolManagementSystemServices.getAllStudents().then((res) => {
            this.setState({ students: res.data});
        });
    }

    changeAdmissionHandler = (students)=> {
        this.setState({admissionNumber: students.target.value});
        SchoolManagementSystemServices.getStudentByAdmissionNumber(students.target.value).then(res=>{
            this.setState({students : res.data});
        })
    }
    changeSectionHandler = (students)=> {
        this.setState({SectionType: students.target.value});
        SchoolManagementSystemServices.getStudentBySection(students.target.value).then(res=>{
            this.setState({students : res.data});
        })
    }
    changeClassHandler = (students)=> {
        this.setState({ClassType: students.target.value});
        SchoolManagementSystemServices.getStudentByClass(students.target.value).then(res=>{
            this.setState({students : res.data});
        })
    }
    changeNameHandler = (students)=> {
        this.setState({firstName: students.target.value});
        SchoolManagementSystemServices.getStudentByName(students.target.value).then(res=>{
            this.setState({students : res.data});
        })
    }
    createAndDownloadPdf=(e)=>{
        e.preventDefault();
        console.log(this.state.students);
        axios.post('http://localhost:8070/students/create-pdf', this.state)
        .then(() => axios.get('http://localhost:8070/students/getpdf', { responseType: 'blob' }).then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
            saveAs(pdfBlob, 'StudentDetailReport.pdf')
        }))
    }
    signout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.clear();
        console.log('helloo');
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="background">
                <div className="row">
                    {/*Admin Side Navigation Bar*/}
                    <div className="col-sm-3">
                        <AdminSideNavBar/>
                    </div>
                    <div className="col-sm-9">
                        <AdminHeader />
                        {/*Notices Management Navigation Bar*/}
                        <nav className="navbar navbar-expand-lg navbar-light bg-warning m-2">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/adminStudentDashboard">Student Management</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/adminStudentDashboard">View Students</a>
                                        </li>
                                    </ul>
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search by Admission" aria-label="Search" name="searchQuery"aria-label="Search" value={this.state.admissionNumber} onChange={this.changeAdmissionHandler}/>
                                        <button onClick={this.signout} className="btn btn-danger" type="submit">Logout</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                        <br/>
                        <div className="container">
                            <div className="row">
                                {/*Header*/}
                                <h3>Student Detail Reports</h3>
                            </div>
                        </div>
                        <div className="container p-2"style={{backgroundColor:"orange"}}>
                            <div className="row">
                                <div className="col-md-3">

                                    <button className="btn btn-success" onClick={e => this.createAndDownloadPdf(e)}><i className="fas fa-download" ></i>&nbsp;
                                        Download</button>
                                </div>
                                <div className="col-md-3" >
                                    <select className="custom-select" style={{height:"40px",width:"100%"}} value={this.state.SectionType} onChange={this.changeSectionHandler}>
                                        <option selected>Select by Section</option>
                                        {
                                            sections.map((option) =>(
                                                <option value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <select className="custom-select" style={{height:"40px",width:"100%"}} value={this.state.ClassType} onChange={this.changeClassHandler}>
                                        <option selected>Select by Class</option>
                                        {
                                            className.map((option) =>(
                                                <option value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <input className="form-control" placeholder="Search by Name or ID" aria-label="Search" name="searchQuery"aria-label="Search" value={this.state.firstName} onChange={this.changeNameHandler}/>
                                </div>

                            </div>
                        </div>
                        <br/>
                        <div className="container">
                            <div className="row">
                                {/*Report Content*/}
                                        <Table responsive className="table" striped bordered hover>
                                            <thead>
                                            <tr>

                                                <th scope="col">Profile Picture</th>
                                                <th scope="col">Admission Number</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Section</th>
                                                <th scope="col"> Class</th>
                                                <th scope="col"> Gender</th>
                                                <th scope="col"> Date of Birth</th>
                                                <th scope="col"> Mobile Number</th>
                                                <th scope="col"> Email</th>
                                                <th scope="col"> Address</th>
                                                <th scope="col"> Guardian Name</th>
                                                <th scope="col"> Guardian Relationship</th>
                                                <th scope="col"> Guardian Mobile Number</th>
                                                <th scope="col"> Guardian Email</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.students.map(
                                                    student =>
                                                        <tr key = {student._id}>
                                                            <td><img src={imageUrl+student.image} style={{height:"100px",width:"100px"}}/></td>
                                                            <td> {student.admissionNumber}</td>
                                                            <td> {student.firstName+" "+student.lastName}</td>
                                                            <td> {student.section}</td>
                                                            <td> {student.className}</td>
                                                            <td> {student.gender}</td>
                                                            <td> {student.dateOfBirth}</td>
                                                            <td> {student.mobileNumber}</td>
                                                            <td> {student.email}</td>
                                                            <td> {student.address}</td>
                                                            <td> {student.guardianName}</td>
                                                            <td> {student.guardianRelationship}</td>
                                                            <td> {student.guardianMobileNumber}</td>
                                                            <td> {student.guardianEmail}</td>
                                                            <br/><br/><br/>
                                                        </tr>
                                                )
                                            }
                                            </tbody>
                                        </Table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default StudentDetailReports;