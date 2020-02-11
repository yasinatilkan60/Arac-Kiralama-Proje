import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as customerActions from "../../redux/actions/customerActions";
import { Table } from "reactstrap";
import {Link} from "react-router-dom";

class CustomerList extends Component {
  componentDidMount() {
        this.props.actions.getCustomers();
  }
  selectCustomer = customer => {
    this.props.actions.changeCustomer(customer);
  }
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Müşteriler</Badge>
          <Link className="ml-3" to="/save-customer"><Badge color="success">Müşteri Ekle</Badge></Link>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Müşteri Adı</th>
              <th>Müşteri Soyadı</th>
              <th>Müşteri Soyadı</th>
              <th>Aktiflik</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.customers.map(customer => (
              <tr key={customer.id}>
                <th scope="row">{customer.id}</th>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.active ? "Aktif Müşteri" : "Pasif Müşteri"}</td>
                <td><Button onClick={() => this.selectCustomer(customer)}></Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    customers: state.customerListReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
      changeCustomer: bindActionCreators(customerActions.changeCurrentCustomer, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
