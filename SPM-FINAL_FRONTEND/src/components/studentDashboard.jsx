import React, {Component} from 'react';
import StudentSideNavBar from "./Student-SideNavBar";
import SchoolManagementSystemServices from "../services/SchoolManagementSystemServices";
import AdminHeader from "./AdminHeader";
const imageUrl = "http://localhost:8070/uploads/";
class StudentDashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            notices: [],
            // view edit variables
            viewNoticePicture: '',
            viewTitle: '',
            viewDescription: '',
            ID: ''
        }
    }
    componentDidMount(){
        SchoolManagementSystemServices.getAllNotices().then((res) => {
            this.setState({ notices: res.data});
        });
    }
    signout = (e) =>{
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.clear();
        console.log('helloo');
        this.props.history.push('/');
    }
    //for search notices
    changeNoticeSearchHandler = (notices)=> {
        this.setState({title: notices.target.value});
        SchoolManagementSystemServices.getNoticeByTitle(notices.target.value).then(res=>{
            this.setState({notices : res.data});
        })
    }
    //view notices
    viewNotice(e, noticeId) {
        e.preventDefault();
        SchoolManagementSystemServices.getNoticeByID(noticeId).then((res => {
            let notice = res.data;
            console.log(res.data)
            this.setState({
                ID: notice._id,
                viewNoticePicture: notice.image,
                viewTitle: notice.title,
                viewDescription: notice.description
            });
            console.log(this.state.ID);
        }))
    }
    render() {
        return (
            <div className="background">
                <div className="row">
                    <div className="col-sm-3">
                        <StudentSideNavBar/>
                    </div>
                    <div className="col-sm-9">
                        <AdminHeader />
                        <nav className="navbar navbar-expand-lg navbar-light bg-warning m-2">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="#">Student Dashboard</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Filter by Title" aria-label="Search" name="searchQuery"aria-label="Search" value={this.state.title} onChange={this.changeNoticeSearchHandler}/>
                                        <button onClick={this.signout} className="btn btn-danger" type="submit">Logout</button>
                                    </form>

                                </div>
                            </div>
                        </nav>
                        <br/>
                        <div className="container">
                            <div className="row">
                                {/*Header*/}
                                <h3>My Dashboard</h3>
                            </div>
                        </div>
                        <div className="container" style={{overflowY: "scroll", height:"500px"}}>
                            <div className="row">
                                {
                                    this.state.notices.map(
                                        notices =>
                                            <div className="col-md-4">
                                                <div className="card mt-3 sellercard p-2" style={{height:"95%"}}>
                                                    <div className="product text-center mt-3">
                                                        <div className="mt-3 info">
                                                            <img src={imageUrl+notices.image} style={{height:"200px",width:"100%"}}/>
                                                        </div>
                                                        <div className="mt-3 info">
                                                            <h5>{notices.title}</h5>
                                                        </div>
                                                        <div className="mt-3 info">
                                                            <span className="text1 d-block mb-3">{notices.description}</span>
                                                        </div>
                                                        <div className="mt-3 info">
                                                            <button className="btn btn-warning btn-block" data-bs-toggle="modal" data-bs-target="#staticBackdropNoticeUpdate" onClick={e => this.viewNotice(e, notices._id)}>
                                                                <i className="fas fa-edit"></i>&nbsp;
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                                <br/>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                {/*View Notice Details and Update*/}
                                <div className="modal fade" id="staticBackdropNoticeUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabelNoticeUpdate" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabelNoticeUpdate">Update Notice Details</h5>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <center>
                                                        <div className="mb-3">
                                                            <img src={imageUrl + this.state.viewNoticePicture} alt="" srcSet="" style={{width: "100%", height: "80%", zIndex: "revert"}}/>
                                                        </div>
                                                    </center>
                                                    <div className="mb-3">
                                                        <label className="form-label"><i className="fa fa-user-o" aria-hidden="true"></i>&nbsp;
                                                            Notice Info
                                                        </label>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="input-group mb-3">
                                                            <input type="text" value={this.state.viewTitle} className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="input-group mb-3">
                                                            <textarea type="text" value={this.state.viewDescription} className="form-control" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                    <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                                                    Cancel
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <br/>
                        <div className="container">
                            <div className="row">
                                {/*Accordion*/}
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                School Management System:
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                             data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <strong>A School Management System is an information management system for educational
                                                    institutions to manage all student's data. It provides abilities such as registration of
                                                    students in classes, documenting of grades and analytical marks of each student and other
                                                    evaluation elements </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Marks:
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                             data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <strong>
                                                    Thousands of education organisations today use fragmented school management systems and software
                                                    platforms to manage their administrative and learning activities.
                                                    This system provides a solution that unifies them all in one simple and beautiful platform.
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                IMPORTANT:
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                             data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <strong>
                                                    Thousands of education organisations today use fragmented school management systems and software
                                                                 platforms to manage their administrative and learning activities.
                                                                 This system provides a solution that unifies them all in one simple and beautiful platform.
                                                </strong>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

export default StudentDashboard;