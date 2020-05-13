import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import * as customerActions from "../../redux/actions/customerActions";
import {
  Card,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import Image from 'react-bootstrap/Image';
import alertify from "alertifyjs";
class CarOperations extends Component {
  componentDidMount() {
    this.props.actions.getCustomers();
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeCurrentCustomer = this.changeCurrentCustomer.bind(this);
    this.state = {
      actions: [],
      dropDownValue: "Müşteri",
      dropdownOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }
  toggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  changeCurrentCustomer = (e, customer) => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
    console.log(customer.id);
    this.props.actions.changeCurrentCustomer(customer);
  };
  rentCar = (car, customer) => {
    car.isRented = true;
    car.customersId = customer.id;
    this.props.actions.saveCar(car);
    this.props.actions.getCars();
    this.setState({ dropDownValue: "Müşteri" });
    alertify.success(car.name + " aracınızı kiraladınız.");
  };
  getCar = (car) => {
    car.isRented = false;
    car.customersId = 0;
    this.props.actions.saveCar(car);
    this.props.actions.getCars();
    this.setState({ dropDownValue: "Müşteri" });
    alertify.warning(car.name + " aracınızı iade aldınız.");
  };
  render() {
    return (
      <div className="my-2">
        <Card style={{ width: "100%", height: "300px" }} className="p-3">
          <Container>
            <Row>
              <Col xs="5">
                <div>
                  <div>
                    <label>
                      <strong>Araç adı:</strong> {this.props.currentCar.name}
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Araç modeli:</strong>{" "}
                      {this.props.currentCar.model}
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Araç durumu:</strong>
                      {this.props.currentCar.isRented && "Kirada"}
                      {this.props.currentCar.isRented === false && "Hazır"}
                    </label>
                  </div>
                  <div>
                    <label>
                      <strong>Günlük fiyat:</strong>
                      {this.props.currentCar.dailyPrice}
                    </label>
                  </div>
                  <div>
                    {!this.props.currentCar.isRented ? (
                      <div>
                        <div>
                          <FormGroup>
                            <Dropdown
                              isOpen={this.state.dropdownOpen}
                              toggle={this.toggle}
                            >
                              <DropdownToggle caret>
                                {this.state.dropDownValue}
                              </DropdownToggle>
                              <DropdownMenu>
                                {this.props.customerList.map((customer) => (
                                  <DropdownItem
                                    key={customer.id}
                                    onClick={(e) =>
                                      this.changeCurrentCustomer(e, customer)
                                    }
                                    value={customer.value}
                                  >
                                    {customer.firstName} {customer.lastName}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </div>
                        <Button
                          disabled={
                            !this.props.currentCar.name ||
                            !this.props.currentCustomer.firstName
                          }
                          color="success"
                          onClick={() =>
                            this.rentCar(
                              this.props.currentCar,
                              this.props.currentCustomer
                            )
                          }
                        >
                          Kirala
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <label>
                          <strong>Müşteri:</strong>{" "}
                          {this.props.customerList
                            .filter(
                              (i) => i.id === this.props.currentCar.customersId
                            )
                            .map((a) => (
                              <label key={a.id}>
                                {a.firstName} {a.lastName}
                              </label>
                            ))}
                        </label>
                        <div>
                          <Button
                            color="warning"
                            onClick={() => this.getCar(this.props.currentCar)}
                          >
                            İade al
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col xs="4" >
                {this.props.currentCar.name && 
                <Image width="400" src={require('../../img/'+this.props.currentCar.image+".png")} alt="value"/>}
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCar: state.changeCarReducer,
    customerList: state.customerListReducer,
    currentCustomer: state.currentCustomerReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
      saveCar: bindActionCreators(carActions.saveCar, dispatch),
      getCars: bindActionCreators(carActions.getCars, dispatch),
      changeCurrentCustomer: bindActionCreators(
        customerActions.changeCurrentCustomer,
        dispatch
      ),
      saveCustomer: bindActionCreators(customerActions.saveCustomer, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarOperations);
