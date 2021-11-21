import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import { statusOptions, data } from "./data/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
    };

    this.statusFilter = null;
  }

  onTableChange = (type, newState) => {
    this.setState({
      filters: newState.filters,
    });
  };

  resetFilters = () => {
    this.statusFilter("");
  };

  render() {
    const customers = () => {
      const { filters } = this.state;
      let items = [...data];

      const statusFilter = filters?.status ? filters?.status.filterVal : null;

      if (statusFilter) {
        items = items.filter((item) => item.status === statusFilter);
      }

      return items;
    };

    const columns = [
      {
        dataField: "firstName",
        text: "First Name",
      },
      {
        dataField: "lastName",
        text: "Last Name",
      },
      {
        dataField: "carrier",
        text: "Carrier",
      },
      {
        dataField: "status",
        text: "Status",
        filter: selectFilter({
          options: statusOptions,
          getFilter: (filter) => {
            this.statusFilter = filter;
          },
        }),
      },
      {
        dataField: "eventDate",
        text: "Event Date",
      },
    ];

    return (
      <div class="table">
        <BootstrapTable
          keyField="id"
          data={customers()}
          columns={columns}
          remote={{ filter: true }}
          onTableChange={this.onTableChange}
          filter={filterFactory()}
        />
      </div>
    );
  }
}
