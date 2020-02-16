import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../../redux/actions/customerActions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SaveCustomer extends Component {
  componentDidMount() {
    this.props.actions.getCurrentCustomer();
  }
  
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Adı</Label>
            <Input placeholder="Müşteri Adı" defaultValue={this.props.customer.firstName}/>
          </FormGroup>
          <FormGroup>
            <Label>Soyadı</Label>
            <Input
              placeholder="Müşteri Soyadı" defaultValue={this.props.customer.lastName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Telefon Numarası</Label>
            <Input
              placeholder="Müşteri Telefon Numarası" defaultValue={this.props.customer.phoneNumber} 
            />
          </FormGroup>
          <Button color="success" type="submit">Kaydet</Button>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    customer: state.currentCustomerReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCurrentCustomer: bindActionCreators(
        customerActions.getCurrentCustomer,
        dispatch
      ),
      saveCustomer: bindActionCreators(
        customerActions.saveCustomer,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveCustomer);
