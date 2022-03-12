import axios from 'axios';
//Student Management Services URL
//get all students
const Student_API_GET_ALL = "http://localhost:8070/students/allStudents";
//Add new Student
const Student_API_ADD_STUDENT = "http://localhost:8070/students/addStudents";
//delete Student
const Student_API_DELETE = "http://localhost:8070/students/delete";
//get student by ID
const Student_API_GET_STUDENT_BY_ID = "http://localhost:8070/students/get"
//update student without image
const Student_API_UPDATE = "http://localhost:8070/students/update"
//Get student by admission number
const Student_API_GETBY_ADMISSIONNUMBER = "http://localhost:8070/students/getStudent";
//Get student by section
const Student_API_GET_STUDENT_BY_SECTION = "http://localhost:8070/students/getStudentBySection";
//Get student by class
const Student_API_GET_STUDENT_BY_CLASS = "http://localhost:8070/students/getStudentByClass";
//Get student by firstname
const Student_API_GET_STUDENT_BY_NAME = "http://localhost:8070/students/getStudentByName";
//Notices Management
//get all Notices
const Notices_API_GET_ALL = "http://localhost:8070/notices/allNotices";
//delete Notices
const Notices_API_DELETE = "http://localhost:8070/notices/delete"
//get notice by ID
const Notices_API_GET_BY_ID = "http://localhost:8070/notices/get";
const UpdateNoticeAPI = "http://localhost:8070/notices/update"
//get notice by title
const Notices_API_GET_NOTICE_BY_TITLE = "http://localhost:8070/notices/getNotice";
//Add a new Teacher
const AddNewTeacherAPI = "http://localhost:8070/Teacher/add";
//Add a new Subject
const AddNewSubjectrAPI = "http://localhost:8070/Subjects/add";
//Add a new lecture notice
const AddNewLectureNoticeAPI = "http://localhost:8070/lectureslides/add";
//Assign a subjcet to a Teacher
const AssignSubjectTeacherAPI = "http://localhost:8070/Teacher/assgin"
//Delete a Notice
const DeletelectureNoticeAPI = "http://localhost:8070/lectureslides/Deletenotice";
//Delete a lecture slide
const DeletelectureslidesAPI = "http://localhost:8070/lectureslides/Deletelectures";
//Delete a Teacher
const DeleteTeacherAPI = "http://localhost:8070/Teacher/Delete";
//Delete a subject
const DeleteSubjectAPI = "http://localhost:8070/Subjects/Delete";
//Get a subject of a student by the section
const GetoneStudentSubjectUsingSectionAPI = "http://localhost:8070/Subjects/GetSubjectusignSection";
//Get all students by the section
const GetAllStudentUsingSectionAPI = "http://localhost:8070/students/getpStudentUsingSection";
//Get all subjects
const GetAllSubjectsAPI = "http://localhost:8070/Subjects/GetAllSubjects";
//Get all lecture notices
const GetAllLectureNotices = "http://localhost:8070/lectureslides/getsubjectNotices"
//Get all Lecture slides
const GetAllLectureslides = "http://localhost:8070/lectureslides/getsubjeclectureslides"
//Get one subject
const GetAllOneSubjectsAPI = "http://localhost:8070/Subjects/GetSubject";
//Get all teachers by grade
const GetAllTeachersUsingGradeAPI = "http://localhost:8070/Teacher/GetAllTeacaherUsingGrade";
//Get all Teachers
const GetAllTeachersAPI = "http://localhost:8070/Teacher/GetAllTeacaher";
//Get one Teacher
const GetAllOneTeachersAPI = "http://localhost:8070/Teacher/GetTeacher";
//Update a Teacher
const UpdateTeacherAPI = "http://localhost:8070/Teacher/update"
//Get student to mark the attendance
const getStudentsForMarkAttendance = "http://localhost:8070/students/getStudentsByClassName";
//Add attendance
const addAttendanceDetails = "http://localhost:8070/attendance/mark";
//Add marks
const addMarks = "http://localhost:8070/marks/add";
//View attendance by class
const viewAttendanceByClassName = "http://localhost:8070/attendance";
//Delete attendance
const deleteAttendance = "http://localhost:8070/attendance/delete";
//Login
const login = "http://localhost:8070/users/login";
//View Marks
const viewMark = "http://localhost:8070/marks/report";
//Update Attendance
const updateAttendance =  "http://localhost:8070/attendance/editAttendance";

class SchoolManagementSystemServices{
    //get all students
    getAllStudents(){
        return axios.get(Student_API_GET_ALL);
    }
    //add a new student
    addStudent(student){
        return axios.post(Student_API_ADD_STUDENT, student);
    }
    //delete a student
    deleteStudent(id){
        return axios.delete(Student_API_DELETE + '/' + id);
    }
    //get student by ID
    getStudentByID(id){
        return axios.get(Student_API_GET_STUDENT_BY_ID + '/' + id);
    }
    //update student
    updateStudentWithoutImage(students,ID) {
        return axios.put(Student_API_UPDATE + '/' + ID, students);
    }
    //get student by admission number
    getStudentByAdmissionNumber(admissionNumber){
        return axios.get(Student_API_GETBY_ADMISSIONNUMBER + '/' + admissionNumber);
    }
    //get student by section
    getStudentBySection(section){
        return axios.get(Student_API_GET_STUDENT_BY_SECTION + '/' + section);
    }
    //get student by class
    getStudentByClass(className){
        return axios.get(Student_API_GET_STUDENT_BY_CLASS + '/' + className);
    }
    //get student by name
    getStudentByName(firstName){
        return axios.get(Student_API_GET_STUDENT_BY_NAME + '/' + firstName);
    }
    //get all notices
    getAllNotices(){
        return axios.get(Notices_API_GET_ALL);
    }
    //delete Notice
    deleteNotice(id){
        return axios.delete(Notices_API_DELETE + '/' + id);
    }
    //get notice by ID
    getNoticeByID(id){
        return axios.get(Notices_API_GET_BY_ID + '/' + id);
    }
    //update notice without new image
    updateNoticeWithoutImage(notices,ID) {
        return axios.put(UpdateNoticeAPI + '/' + ID, notices);
    }
    //get notice by name
    getNoticeByTitle(title){
        return axios.get(Notices_API_GET_NOTICE_BY_TITLE + '/' + title);
    }
    //Add New teacher
    addNewTeacher(teacher) {
        return axios.post(AddNewTeacherAPI,teacher);
    }
    //Add New Subect
    addNewSubject(subject) {
        return axios.post(AddNewSubjectrAPI, subject);
    }
    //Add New lectureslide notice
    addNewLectueNotice(notice) {
        return axios.post(AddNewLectureNoticeAPI, notice);
    }
    //assign subjects to teacher
    assginsubjects(assignSubjects, id) {
        return axios.put(AssignSubjectTeacherAPI + '/' + id, assignSubjects);
    }
    //delete leturenotice
    Deleteleturenotice(id) {
        return axios.delete(DeletelectureNoticeAPI + '/' + id );
    }
    //delete leture slide
    Deletelectureslides(id, lectureslides) {
        return axios.delete(DeletelectureslidesAPI + '/' + id + '/' + lectureslides);
    }
    //delete teacher
    Deleteteacher(id, profile_Picture) {
        return axios.delete(DeleteTeacherAPI + '/' + id + '/' + profile_Picture);
    }
    //delete subject
    Deletesubjects(id,) {
        return axios.delete(DeleteSubjectAPI + '/' + id);
    }
    //get All subject Using Section
    getAllsubjectUsingSection(section) {
        return axios.get(GetoneStudentSubjectUsingSectionAPI + "/" + section);
    }
    //get All Student Using Section
    getAllStudentUsingSection(section) {
        return axios.get(GetAllStudentUsingSectionAPI + "/" + section);
    }
    //get All Subjects
    getAllSubjects() {
        return axios.get(GetAllSubjectsAPI);
    }
    //get All lecture notices
    getalllecturenotices(id) {
        return axios.get(GetAllLectureNotices + '/' + id);
    }
    //get All lecture slides
    getalllectureslides(id) {
        return axios.get(GetAllLectureslides + '/' + id);
    }
    //get All Teachers
    GetAllTeachers() {
        return axios.get(GetAllTeachersAPI);
    }
    //get all the teachers using grade
    getallteachersUsingGrade(Grade) {
        return axios.get(GetAllTeachersUsingGradeAPI + '/' + Grade);
    }
    //get One Subject
    GetOneSubject(ID) {
        return axios.get(GetAllOneSubjectsAPI + '/' + ID);
    }
    //get One Teachers
    GetOneTeachers(ID) {
        return axios.get(GetAllOneTeachersAPI + '/' + ID);
    }
    //update teacher without new image
    updateTeacherwithoutimage(Teacher,ID) {
        return axios.put(UpdateTeacherAPI + '/' + ID, Teacher);
    }
    //update attendance
    UpdateAttendance(attendance){
        return axios.post(updateAttendance,attendance);
    }
    //view marks
    ViewMarks(id){
        return axios.get(viewMark + '/' + id);
    }
    //add marks
    AddMarks(marks){
        return axios.post(addMarks,marks);
    }
    //getStudentSForMarkAttendance
    GetAllStudentsForAttendanceMark(className) {
        return axios.get(getStudentsForMarkAttendance + '/' + className);
    }
    //Mark Attendance
    MarkAttendance(attendance){
        return axios.post(addAttendanceDetails,attendance);
    }
    //View Attendance by class name
    ViewAttendance(className){
        return axios.get(viewAttendanceByClassName + '/' + className);
    }
    //Delete attendance
    DeleteAttendance(attId){
        return axios.delete(deleteAttendance +'/'+ attId);
    }
    //Login
    Login(user){
        return axios.post(login,user);
    }


}
export default new SchoolManagementSystemServices();