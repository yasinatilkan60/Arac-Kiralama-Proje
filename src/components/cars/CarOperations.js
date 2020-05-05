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
} from "reactstrap";
class CarOperations extends Component {
  componentDidMount() {
    this.props.actions.getCustomers();
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      actions: [],
      dropDownValue: "Müşteri",
      dropdownOpen: false,
    };
    //this.handleChange = this.handleChange.bind(this);
  }
  toggle(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  changeValue(e) {
    this.setState({ dropDownValue: e.currentTarget.textContent });
    let id = e.currentTarget.getAttribute("id");
    console.log(id);
  }
  rentCar = (car) => {
    car.isRented = !car.isRented;
    this.props.actions.saveCarApi(car);
  }
  render() {
    return (
      <div className="my-2">
        <Card style={{ width: "100%", height: "300px" }} className="p-3">
          <div>
            <label>
              <strong>Araç adı:</strong> {this.props.currentCar.name}
            </label>
          </div>
          <div>
            <label>
              <strong>Araç modeli:</strong> {this.props.currentCar.model}
            </label>
          </div>
          <div>
            <label>
              <strong>Araç durumu:</strong>
              {this.props.currentCar.isRented && "Hazır"}
              {this.props.currentCar.isRented === false && "Kirada"}
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
                  <label>
                    <FormGroup>
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret>
                          {this.state.dropDownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          {
                          this.props.customerList.map((customer) => (
                             <DropdownItem key={customer.id} onClick={this.changeValue} value={customer.value}>
                              {customer.firstName} {customer.lastName}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </FormGroup>
                  </label>
              </div>
              <Button color="success" onClick={() => this.rentCar(this.props.currentCar)}>Kirala</Button>
              </div>
            ) : (
              <Button color="warning" onClick={() => this.rentCar(this.props.currentCar)}>İade al</Button>
            )}
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCar: state.changeCarReducer,
    customerList: state.customerListReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeCar: bindActionCreators(carActions.changeCar, dispatch),
      getCustomers: bindActionCreators(customerActions.getCustomers, dispatch),
      saveCarApi : bindActionCreators(carActions.saveCarApi,dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarOperations);
