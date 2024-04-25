import React from 'react';
import Form from '../Components/Form';
import Header from '../Components/Header';
import Table from '../Components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p>Wallet</p>
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
