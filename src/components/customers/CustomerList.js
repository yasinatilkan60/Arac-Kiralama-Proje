import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as customerActions from "../../redux/actions/customerActions";
import * as carActions from "../../redux/actions/carActions";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
class CustomerList extends Component {
  componentDidMount() {
    this.props.actions.getCustomers();
    this.props.actions.getCars();
  }
  selectCustomer = (customer) => {
    this.props.actions.changeCustomer(customer);
  };
  clearCurrentCustomer = () => {
    this.props.actions.changeCustomer({});
  };
  deleteCustomer = (customer) => {
    this.props.actions.deleteCustomer(customer);
    this.props.actions.getCustomers();
    alertify.error(
      customer.firstName + " " + customer.lastName + " müşterinizi sildiniz."
    );
  };
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Müşteriler</Badge>
          <Link className="ml-3" to="/save-customer">
            <Button color="success" onClick={() => this.clearCurrentCustomer()}>
              <strong>Müşteri Ekle</strong>
            </Button>
          </Link>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Müşteri Adı</th>
              <th>Müşteri Soyadı</th>
              <th>Telefon Numarası</th>
              <th>Aktiflik</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.customers.map((customer) => (
              <tr key={customer.id}>
                <th scope="row">{customer.id}</th>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phoneNumber}</td>
                <td>
                  {this.props.cars.filter(
                    (car) => car.customers_Id === customer.id
                  ).length === 0
                    ? "Pasif Müşteri"
                    : "Aktif Müşteri"}
                </td>
                <td>
                  <Link className="ml-3" to="/save-customer">
                    <Button
                      color="warning"
                      onClick={() => this.selectCustomer(customer)}
                    >
                      <FaUserEdit
                        size={15}
                        style={{ verticalAlign: "baseline" }}
                      ></FaUserEdit>
                      <strong>Güncelle</strong>
                    </Button>
                  </Link>
                  <Button
                    disabled={
                      this.props.cars.filter(
                        (car) => car.customers_Id === customer.id
                      ).length !== 0
                    }
                    className="ml-2"
                    color="danger"
                    onClick={() => this.deleteCustomer(customer)}
                  >
                    <FaTrashAlt
                      size={15}
                      style={{ verticalAlign: "baseline" }}
                    ></FaTrashAlt>
                    <strong>Sil</strong>
                  </Button>
                </td>
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
    customers: state.customerListReducer,
    cars: state.carListReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
      changeCustomer: bindActionCreators(
        customerActions.changeCurrentCustomer,
        dispatch
      ),
      deleteCustomer: bindActionCreators(
        customerActions.deleteCustomer,
        dispatch
      ),
      getCars: bindActionCreators(carActions.getCars, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
