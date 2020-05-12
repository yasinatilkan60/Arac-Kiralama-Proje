import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import {Link} from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,

} from "reactstrap";
import alertify from "alertifyjs";
class SaveCar extends Component {
  constructor(props){
    super(props);
    localStorage.clear();
    this.state={
      name:this.props.car.name,
      model:this.props.car.model,
      dailyPrice:this.props.car.dailyPrice,
    }
  }
  handleClick(){
    let payload={
      "id":this.props.car.id,
      "customersId":this.props.car.customersId,
      "image":this.props.car.image,
      "name":this.state.name,
      "model":this.state.model,
      "dailyPrice":this.state.dailyPrice,
      "isRented":this.props.car.isRented
    }
    this.props.actions.saveCar(payload);
    alertify.success(this.state.name+" aracını güncellediniz.");
  }
  componentDidMount() {
    this.props.actions.getCurrentCar();
  }
  render() {
    return (
        
      <div>
        <Form>
          <FormGroup>
            <Label>Araba Adı</Label>
            <Input placeholder="Araba Adı"
            defaultValue={this.props.car.name} 
            onChange = {(e) => this.setState({name : e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label>Modeli</Label>
            <Input
              placeholder="Araba Modeli"
              defaultValue={this.props.car.model}
              onChange = {(e) => this.setState({model : e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label>Günlük Fiyat</Label>
            <Input
              placeholder="Günlük Fiyat"
              defaultValue={this.props.car.dailyPrice}
              onChange = {(e) => this.setState({dailyPrice : e.target.value})}
            />
          </FormGroup>
          <Link className="ml-3" to="/cars"><Button color="success" type="submit" onClick={(event) => this.handleClick(event)}>Kaydet</Button></Link>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    car: state.currentCarReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCurrentCar: bindActionCreators(
        carActions.getCurrentCar,
        dispatch
      ) ,
      saveCar: bindActionCreators(
          carActions.saveCar,
          dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveCar);
