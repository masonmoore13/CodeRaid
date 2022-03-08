import React from "react";
import { Table, Card } from "react-bootstrap";


export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);
  return (
    <Table
      className="dataTable m-2"
      striped
      bordered
      hover
      responsive
      size="sm"
      variant="secondary"
    >
      <thead>
        <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
