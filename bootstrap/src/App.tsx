import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Col, Row } from 'react-bootstrap';

const App = () => {
  return (
    <Row className="mx-0">
      <Button as={Col} variant="primary">Button #1</Button>
    </Row>
    <div>
      start from here
    </div>
  );
};

export default App;
