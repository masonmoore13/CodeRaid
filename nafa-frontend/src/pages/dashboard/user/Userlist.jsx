import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { getUserProfile } from "../../../api/apiCalls";
import "./userlist.css";
import {data} from "../../../dummyUserData"

export default function UserList() {
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  const columns = [
    //{ dataField: "id", text: "Id", sort: true },
    {
      dataField: "first_name",
      text: "First Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "maiden_name",
      text: "Maiden Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "email", text: "Email", sort: true, filter: textFilter() },
    {
      dataField: "grad_year",
      text: "Graduation Year",
      sort: true,
      filter: textFilter(),
    },
    // {

    //   dataField: "",
    //   text: "Relationship",
    //   sort: true,
    //   filter: textFilter(),
    // },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 25,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    getUserProfile().then((result) => {
      console.log(result.data);
      setUserList(result.data);
    });
  }, []);

  //Get relationship by first user ID.
  // const { id } = useParams("");
  // const [relationship, setRelationship] = useState([]);

  // useEffect(() => {
  //   getRelationship().then((result) => {
  //     setUserList(result.data);
  //   });
  // }, []);

  const CaptionElement = () => (
    <h3
      style={{
        textAlign: "center",
        color: "black",
        padding: "0.3em",
      }}
    >
      User Search
    </h3>
  );

  const rowClasses = "data-row";

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate(`/dashboard/userprofile/${row.id}`);
    },
  };

  console.log(userList);

  return (
    <div className="table">
      <BootstrapTable
        bootstrap4
        striped
        bordered
        caption={<CaptionElement />}
        keyField="id"
        columns={columns}
        data={ userList }
        filter={filterFactory()}
        pagination={pagination}
        rowClasses={rowClasses}
        rowEvents={rowEvents}
      />
    </div>
  );
}
