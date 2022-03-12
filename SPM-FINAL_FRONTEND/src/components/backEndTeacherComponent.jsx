import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import Swal from 'sweetalert2'
import service from '../services/SchoolManagementSystemServices'
import AdminSideNavBar from './Admin-SideNavBar'
import { saveAs } from 'file-saver'
import '../../node_modules/datatables.net-dt/css/jquery.dataTables.css'
import $ from 'jquery'
import AdminHeader from "./AdminHeader";
$.DataTable = require('datatables.net')
const Imageurl = 'http://localhost:8070/uploads/teachers/'
const Docurl = 'http://localhost:8070/outputFiles/teacher.xlsx'

export default class backEndTeacherComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // form Variables
      teacher_ID: '',
      teacher_Name: '',
      email: '',
      NIC: '',
      profile_Picture: '',
      allocated_Grade: '',
      description: '',
      //get report
      report: [],
      report_grade: '',
      //asign subject variables
      allSubjects: [],
      options: [],
      selecteSubjects: [],
      //get all details variables
      teacher: [],
      // view edit variables
      viewTeacherDatabaseID: '',
      viewTeacherID: '',
      viewTeacherName: '',
      viewTeacherEmail: '',
      viewTeacherNIC: '',
      viewTeacherGrade: '',
      viewTeacherSubjects: [],
      viewTeacherDescription: '',
      viewTeacherProdilePicture: '',
      EditProdilePicture: '',
    }
    //add Handlers
    this.changeTeacherIDHandler = this.changeTeacherIDHandler.bind(this)
    this.changeTeacherNameHandler = this.changeTeacherNameHandler.bind(this)
    this.changeTeacherEmailHandler = this.changeTeacherEmailHandler.bind(this)
    this.changeTeacherNICHandler = this.changeTeacherNICHandler.bind(this)
    this.changeTeacherAllocatedGrade = this.changeTeacherAllocatedGrade.bind(this
)
    this.changeTeacherDescriptionHandler = this.changeTeacherDescriptionHandler.bind(this
)
    this.changeTeacherSubjectsHandler = this.changeTeacherSubjectsHandler.bind(this
)
    this.changeTeacherProfilePictureHandler = this.changeTeacherProfilePictureHandler.bind(this
)
    //edit handlers
    this.EditChangeTeacherIDHandler = this.EditChangeTeacherIDHandler.bind(this)
    this.EditChangeTeacherNameHandler = this.EditChangeTeacherNameHandler.bind(
      this,
    )
    this.EditChangeTeacherEmailHandler = this.EditChangeTeacherEmailHandler.bind(
      this,
    )
    this.EditChangeTeacherNICHandler = this.EditChangeTeacherNICHandler.bind(
      this,
    )
    this.EditChangeTeacherAllocatedGrade = this.EditChangeTeacherAllocatedGrade.bind(
      this,
    )
    this.EditChangeTeacherDescriptionHandler = this.EditChangeTeacherDescriptionHandler.bind(
      this,
    )
    this.EditChangeTeacherProfilePictureHandler = this.EditChangeTeacherProfilePictureHandler.bind(
      this,
    )
    //reprt handlers
    this.ReportTeacherAllocatedGrade = this.ReportTeacherAllocatedGrade.bind(
      this,
    )
  }
  //add Handlers
  changeTeacherIDHandler = (event) => {
    this.setState({ teacher_ID: event.target.value })
  }
  changeTeacherNameHandler = (event) => {
    this.setState({ teacher_Name: event.target.value })
  }
  changeTeacherEmailHandler = (event) => {
    this.setState({ email: event.target.value })
  }
  changeTeacherNICHandler = (event) => {
    this.setState({ NIC: event.target.value })
  }
  changeTeacherAllocatedGrade = (event) => {
    this.setState({ allocated_Grade: event.target.value })
  }
  changeTeacherDescriptionHandler = (event) => {
    this.setState({ description: event.target.value })
  }
  changeTeacherProfilePictureHandler = (event) => {
    this.setState({ profile_Picture: event.target.files[0] })
  }
  changeTeacherSubjectsHandler = (e) => {
    this.setState({ selecteSubjects: e ? e.map((item) => item.value) : [] })
  }
  //edit handlers
  EditChangeTeacherIDHandler = (event) => {
    this.setState({ viewTeacherID: event.target.value })
  }
  EditChangeTeacherNameHandler = (event) => {
    this.setState({ viewTeacherName: event.target.value })
  }
  EditChangeTeacherEmailHandler = (event) => {
    this.setState({ viewTeacherEmail: event.target.value })
  }
  EditChangeTeacherNICHandler = (event) => {
    this.setState({ viewTeacherNIC: event.target.value })
  }
  EditChangeTeacherAllocatedGrade = (event) => {
    this.setState({ viewTeacherGrade: event.target.value })
  }
  EditChangeTeacherDescriptionHandler = (event) => {
    this.setState({ viewTeacherDescription: event.target.value })
  }
  EditChangeTeacherProfilePictureHandler = (event) => {
    this.setState({ EditProdilePicture: event.target.files[0] })
  }
  //report handlers
  ReportTeacherAllocatedGrade = (event) => {
    this.setState({ report_grade: event.target.value })
  }

  componentDidMount() {
    service
      .GetAllTeachers()
      .then((res) => {
        this.setState({ teacher: res.data })
      })
      .then((res) => {
        service.getAllSubjects().then((res) => {
          this.setState({ allSubjects: res.data }, () => {
            let data = []
            this.state.allSubjects.map((item) => {
              let allSubject = {
                value: item._id,
                label: item.allocated_Grade + ' ' + item.subject_Name,
              }
              data.push(allSubject)
            })
            this.setState({ options: data })
          })
        })
      })
  }
  componentDidUpdate() {
    this.$el = $(this.el)
    this.$el.DataTable()
  }
  addTeacher = (e) => {
    e.preventDefault()
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-5',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to Add New Teacher?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Add it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (
            this.state.teacher_ID !== '' &&
            this.state.teacher_Name !== '' &&
            this.state.email !== '' &&
            this.state.NIC !== '' &&
            this.state.profile_Picture !== '' &&
            this.state.allocated_Grade !== '' &&
            this.state.description !== ''
          ) {
            const formData = new FormData()
            formData.append('teacher_ID', this.state.teacher_ID)
            formData.append('teacher_Name', this.state.teacher_Name)
            formData.append('email', this.state.email)
            formData.append('NIC', this.state.NIC)
            formData.append('profile_Picture', this.state.profile_Picture)
            formData.append('allocated_Grade', this.state.allocated_Grade)
            formData.append('description', this.state.description)
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            }
            const refreshPage = () => {
              window.location.reload()
            }
            axios
              .post('http://localhost:8070/Teacher/add', formData, config)
              .then((res) => {
                this.props.history.push('/BackendTeacher')
                refreshPage()
              })
            console.log(this.state.subject)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'All Input Fields Should Fill!',
            })
          }
        }
      })
  }
  viewteacher(e, teacherid) {
    e.preventDefault()
    service.GetOneTeachers(teacherid).then((res) => {
      let OneTeacher = res.data
      console.log(res.data)
      this.setState({
        viewTeacherDatabaseID: OneTeacher._id,
        viewTeacherID: OneTeacher.teacher_ID,
        viewTeacherName: OneTeacher.teacher_Name,
        viewTeacherEmail: OneTeacher.email,
        viewTeacherNIC: OneTeacher.NIC,
        viewTeacherGrade: OneTeacher.allocated_Grade,
        viewTeacherSubjects: OneTeacher.subject,
        viewTeacherDescription: OneTeacher.description,
        viewTeacherProdilePicture: OneTeacher.profile_Picture,
      })
      console.log(this.state.viewTeacherSubjects)
    })
  }
  assignsubjects = (e) => {
    e.preventDefault()
    let AssignSubjects = {
      teacher_ID: this.state.viewTeacherID,
      teacher_Name: this.state.viewTeacherName,
      email: this.state.viewTeacherEmail,
      NIC: this.state.viewTeacherNIC,
      allocated_Grade: this.state.viewTeacherGrade,
      profile_Picture: this.state.viewTeacherProdilePicture,
      subject: this.state.selecteSubjects,
      description: this.state.viewTeacherDescription,
    }
    console.log('AssignSubjects => ' + JSON.stringify(AssignSubjects))

    service
      .assginsubjects(AssignSubjects, this.state.viewTeacherDatabaseID)
      .then((res) => {
        console.log('success')
        this.props.history.push('/BackendTeacher')
        window.location.reload()
      })
  }
  editteacher = (e) => {
    e.preventDefault()
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-5',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to Update This Data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData()
          formData.append('teacher_ID', this.state.viewTeacherID)
          formData.append('teacher_Name', this.state.viewTeacherName)
          formData.append('email', this.state.viewTeacherEmail)
          formData.append('NIC', this.state.viewTeacherNIC)
          formData.append('profile_Picture', this.state.EditProdilePicture)
          formData.append('allocated_Grade', this.state.viewTeacherGrade)
          formData.append('description', this.state.viewTeacherDescription)

          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
          const refreshPage = () => {
            window.location.reload()
          }
          if (this.state.EditProdilePicture !== '') {
            axios
              .put(
                'http://localhost:8070/Teacher/update/' +
                  this.state.viewTeacherDatabaseID +
                  '/' +
                  this.state.viewTeacherProdilePicture,
                formData,
                config,
              )
              .then((res) => {
                this.props.history.push('/BackendTeacher')
                refreshPage()
              })
          } else {
            let AssignSubjects = {
              teacher_ID: this.state.viewTeacherID,
              teacher_Name: this.state.viewTeacherName,
              email: this.state.viewTeacherEmail,
              NIC: this.state.viewTeacherNIC,
              allocated_Grade: this.state.viewTeacherGrade,
              profile_Picture: this.state.viewTeacherProdilePicture,
              description: this.state.viewTeacherDescription,
            }
            console.log('AssignSubjects => ' + JSON.stringify(AssignSubjects))

            service
              .updateTeacherwithoutimage(
                AssignSubjects,
                this.state.viewTeacherDatabaseID,
              )
              .then((res) => {
                console.log('success')
                this.props.history.push('/BackendTeacher')
                window.location.reload()
              })
          }
        }
      })
  }
  delete(e, teacherid, profile_Picture) {
    e.preventDefault()
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-5',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to Delete This Data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          service.Deleteteacher(teacherid, profile_Picture).then((res) => {
            this.props.history.push('/BackendTeacher')
            window.location.reload()
          })
        }
      })
  }
  createAndDownloadPdf = (e) => {
    e.preventDefault()
    service
      .GetAllTeachers()
      .then((res) => {
        this.setState({ report: res.data })
      })
      .then(() => {
        axios.post('http://localhost:8070/Teacher/print', this.state)
      })
  }
  createAndDownloadGradePdf = (e) => {
    e.preventDefault()
    service
      .getallteachersUsingGrade(this.state.report_grade)
      .then((res) => {
        this.setState({ report: res.data })
      })
      .then(() => {
        axios.post('http://localhost:8070/Teacher/print', this.state)
      })
  }
  Createsingleteacherpdf = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8070/Teacher/createpdf', this.state).then(() =>
      axios
        .get('http://localhost:8070/Teacher/getpdf', { responseType: 'blob' })
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
          saveAs(pdfBlob, 'Teacher Details.pdf')
        }),
    )
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <AdminSideNavBar />
            </div>
            <div className="col-md-10 background">
              <AdminHeader />
              <div className="container-fluid">
                <div className="row glass bg-info text-center mt-3">
                  <h1>TEACHER'S INFORMATION</h1>
                </div>
                <div className="row mt-5 d-flex justify-content-center">
                  <div className="col-md-8"></div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      class="btn btn-success btn-block"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      ADD NEW TEACHER
                    </button>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      class="btn  btn-warning"
                      data-toggle="modal"
                      data-target="#datareport"
                    >
                      Genarate Report
                    </button>
                  </div>
                </div>
              </div>

              <div className="container glass mt-5 mb-5">
                <table
                  className="display"
                  ref={(el) => (this.el = el)}
                  style={{
                    boxShadow: '8px 8px  #dce3e0',
                    marginBottom: '20px',
                    marginTop: '20px',
                  }}>
                  <thead>
                    <tr>
                      <th>TEACHER ID</th>
                      <th>TEACHER NAME</th>
                      <th>Email</th>
                      <th>NIC</th>
                      <th>ALLOCATED GRADE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.teacher.map((teacher) => (
                      <tr>
                        <th>{teacher.teacher_ID}</th>
                        <th>{teacher.teacher_Name}</th>
                        <th>{teacher.email}</th>
                        <th>{teacher.NIC}</th>
                        <th>Grade-{teacher.allocated_Grade}</th>
                        <th>
                          <div className="row">
                            <div className="col-md-3">
                              <button
                                className="btn btn-info btn-block fa fa-eye"
                                onClick={(e) =>
                                  this.viewteacher(e, teacher._id)
                                }
                                data-toggle="modal"
                                data-target="#exampleModal2"
                              ></button>
                            </div>
                            <div className="col-md-3">
                              <button
                                className="btn btn-warning btn-block fa fa-book"
                                onClick={(e) =>
                                  this.viewteacher(e, teacher._id)
                                }
                                data-toggle="modal"
                                data-target="#exampleModal3"
                              ></button>
                            </div>
                            <div className="col-md-3">
                              <button
                                className="btn btn-success btn-block fa fa-pencil"
                                onClick={(e) =>
                                  this.viewteacher(e, teacher._id)
                                }
                                data-toggle="modal"
                                data-target="#exampleModal4"
                              ></button>
                            </div>
                            <div className="col-md-3">
                              <button
                                className="btn btn-danger btn-block fa fa-trash"
                                onClick={(e) =>
                                  this.delete(
                                    e,
                                    teacher._id,
                                    teacher.profile_Picture,
                                  )
                                }
                              ></button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>TEACHER ID</th>
                      <th>TEACHER NAME</th>
                      <th>Email</th>
                      <th>NIC</th>
                      <th>ALLOCATED GRADE</th>
                      <th>ACTION</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {/* form modal */}
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true">
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                  role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title " id="exampleModalLongTitle">
                        ADD TEACHER FORM
                      </h1>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="glass bg-info mb-2 ml-3 mr-3">
                        <form className="form-container">
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-3 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Teacher's ID</h5>
                                <input
                                  placeholder="T###"
                                  name="teacher_ID"
                                  className="form-control"
                                  value={this.state.teacher_ID}
                                  onChange={this.changeTeacherIDHandler}
                                  required
                                  maxlength="4"/>
                              </div>
                            </div>
                            <div className="col-md-2 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Allocated Grade</h5>
                                <div className="input-group mb-3">
                                  <select
                                    className="custom-select"
                                    name="point"
                                    type="allocated_Grade"
                                    placeholder={'Allocated Grade'}
                                    onChange={this.changeTeacherAllocatedGrade}>
                                    <option selected>Choose...</option>
                                    <option value="1">Grade-01</option>
                                    <option value="2">Grade-02</option>
                                    <option value="3">Grade-03</option>
                                    <option value="4">Grade-04</option>
                                    <option value="5">Grade-05</option>
                                    <option value="6">Grade-06</option>
                                    <option value="7">Grade-07</option>
                                    <option value="8">Grade-08</option>
                                    <option value="9">Grade-09</option>
                                    <option value="10">Grade-10</option>
                                    <option value="11">Grade-11</option>
                                    <option value="12">Grade-12</option>
                                    <option value="13">Grade-13</option>
                                  </select>
                                  {console.log(this.state.point)}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Profile Picture</h5>
                                <input
                                  className="form-control bg-primary mt-2 mb-3"
                                  type="file"
                                  name="profile_Picture"
                                  onChange={
                                    this.changeTeacherProfilePictureHandler
                                  }
                                />{' '}
                                {console.log(this.state.profile_Picture)}
                              </div>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-8 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Teacher's Name</h5>
                                <input
                                  placeholder="Teacher's name"
                                  name="teacher_Name"
                                  className="form-control"
                                  value={this.state.teacher_Name}
                                  onChange={this.changeTeacherNameHandler}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-center">
                            <div className="col-md-3 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Teacher's NIC</h5>
                                <input
                                  placeholder="Teacher's NIC"
                                  name="NIC"
                                  className="form-control"
                                  value={this.state.NIC}
                                  onChange={this.changeTeacherNICHandler}
                                  required
                                  min="10"
                                  max="12"
                                />
                              </div>
                            </div>
                            <div className="col-md-4 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Teacher's Email</h5>
                                <input
                                  placeholder="Teacher's Email"
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  value={this.state.email}
                                  onChange={this.changeTeacherEmailHandler}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-center">
                            <div className="col-md-7 ml-2 mr-2 mt-3">
                              <div className="form-group">
                                <h5>Description</h5>
                                <textarea
                                  placeholder="Description"
                                  class="form-control"
                                  name="description"
                                  rows="3"
                                  value={this.state.description}
                                  onChange={
                                    this.changeTeacherDescriptionHandler
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={this.addTeacher}
                      >
                        Add Details
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* view modal */}
              <div
                class="modal fade"
                id="exampleModal2"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">
                        {' '}
                        {this.state.viewTeacherName}
                      </h1>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="container">
                        <div className="glass bg-info mb-2 ml-3 mr-3">
                          <div className="row ">
                            <div className="col-12 mt-2 ml-2">
                              <h5>{this.state.viewTeacherName}'s Details</h5>
                              <div className="row ">
                                <div className="col-md-2 mb-2">
                                  <div className="breake"></div>
                                </div>
                                <div className="col-md-10"></div>
                              </div>
                            </div>
                          </div>
                          <div className="row ml-3 mr-3 mb-3">
                            <div className="col-md-3 d-flex justify-content-center align-items-center border border-light bg-light rounded">
                              <img
                                src={
                                  Imageurl +
                                  this.state.viewTeacherProdilePicture
                                }
                                alt=""
                                srcset=""
                                style={{
                                  width: '100%',
                                  height: '80%',
                                  zIndex: 'revert',
                                }}
                              />
                            </div>
                            <div className="col-md-9">
                              <div className="row">
                                <div className="col-md-3">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER ID:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherID}
                                    style={{}}
                                  />
                                </div>

                                <div className="col-md-9">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER NAME:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherName}
                                    style={{}}
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-7">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    EMAIL:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherEmail}
                                    style={{}}
                                  />
                                </div>

                                <div className="col-md-5">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    NIC:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherNIC}
                                    style={{}}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-md-4">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    ALLOCATED GRAGE:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={
                                      'Grade-' + this.state.viewTeacherGrade
                                    }
                                    style={{}}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    ALLOCATED SUBJECTS:-
                                  </label>
                                  {this.state.viewTeacherSubjects.map(
                                    (subjects) => (
                                      <input
                                        disabled
                                        placeholder={
                                          subjects.allocated_Grade +
                                          ' ' +
                                          subjects.subject_Name
                                        }
                                        className="mt-1"
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <h5>Description</h5>
                                  <textarea
                                    placeholder={
                                      this.state.viewTeacherDescription
                                    }
                                    class="form-control"
                                    name="description"
                                    rows="3"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn  btn-danger"
                        onClick={(e) => this.Createsingleteacherpdf(e)}
                      >
                        Genarate PDF
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* assign subjects modal */}
              <div
                class="modal fade"
                id="exampleModal3"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                  role="document"
                >
                  <div class="modal-content ">
                    <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">
                        Assign Subjects For {this.state.viewTeacherName}
                      </h1>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="container mb-5">
                        <div className="glass bg-info mb-2 ml-3 mr-3">
                          <div className="row ">
                            <div className="col-12 mt-2 ml-2">
                              <h5>{this.state.viewTeacherName}'s Details</h5>
                              <div className="row ">
                                <div className="col-md-2 mb-2">
                                  <div className="breake"></div>
                                </div>
                                <div className="col-md-10"></div>
                              </div>
                            </div>
                          </div>
                          <div className="row ml-3 mr-3 mb-3">
                            <div className="col-12">
                              <div className="row">
                                <div className="col-md-3">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER ID:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherID}
                                    style={{}}
                                  />
                                </div>

                                <div className="col-md-9">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER NAME:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={this.state.viewTeacherName}
                                    style={{}}
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-md-4">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    ALLOCATED GRAGE:-
                                  </label>
                                  <input
                                    disabled
                                    placeholder={
                                      'Grade-' + this.state.viewTeacherGrade
                                    }
                                    style={{}}
                                  />
                                </div>
                                <div className="col-md-8">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    ALLOCATED SUBJECTS:-
                                  </label>
                                  {this.state.viewTeacherSubjects.map(
                                    (subjects) => (
                                      <input
                                        disabled
                                        placeholder={
                                          subjects.allocated_Grade +
                                          ' ' +
                                          subjects.subject_Name
                                        }
                                        className="mt-1"
                                      />
                                    ),
                                  )}
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-12">
                                  <h5>Allocat Subjects For Teacher</h5>
                                  <Select
                                    options={this.state.options}
                                    onChange={this.changeTeacherSubjectsHandler}
                                    className="basic-multi-select"
                                    isMulti
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={this.assignsubjects}
                      >
                        Assign Subjects
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit modal */}
              <div
                class="modal fade"
                id="exampleModal4"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">
                        {' '}
                        Edit {this.state.viewTeacherName}'s Details
                      </h1>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="container">
                        <div className="glass bg-info mb-2 ml-3 mr-3">
                          <div className="row ">
                            <div className="col-12 mt-2 ml-2">
                              <h5>{this.state.viewTeacherName}'s Details</h5>
                              <div className="row ">
                                <div className="col-md-2 mb-2">
                                  <div className="breake"></div>
                                </div>
                                <div className="col-md-10"></div>
                              </div>
                            </div>
                          </div>
                          <div className="row ml-3 mr-3 mb-3">
                            <div className="col-md-3 d-flex justify-content-center align-items-center border border-light bg-light rounded">
                              <img
                                src={
                                  Imageurl +
                                  this.state.viewTeacherProdilePicture
                                }
                                alt=""
                                srcset=""
                                style={{
                                  width: '100%',
                                  height: '80%',
                                  zIndex: 'revert',
                                }}
                              />
                            </div>
                            <div className="col-md-9">
                              <div className="row">
                                <div className="col-md-3">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER ID:-
                                  </label>
                                  <input
                                    value={this.state.viewTeacherID}
                                    onChange={this.EditChangeTeacherIDHandler}
                                    required
                                    maxlength="4"
                                  />
                                </div>

                                <div className="col-md-9">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    TEACHER NAME:-
                                  </label>
                                  <input
                                    value={this.state.viewTeacherName}
                                    onChange={this.EditChangeTeacherNameHandler}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-md-7">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    EMAIL:-
                                  </label>
                                  <input
                                    value={this.state.viewTeacherEmail}
                                    onChange={
                                      this.EditChangeTeacherEmailHandler
                                    }
                                    required
                                  />
                                </div>

                                <div className="col-md-5">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    NIC:-
                                  </label>
                                  <input
                                    value={this.state.viewTeacherNIC}
                                    onChange={this.EditChangeTeacherNICHandler}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="row mt-3">
                                <div className="col-md-4">
                                  <label
                                    className="font-weight-bold"
                                    htmlFor=""
                                  >
                                    ALLOCATED GRAGE:-
                                  </label>
                                  <div className="input-group mb-3">
                                    <select
                                      className="custom-select"
                                      name="point"
                                      type="allocated_Grade"
                                      placeholder={'Allocated Grade'}
                                      onChange={
                                        this.EditChangeTeacherAllocatedGrade
                                      }
                                    >
                                      <option selected>Choose...</option>
                                      <option value="1">Grade-01</option>
                                      <option value="2">Grade-02</option>
                                      <option value="3">Grade-03</option>
                                      <option value="4">Grade-04</option>
                                      <option value="5">Grade-05</option>
                                      <option value="6">Grade-06</option>
                                      <option value="7">Grade-07</option>
                                      <option value="8">Grade-08</option>
                                      <option value="9">Grade-09</option>
                                      <option value="10">Grade-10</option>
                                      <option value="11">Grade-11</option>
                                      <option value="12">Grade-12</option>
                                      <option value="13">Grade-13</option>
                                    </select>
                                    {console.log(this.state.point)}
                                  </div>
                                </div>
                                <div className="col-md-5 ml-2 mr-2">
                                  <div className="form-group">
                                    <h5>Profile Picture</h5>
                                    <input
                                      className="form-control bg-primary mt-2 mb-3"
                                      type="file"
                                      name="profile_Picture"
                                      onChange={
                                        this
                                          .EditChangeTeacherProfilePictureHandler
                                      }
                                    />{' '}
                                    {console.log(this.state.EditProdilePicture)}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <h5>Description</h5>
                                  <textarea
                                    value={this.state.viewTeacherDescription}
                                    class="form-control"
                                    name="description"
                                    rows="3"
                                    onChange={
                                      this.EditChangeTeacherDescriptionHandler
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={this.editteacher}
                      >
                        Edit Details
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report model */}
              <div
                class="modal fade"
                id="datareport"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title " id="exampleModalLongTitle">
                        GENARATE REPORT
                      </h1>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div className="glass bg-info mb-2 ml-3 mr-3">
                        <div className="row text-center">
                          <div className="col-12 mt-3 mb-3">
                            <h1>Get All Teacher's Data Report</h1>
                            <button
                              type="button"
                              class="btn btn-warning ml-5 mr-5"
                              onClick={(e) => this.createAndDownloadPdf(e)}
                            >
                              Create Report
                            </button>
                            <a
                              type="button"
                              class="btn btn-success ml-5 mr-5"
                              href={Docurl}
                            >
                              Download Report
                            </a>
                          </div>
                          <div className="col-12 mt-3 mb-3">
                            <h1>
                              Get All Teacher's Data Report According To Grade
                            </h1>
                            <div className="row ml-3 mr-3">
                              <div className="col-md-4">
                                <select
                                  className="custom-select"
                                  name="point"
                                  type="allocated_Grade"
                                  placeholder={'Allocated Grade'}
                                  onChange={this.ReportTeacherAllocatedGrade}
                                >
                                  <option selected>Choose...</option>
                                  <option value="1">Grade-01</option>
                                  <option value="2">Grade-02</option>
                                  <option value="3">Grade-03</option>
                                  <option value="4">Grade-04</option>
                                  <option value="5">Grade-05</option>
                                  <option value="6">Grade-06</option>
                                  <option value="7">Grade-07</option>
                                  <option value="8">Grade-08</option>
                                  <option value="9">Grade-09</option>
                                  <option value="10">Grade-10</option>
                                  <option value="11">Grade-11</option>
                                  <option value="12">Grade-12</option>
                                  <option value="13">Grade-13</option>
                                </select>
                              </div>
                              {console.log(this.state.report_grade)}
                              <div className="col-md-4">
                                <button
                                  type="button"
                                  class="btn btn-warning ml-5 mr-5"
                                  onClick={(e) =>
                                    this.createAndDownloadGradePdf(e)
                                  }
                                >
                                  Create Report
                                </button>
                              </div>
                              <div className="col-md-4">
                                <a
                                  type="button"
                                  class="btn btn-success ml-5 mr-5"
                                  href={Docurl}
                                >
                                  Download Report
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// }
