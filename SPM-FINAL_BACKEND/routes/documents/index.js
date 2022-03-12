
module.exports = ({ students }) => {
    const today = new Date();
    const Imageurl = 'http://localhost:8070/uploads/';
    students.forEach(function() {
        studentProfilePicture = (students[0].image)
        admissionNumber = (students[0].admissionNumber)
        firstName = (students[0].firstName)
        lastname = (students[0].lastName)
        section = (students[0].section)
        className = (students[0].className)
        gender = (students[0].gender)
        dateOfBirth = (students[0].dateOfBirth)
        mobileNumber = (students[0].mobileNumber)
        email = (students[0].email)
        address = (students[0].address)
        guardianName = (students[0].guardianName )
        guardianRelationship = (students[0].guardianRelationship)
        guardianMobileNumber = (students[0].guardianMobileNumber)
        guardianEmail = (students[0].guardianEmail)

    })


        //console.log(firstName);
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>Student Detail Report</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 20px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
          <div class="invoice-box">
          <h1 style="align-content: center">KIDZ School</h1>
          <h3>KIDZ School, Stanmore Crescent, Colombo 07</h3>
             <table cellpadding="0" cellspacing="0">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td class="title"><img  src="http://www.sts-school.edu.in/wp-content/uploads/2019/10/Best-School-in-Meerut-1.png"
                               style="width:100%; max-width:156px;">
                               </td>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                            </td>
                          
                         </tr>
                         <tr>
                         
                           <td><h1>Student Detail Report</h1></td>
                         </tr>
                         <tr>
                           <td>
                                <h2>To whom it may concern, </h2>
                                <h4>This is to certify that ${firstName} ${lastname} is a Student at KIDZ School, Stanmore Crescent, Colombo 07</h4>    
                           </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information">
                   <td colspan="2">
                      <table>
                      <tr>
                        <td>
                        <img  src=${Imageurl + studentProfilePicture}
                               style="width:100%; max-width:200px;margin-left:300px;border: 3px solid black;">
                        </td>
                      
                       </tr>
                         <tr>
                         <td>
                               Admission Number: ${admissionNumber}
                            </td>
                            
                            <td>
                               Firstname: ${firstName}
                            </td>
                           
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Info:</td>
                   <td>Student Details:</td>
                </tr>
                <tr class="item">
                   <td>First item:</td>
                   <td>${firstName}</td>
                </tr>
                <tr class="item">
                   <td>Second item:</td>
                   <td>${lastname}</td>
                </tr>
                <tr class="item">
                    <td>Section:</td>
                    <td>${section}</td>
                </tr>
                 <tr class="item">
                    <td>Classn Name:</td>
                    <td>${className}</td>
                </tr>
                 <tr class="item">
                    <td>Gender:</td>
                    <td>${gender}</td>
                </tr>
                 <tr class="item">
                    <td>Date of Birth:</td>
                    <td>${dateOfBirth}</td>
                </tr>
                <tr class="item">
                    <td>Mobile Number:</td>
                    <td>${mobileNumber}</td>
                </tr>
                <tr class="item">
                    <td>Email:</td>
                    <td>${email}</td>
                </tr>
                 <tr class="item">
                    <td>Address:</td>
                    <td>${address}</td>
                </tr>
                <br/><br/>
                <tr class="heading">
                    <td>Parent/Guardian Info:</td>
                    <td>Guardian Details</td>
                </tr>
                <tr class="item">
                    <td>Guardian Name:</td>
                    <td>${guardianName}</td>
                </tr>
                <tr class="item">
                    <td>Guardian Relationship:</td>
                    <td>${guardianRelationship}</td>
                </tr>
                <tr class="item">
                    <td>Guardian Mobile Number:</td>
                    <td>${guardianMobileNumber}</td>
                </tr>
                <tr class="item">
                    <td>Guardian Email:</td>
                    <td>${guardianEmail}</td>
                </tr>
             </table>
           <div style="align-items: center">
                <h5>KIDZ School, Stanmore Crescent, Colombo 07</h5>
                 <h5> Contact No: 0772825389</h5>
            </div>
          </div>
       </body>
    </html>
    `;
};