import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Index from "./components";
import AdminStudentDashboard from "./components/AdminStudentDashboard";
import UpdateStudentDetails from "./components/UpdateStudentDetails";
import AddViewDeleteNotices from "./components/Add-View-Delete_Notices";
import StudentDetailReports from "./components/studentDetailReports";
import studentDashboard from "./components/studentDashboard";
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs";
import teacherDashboardComponent from './components/teacherDashboardComponent';
import allocatedSubjectsComponents from './components/allocatedSubjectsComponents';
import backEndTeacherComponent from './components/backEndTeacherComponent';
import BackEndSubjectComponent from './components/BackEndSubjectComponent';
import subjectDetailsComponent from './components/subjectDetailsComponent';
import StudetnsubjectDetailsComponent from './components/studentSubjectdetialsComponent';
import sstudentallocatedsubjects from './components/StudentAllocatedSubject';
import AdminDashboard from "./components/Admin-Dashboard";
import AttendanceMark from "./components/AttendanceMark";
import AddMarks from "./components/AddMarks";
import ViewAttendance from "./components/ViewAttendance";
import Login from "./components/login";
import ViewMarks from "./components/ViewMarks";

function App() {
  return (
    <Router>
      <Switch>
          <div>
              {/*Index Page*/}
              <Route path="/" exact component={Index} />
              {/*Login Page*/}
              <Route path="/login" exact component={Login} />
              {/*View Marks*/}
              <Route path="/viewMarks" exact component={ViewMarks} />
              {/*Admin Dashboard*/}
              <Route path="/dashboard" exact component={AdminDashboard} />
              {/*Mark Attendance*/}
              <Route path="/MarkAttendance" exact component={AttendanceMark} />
              {/*Add Marks*/}
              <Route path="/AddMarks" exact component={AddMarks} />
              {/*View Attendance*/}
              <Route path="/ViewAttendance" exact component={ViewAttendance} />
              {/*Admin Student Dashboard*/}
              <Route path="/adminStudentDashboard" component={AdminStudentDashboard}></Route>
              {/*Update Student*/}
              <Route path="/updateStudent" component={UpdateStudentDetails}></Route>
              {/*Notices Management*/}
              <Route path="/notices" component={AddViewDeleteNotices}></Route>
              {/*Student Report Generation*/}
              <Route path="/studentReport" component={StudentDetailReports}></Route>
              {/*Student Dashboard*/}
              <Route path="/studentDashboard" component={studentDashboard}></Route>
              {/*About*/}
              <Route path="/about" component={AboutUs}></Route>
              {/*Contact Us*/}
              <Route path="/contact" component={ContactUs}></Route>
              {/*Teacher Dashboard*/}
              <Route path="/teacherDashboard" component={teacherDashboardComponent}></Route>
              {/*Allocated Subjects*/}
              <Route path="/allocatedSub" component={allocatedSubjectsComponents}></Route>
              {/*Students allocated subjects*/}
              <Route path="/studentallocatedSub" component={sstudentallocatedsubjects}></Route>
              {/*Subject Details*/}
              <Route path="/subjectdetails/:id" component={subjectDetailsComponent}></Route>
              {/*Students Subject Details*/}
              <Route path="/Studentsubjectdetails/:id" component={StudetnsubjectDetailsComponent}></Route>
              {/*Teacher Component*/}
              <Route path="/BackendTeacher" component={backEndTeacherComponent}></Route>
              {/*Subject Component*/}
              <Route path="/BackendSubject" component={BackEndSubjectComponent}></Route>
          </div>
      </Switch>
    </Router>
  );
}

export default App;
