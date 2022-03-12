import React, {Component} from 'react';
import img1 from "../images/img_s1.png"
import img2 from "../images/img_s2.png"
import img3 from "../images/img_s3.png"
import cms from  "../services/SchoolManagementSystemServices";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:''
        }
        this.changeUserNameHander = this.changeUserNameHander.bind(this);
        this.changePasswordHander = this.changePasswordHander.bind(this);
    }
    changeUserNameHander = (event) =>{
        this.setState({username : event.target.value});
    }
    changePasswordHander = (event) =>{
        this.setState({password : event.target.value});
    }

    Login = (e) =>{
        e.preventDefault();
        if(this.state.username != '' && this.state.password != ''){
            if(this.state.username.startsWith('T') || this.state.username.startsWith('t')){
                let User = {Username : this.state.username, password: this.state.password, type : 'Teacher'};
                cms.Login(User).then(res =>{
                    console.log(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    this.props.history.push("/teacherDashboard");
                }).catch(err =>{
                    alert('Login failed!!!');
                });
            }else if(this.state.username.startsWith('S') || this.state.username.startsWith('s')){
                let user = {Username : this.state.username, password: this.state.password, type : 'Student'};
                cms.Login(user).then(res =>{
                    console.log(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    this.props.history.push("/studentDashboard");
                }).catch(err =>{
                    alert('Login failed!!!');
                });
            }else if(this.state.username.startsWith('A') || this.state.username.startsWith('a')){
                let user = {Username : this.state.username, password: this.state.password, type : 'Admin'};
                cms.Login(user).then(res =>{
                    console.log(res.data.token);
                    localStorage.setItem("token",res.data.token);
                    this.props.history.push("/dashboard");
                }).catch(err =>{
                    alert('Login failed!!!');
                });
            }else{
                alert('Please enter your username!');
            }
        }else {
            if(this.state.username == '' && this.state.password == ''){
                alert('UserName and Password can not be empty!');
            }else if(this.state.username == ''){
                alert('Please enter your username!');
            }else{
                alert('Please enter your password!');
            }
        }
    }
    render() {
        return (
            <div className="login-body">
                <div className="row">
                    <div className="col-sm-4">
                        <center>
                            <h3 className="WelcomeText" data-testid="test_header">Welcome Back</h3>
                            <h6 className="bodyText">This School Management Software has been designed to streamline school management and administrative functions through Information and Communication Technology .</h6>
                            <div id="carouselExampleControls" style={{width:"60%"}} className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                        className="active text-dark"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img className="d-block w-100" src={img1} alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src={img2} alt="Second slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block w-100" src={img3} alt="Third slide" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button"
                                   data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button"
                                   data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </center>
                    </div>
                    <div className="col-sm-7 signinText">
                        <h1 className="">Sign in</h1>
                        <center>
                            <form action="#">
                                <input type="text" placeholder="User Name" onChange={this.changeUserNameHander} className="form-control loginInputs mt-2"/> <br/>
                                <input type="password" onChange={this.changePasswordHander} placeholder="Password" className="form-control loginInputs mt-2"/> <br/>
                                <a href="#"> <small data-testid="test_forgot" className="text-secondary">Forgot your password ? </small> </a> <br/>
                                <button type="button" onClick={this.Login} className=" mt-2 btn-lg btn-signin">SIGN IN</button>
                            </form>
                        </center>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;