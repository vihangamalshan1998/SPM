import React, {Component} from 'react';

class IndexHeader extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row indexHeader">
                    <div className="col-sm-4 mt-2 mb-2  text-light">
                        <center>
                            <h1 className="topicRowHeader">KIDZ SCHOOL</h1>
                            <small className="ULlist" ><a className="text-light" href={"/"} >Home</a></small>
                            <small className="ULlist" ><a className="text-light" href={"/about"}>About us</a></small>
                            <small className="ULlist"><a className="text-light" href={"/contact"}>Contact us</a></small>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndexHeader;