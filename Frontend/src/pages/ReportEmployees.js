// import Header from "../Header";

import React, { Component } from "react";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Nik", key: "nik" },
  { label: "Name", key: "name" },
  { label: "Place_Birth", key: "place_birth" },
  { label: "Date_Birth", key: "date_birth" },
  { label: "Email", key: "email" },
  { label: "Gender", key: "gender" },
  { label: "Blood_Type", key: "blood_type" },
  { label: "Address", key: "address" },
  { label: "Rt", key: "rt" },
  { label: "Rw", key: "rw" },
  { label: "Village", key: "vilage" },
  { label: "Districts", key: "districts" },
  { label: "Religion", key: "religion" },
  { label: "Marital", key: "marital" },
  { label: "Occupation", key: "occupation" },
  { label: "Citizen", key: "citizen" },
  { label: "Phone_Number", key: "phone_number" },
  { label: "Status", key: "status" },
];

class ReportEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.csvLinkEl = React.createRef();
  }

  getEmployees = () => {
    return fetch(
      `http://localhost:5000/api/Employees/`
    ).then((res) => res.json());
  };

  downloadReport = async () => {
    const data = await this.getEmployees();
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
        <h1> Report Employees Page</h1>
<br/>
        <div>
          <input
            type="button"
            value="Export to CSV (Async)"
            onClick={this.downloadReport}
          /> 
          <CSVLink
            headers={headers}
            filename="EmployeesReport.csv"
            data={data}
            ref={this.csvLinkEl}
          />
        </div>
      </div>
    );
  }
}

export default ReportEmployees;
