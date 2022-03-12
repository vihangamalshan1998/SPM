import React, {Component} from 'react';
import cms from '../services/SchoolManagementSystemServices';
import logo from '../images/Best-School-in-Meerut-1.png'

class ViewMarks extends Component {
    constructor(props){
        super(props)
        this.state = {
            marks: [],
            id : '',
        }
        this.changeStudentIdHandeler = this.changeStudentIdHandeler.bind(this);
    }
    //View marks
    changeStudentIdHandeler = (event) =>{
        if(event.target.value != ""){
            cms.ViewMarks(event.target.value).then((res) =>{
                this.setState({marks : res.data})
            });
        }else{
            console.log("ID is empty")
        }
    }

    render() {
        return (
            <div className={"m-2 reportdiv"} >
                {/*Heading*/}
                <h2 className={"m-2"}>Kidz School</h2>
                <h5 className={"m-2"}>Kidz School, Stanmore Crescent, Colombo 07</h5>
                <img src={logo} className={"reportLogo"}/>
                <br/>
                <h4 className={"m-2"}> Marks Report</h4>
                <div className={"row m-1"}>
                    <div className={"col-sm-6"}>
                        <div className={"row"}>
                            <div className={"col-sm-5"}>
                                Registration Number :
                            </div>
                            <div className={"col-sm-5"}>
                                <div className="form-group">
                                    <input type="email" className="form-control-input" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" value={this.state.StudentId} onChange={this.changeStudentIdHandeler} placeholder="Enter Student  Id here"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <small>{this.state.name}</small>
                <div className={"row m-2"}>
                    {
                        this.state.marks.map(
                            mark =>
                                <div className={"rowFull m-1"} key = {mark.StudentId}>
                                    <div className={"row rowHeader"}>
                                        <div className={"col-sm-3"}>
                                            Student Name : {mark.Name}
                                        </div>
                                        <div className={"col-sm-3"}>
                                           Grade : {mark.Grade}
                                        </div>
                                        <div className={"col-sm-3"}>
                                            Term : {mark.Term}
                                        </div>
                                        <div className={"col-sm-3"}>
                                            Term Status : {mark.status}
                                        </div>
                                    </div>
                                    <table class="table p-1">
                                        <thead>
                                        <tr>
                                            <th scope="col">Subject Name</th>
                                            <th scope="col">Mark</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            mark.marks.map(
                                                row =>
                                                    <tr key = {row._id}>
                                                        <td scope="row">{row.subjectName}</td>
                                                        <td>{row.mark}</td>
                                                    </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        )}
                </div>
                <center>
                    <small >Note : As this is a computer generated sheet, no signature is required.</small>
                </center>
                {/*Report Generation*/}
                <div className={"textNote"}>
                    <i className="fas fa-print m-2 print"  onClick={window.print}></i>
                </div>
            </div>
        );
    }
}

export default ViewMarks;