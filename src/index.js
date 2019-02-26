import React, { Component } from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class App extends Component {
  constructor(prop) {
    super(prop);
    this.model = require("./entityMeta.json");
    this.original = require("./entityData.json");
    this.state = this.original;

    console.log(this.model);
    this.onChange = this.onChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  onSubmit(e) {
    let data = this.state;
    data.$original = this.original;
    console.log(this.state);
    alert(JSON.stringify(data));
    e.preventDefault();
  }

  handleSave() {
    let data = this.state;
    let orgData = {};
    this.model.field.map(m => {
      orgData[m.name] = this.original[m.name] || null;
    });

    data.$original = orgData;
    console.log(this.state);
    alert(JSON.stringify(data));
    sessionStorage.setItem("result", data);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <label>{this.model.name}:</label>
          </div>
          <div className="col-4">
            <label>{this.model.label}</label>
          </div>
          <div className="col-4">
            <button
              className="btn btn-success"
              type="button"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
        </div>

        <form
          className="form-inline"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
        </form>
      </div>
    );
  }

  renderForm() {
    let dataType = { String: "text", Integer: "number", Date: "date" };

    let formField = this.model.field.map(m => {
      let key = m.name;
      let type = dataType[m.dataType] || "text";
      let props = m.props || {};

      if (m.system === "true") type = "hidden";
      return (
        <div key={key} className="form-group col-4 mb-2">
          <label key={"l" + key} htmlFor={m.key}>
            {m.label}
          </label>
          :
          <input
            {...props}
            name={key}
            ref={key => (this[m.key] = key)}
            className="form-control"
            type={type}
            value={this.state[key]}
            onChange={this.onChange}
            key={"i" + m.key}
          />
        </div>
      );
    });

    return formField;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
