import React, {Component} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Adm from "../components/Admin-SideNavBar"
import AdminHeader from "../components/AdminHeader";
import studentImg from "../images/studentImg.png"
import teacher from "../images/TeacherImg.png"
import income from "../images/income.jpg"
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDateTime: Date().toLocaleString()
        }
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
            <div className="container-fluid background dashBody">
                <div className="row">
                    <div className="col-sm-3" style={{height:"100%"}}>
                        <Adm />
                    </div>
                    {/*Page Header*/}
                    <div className="pt-2 col-sm-9">
                        <AdminHeader />
                        <div className="row mt-2">
                            <div className="col-sm-3">
                                <h5 className="m-2">My Dashboard</h5>
                            </div>
                            <div className="col-sm-9 dashSecondColumn">
                                <ul className="buttonList">
                                    <li><small className="DashDateTime text-muted">{this.state.currentDateTime }</small></li>
                                    <li> <p className="shareButton">Share</p></li>
                                    <li> <button onClick={this.signout} className="btn btn-danger" type="submit">Logout</button> </li>
                                </ul>
                            </div>
                        </div>
                        {/*End page Header*/}

                        {/*Card views*/}
                        <div className="row">
                            {/*1st card view*/}
                            <div className="col-sm-4">
                                <div className="card DashCard1">
                                    <div className="row cardButtonRow">
                                        <div className="col-sm-4">
                                            <p className="crd1Details">1600 pass</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <p className="crd1Details">1250 pass</p>
                                        </div>
                                        <div className="col-sm-4">
                                            <p className="crd1Details">1 sport</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End 1st card view*/}

                            {/*Student Card View*/}
                            <div className="col-sm-2">
                                <div className="card DashCard2">
                                    <center>
                                        <img className="imgStudent" src={studentImg}/>
                                        <h6 className="StudentTopic">Students</h6>
                                        <small className="text-warning">+2200</small>
                                    </center>
                                </div>
                            </div>
                            {/*End Student Card View*/}

                            {/*Teacher Card View*/}
                            <div className="col-sm-2">
                                <div className="card DashCard3">
                                    <center>
                                        <img className="imgStudent" src={teacher}/>
                                        <h6 className="StudentTopic">Teachers</h6>
                                        <small className="text-success">+150</small>
                                    </center>
                                </div>
                            </div>
                            {/*End teacher card view*/}

                            {/*Income card view*/}
                            <div className="col-sm-4">
                                <div className="card DashCard4">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img className="imgStudent m-2" src={income} />
                                        </div>
                                        <div className="col-sm-7 mt-2 incomeCard">
                                            <h6 className="StudentTopic">Total Income</h6>
                                            <small className="text-muted">$160750</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End income card view*/}
                        </div>
                        {/*End Card views*/}

                        {/*body*/}
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="row">
                                    <h6 className="mt-2">Student List</h6>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <h6 className="mt-2"> Calender </h6>
                                    <Calendar />
                                </div>
                            </div>
                        </div>
                        {/* end body */}

                    </div>
                    {/*End Page Second Column */}
                </div>
                {/* End 1st Row   */}
            </div>
        //End Container
        );
    }
}

export default AdminDashboard;