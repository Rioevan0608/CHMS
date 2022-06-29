// import Header from "../Header";

import React, { Component } from "react";
import { CSVLink } from "react-csv";


const headers = [
  { label: "FirstName", key: "firstname" },
  { label: "LastName", key: "lastname" },
  { label: "Email", key: "email" },
  { label: "PlaceOfBirth", key: "placeofbirth" },
  { label: "BirthDate", key: "birthdate" },
  { label: "Country", key: "country" },
  { label: "Current_Location", key: "current_location" },
  { label: "TimeZone", key: "timezone" },
  { label: "Phone", key: "phone" },
  { label: "Status", key: "status" },
];

class ReportUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.csvLinkEl = React.createRef();
  }

  getUsers = () => {
    return fetch(
      `http://localhost:5000/api/users/`
    ).then((res) => res.json());
  };

  downloadReport = async () => {
    const data = await this.getUsers();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        {/* <Header /> */}
        <h1> Report User Page</h1>
<br/>

        <div>
          <input
            type="button"
            value="Export to CSV (Async)"
            onClick={this.downloadReport}
          /> 
          <CSVLink
            headers={headers}
            filename="UserReport.csv"
            data={data}
            ref={this.csvLinkEl}
          />
        </div>
      </div>
    );
  }
}

export default ReportUser;
