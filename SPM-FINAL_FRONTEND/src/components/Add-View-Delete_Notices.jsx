import React, {Component} from 'react';
import AdminSideNavBar from "./Admin-SideNavBar";
import axios from "axios";
import SchoolManagementSystemServices from "../services/SchoolManagementSystemServices";
import AdminHeader from "./AdminHeader";
const imageUrl = "http://localhost:8070/uploads/";

class AddViewDeleteNotices extends Component {
    constructor(props){
        super(props)
        this.state = {
            notices: [],
            image: '',
            title: '',
            description: '',
            // view edit variables
            viewNoticePicture: '',
            viewTitle: '',
            viewDescription: '',
            EditNoticePicture: '',
            ID: ''
        }
        //add notice handlers
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        //edit notice handlers
        this.EditChangeNoticePictureHandler = this.EditChangeNoticePictureHandler.bind(this);
        this.EditTitleHandler = this.EditTitleHandler.bind(this);
        this.EditDescriptionHandler = this.EditDescriptionHandler.bind(this);

    }
    //add Notice
    addNotice = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const refreshPage = () => {
            window.location.reload();
        }
        if(this.state.title !=='' && this.state.description !=='' && this.state.image !==''){
            axios.post("http://localhost:8070/notices/addNotices", formData, config).then(res => {
                this.props.history.push('/notices');
                refreshPage();
            })
        }else{
            alert("Cannot leave empty field");
        }
    }
    //for search notices
    changeNoticeSearchHandler = (notices)=> {
        this.setState({title: notices.target.value});
        SchoolManagementSystemServices.getNoticeByTitle(notices.target.value).then(res=>{
            this.setState({notices : res.data});
        })
    }
    //delete notice
    delete(id){
       SchoolManagementSystemServices.deleteNotice(id).then(res=>{
            this.setState({notices: this.state.notices.filter(notice => notice._id !==id)});
        })
    }
    //view notice
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
    //update notice
    editNotice = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.viewTitle);
        formData.append('description', this.state.viewDescription);
        formData.append('image', this.state.EditNoticePicture);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const refreshPage = () => {
            window.location.reload();
        }
        if (this.state.EditNoticePicture !== '') {
            axios.put("http://localhost:8070/notices/update/" + this.state.ID + "/" + this.state.viewNoticePicture, formData, config).then(res => {
                this.props.history.push('/notices');
                refreshPage();
            })
        } else {
            let AssignNotice = {
                title: this.state.viewTitle, description: this.state.viewDescription, image: this.state.viewNoticePicture,
            };
            console.log('AssignNotice => ' + JSON.stringify(AssignNotice));
            console.log(this.state.ID);
            SchoolManagementSystemServices.updateNoticeWithoutImage(AssignNotice, this.state.ID).then(res => {
                console.log('success');
                this.props.history.push('/notices');
                window.location.reload();
            })
        }
    }
    componentDidMount(){
        SchoolManagementSystemServices.getAllNotices().then((res) => {
            this.setState({ notices: res.data});
        });
    }

    //add notice handlers
    changeImageHandler = (notices)=> {
        this.setState({image: notices.target.files[0]});
    }
    changeTitleHandler = (notices)=> {
        this.setState({title: notices.target.value});
    }
    changeDescriptionHandler = (notices)=> {
        this.setState({description: notices.target.value});
    }
    //edit notice handlers
    //edit handlers
    EditChangeNoticePictureHandler = (notices) => {
        this.setState({  EditNoticePicture: notices.target.files[0] });
    }
    EditTitleHandler = (notices) => {
        this.setState({ viewTitle: notices.target.value });
    }
    EditDescriptionHandler = (notices) => {
        this.setState({ viewDescription: notices.target.value });
    }
    //signout
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
                                <a className="navbar-brand" href="#">Notices Management</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropNotice">Add Notice</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">View Notices</a>
                                        </li>
                                    </ul>
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="searchQuery"aria-label="Search" value={this.state.title} onChange={this.changeNoticeSearchHandler}/>
                                        {/*Signout Button*/}
                                        <button onClick={this.signout} className="btn btn-danger" type="submit">Logout</button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                        <br/>
                        <div className="container">
                            <div className="row">
                                {/*Header*/}
                                <h3>All Notices</h3>
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
                                                    </div>
                                                    <div className="row mt-8">
                                                        <div className="col-md-6">
                                                            <div className="p-3 text-center text-white mt-2 cursor">
                                                                {/*View Button*/}
                                                                <button className="btn btn-warning btn-block" data-bs-toggle="modal" data-bs-target="#staticBackdropNoticeUpdate" onClick={e => this.viewNotice(e, notices._id)}>
                                                                    <i className="fas fa-edit"></i>&nbsp;
                                                                    View
                                                                </button>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="p-3 text-center text-white mt-2 cursor">
                                                                {/*Delete Button*/}
                                                                <button className="btn btn-danger btn-block" onClick={ () => this.delete(notices._id)}>
                                                                    <i className="fas fa-edit"></i>&nbsp;
                                                                    Delete
                                                                </button>
                                                                <br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )
                                }
                             <br/>
                            </div>
                        </div>
                        <div className="row">
                            <br/><br/><br/><br/><br/>
                        </div>
                        <div className="container">
                            <div className="row">
                                {/*Add New Notice Interface Pop Up*/}
                                <div className="modal fade" id="staticBackdropNotice" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabelNotice" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabelNotice">Add New Notice</h5>
                                            </div>
                                            <div className="modal-body">
                                            <form>
                                                <center>
                                                    <div className="mb-3">
                                                        <label>Choose Media</label>
                                                        <input className="form-control bg-warning mt-2 mb-3" type="file" name="image" onChange={this.changeImageHandler} />
                                                    </div>
                                                </center>
                                                <div className="mb-3">
                                                    <label className="form-label"><i className="fa fa-user-o" aria-hidden="true"></i>&nbsp;
                                                        Notice Info
                                                    </label>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-group mb-3">
                                                        <input type="text" name="title" id="title" value={this.state.title} onChange={this.changeTitleHandler} placeholder="Enter Title Here" className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-group mb-3">
                                                        <textarea type="text" name="description" id="description" value={this.state.description} onChange={this.changeDescriptionHandler} placeholder="Description" className="form-control" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            {/*Cancel Button*/}
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                                                Cancel
                                            </button>
                                            {/*Add Notice Button*/}
                                            <button type="button" onClick={this.addNotice} className="btn btn-primary"><i className="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;
                                                Save
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
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
                                                        <div className="mb-3">
                                                            <input className="form-control bg-primary mt-2 mb-3" type="file" name="image"
                                                                   onChange={this.EditChangeNoticePictureHandler} /> {console.log(this.state.EditNoticePicture)}
                                                        </div>
                                                    </center>
                                                    <div className="mb-3">
                                                        <label className="form-label"><i className="fa fa-user-o" aria-hidden="true"></i>&nbsp;
                                                            Notice Info
                                                        </label>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="input-group mb-3">
                                                            <input type="text" value={this.state.viewTitle} onChange={this.EditTitleHandler} className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="input-group mb-3">
                                                            <textarea type="text" value={this.state.viewDescription} onChange={this.EditDescriptionHandler} className="form-control" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                {/*Cancel Button*/}
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                    <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                                                    Cancel
                                                </button>
                                                {/*Edit Notice Button*/}
                                                <button type="button" onClick={this.editNotice} className="btn btn-success">
                                                    <i className="fas fa-pen"></i>&nbsp;
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddViewDeleteNotices;