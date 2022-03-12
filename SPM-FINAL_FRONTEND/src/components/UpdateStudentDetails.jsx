import React, {Component} from 'react';
import AdminSideNavBar from "./Admin-SideNavBar";
class UpdateStudentDetails extends Component {
    render() {
        return (
            <div className="background">
                <div className="row">
                    <div className="col-sm-3">
                        <AdminSideNavBar/>
                    </div>
                    <div className="col-sm-9">
                        <div className="container">
                            <form>
                                <center>
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-warning">
                                            <i className="fas fa-camera"></i>&nbsp;
                                            Upload a Photo
                                        </button>
                                    </div>
                                </center>
                                <div className="mb-3">
                                    <label className="form-label">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>&nbsp;
                                        Student Info
                                    </label>
                                </div>
                                <div style={{background:"#f5f5f5",padding:"30px"}}>


                                    <div className="mb-3">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">
                                                <i className="fa fa-lock" aria-hidden="true"></i></span>
                                            <input type="email" placeholder="Admission Number"
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Firstname" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Lastname" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Section" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Class" className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <div className="input-group mb-3">
                                                <select className="custom-select-form-control" placeholder="Gender"
                                                        style={{height: "38px", width: "100%"}}>
                                                    <option selected>Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="date" placeholder="Date of Birth" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Contact Info
                                    </label>
                                </div>
                                <div style={{background:"#f5f5f5",padding:"30px"}}>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                                </span>
                                                <input type="text" placeholder="Mobile Number"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">
                                                    @
                                                </span>
                                                <input type="email" placeholder="Email" className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                                </span>
                                            <input type="text" placeholder="Address" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="mb-3">
                                    <label className="form-label">Parent/Guardian</label>
                                </div>
                                <div style={{background:"#f5f5f5",padding:"30px"}}>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Guardian Name" className="form-control"/>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" placeholder="Guardian Relationship"
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-phone" aria-hidden="true"></i></span>
                                                <input type="text" placeholder="Mobile Number"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">@</span>
                                                <input type="email" placeholder="Guardian Email"
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-sm-6">
                                            {/*Cancel Button*/}
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                                <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="col-sm-6">
                                            <button type="button" className="btn btn-primary"><i className="fa fa-floppy-o"
                                                                                                 aria-hidden="true"></i>&nbsp;
                                                Save
                                            </button>
                                        </div>

                                    </div>

                                </div>
                                <div className="modal-footer">
                                    {/*Cancel Button*/}
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                        <i className="fa fa-times" aria-hidden="true"></i>&nbsp;
                                        Cancel
                                    </button>
                                    {/*Save Button*/}
                                    <button type="button" className="btn btn-primary"><i className="fa fa-floppy-o"
                                                                                         aria-hidden="true"></i>&nbsp;
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateStudentDetails;