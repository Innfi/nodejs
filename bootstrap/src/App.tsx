import React from 'react';

import { Button, Row, Table } from 'react-bootstrap';

const App = () => {
  return (
    <div>
      <Row className="mx-0">
        <Button variant="primary">Button #1</Button>
      </Row>
      <div>
        start from here
      </div>
      <Table striped={true} bordered={true} hover={true}>
        <thead>
          <th>#</th>
          <th>first name</th>
          <th>last name</th>
          <th>username</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>mark</td>
            <td>otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>jacob</td>
            <td>thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>larry</td>
            <td>@twtr</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default App;
