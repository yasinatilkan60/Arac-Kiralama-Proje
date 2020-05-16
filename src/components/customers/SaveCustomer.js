import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../../redux/actions/customerActions";
import {Link} from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alertify from "alertifyjs";
class SaveCustomer extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:this.props.customer.firstName,
      lastName:this.props.customer.lastName,
      phoneNumber: this.props.customer.phoneNumber,
      message:  !this.props.customer.firstName ? " kişisi eklendi" : " kişisi güncellendi."
    }
  }
  handleClick(){
    let payload = {
      "id":this.props.customer.id,
      "firstName":this.state.firstName,
      "lastName":this.state.lastName,
      "phoneNumber":this.state.phoneNumber
    }
    this.props.actions.saveCustomer(payload);
    alertify.success(this.state.firstName+" "+ this.state.lastName+" " + this.state.message);
  }
  componentDidMount() {
    this.props.actions.getCurrentCustomer();
  }
  
  render() {
    return (
      <div>
        <Form>
          <FormGroup>
            <Label>Adı</Label>
            <Input placeholder="Müşteri Adı" defaultValue={this.props.customer.firstName}
            onChange = {(e) => this.setState({firstName : e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label>Soyadı</Label>
            <Input
              placeholder="Müşteri Soyadı" defaultValue={this.props.customer.lastName}
              onChange = {(e) => this.setState({lastName : e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label>Telefon Numarası</Label>
            <Input
              placeholder="Müşteri Telefon Numarası" defaultValue={this.props.customer.phoneNumber}
              onChange = {(e) => this.setState({phoneNumber : e.target.value})}
            />
          </FormGroup>
          <Link className="ml-3" to="/customers"><Button color="success" type="submit" onClick={(event) => this.handleClick(event)}>Kaydet</Button></Link>
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
