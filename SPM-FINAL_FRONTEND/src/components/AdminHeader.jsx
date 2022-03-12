import React, {Component} from 'react';
import ukFlag from "../images/uk.png";
import jwt_decord from "jwt-decode";
class AdminHeader extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: jwt_decord(localStorage.getItem("token")).name
        }
    }
    render() {
        return (
            <div className="row headerBody" >
                <div className="col-sm-3 mt-2">
                    <ul className="adHeaderIcon">
                        <li><i className="fas fa-bars"></i></li>
                        <li><i className="far fa-bell"></i></li>
                        <li><i className="far fa-envelope"></i></li>
                        <li><i className="far fa-comment-alt"></i></li>
                        <li><i className="fas fa-calendar-week"></i></li>
                    </ul>
                </div>
                <div className="col-sm-5 mt-2">
                    <input  className="dashSearch" style={{width:"100%"}} type="text" placeholder="Search by student, teacher, class, etc.."/>
                </div>
                <div className="col-sm-4 headerRightColumn">
                    <ul className="mt-2 adHeaderIcon">
                        <li>
                            <img className="ukFlag" src={ukFlag} />
                            <small className="p-2 text-muted">English</small>
                        </li>
                        <li>
                            <small className="p-2 text-muted"><i style={{color:"green"}} className="fas fa-dot-circle p-2"></i>{this.state.name}</small>
                            <i className="fas fa-user-alt"></i>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AdminHeader;