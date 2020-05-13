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
      customersId: 0,
      image: "",
      name:"",
      model:"",
      dailyPrice:"",
      isRented: false,
    }
  }
  handleClick(){
    let payload={
      "customersId":0,
      "image":this.state.image,
      "name":this.state.name,
      "model":this.state.model,
      "dailyPrice":this.state.dailyPrice,
      "isRented":false
    }
    this.props.actions.saveCar(payload);
    alertify.success(this.state.name+" aracını eklediniz.");
  }
  render() {
    return (
        
      <div>
        <Form>
          <FormGroup>
            <Label>Araba Adı</Label>
            <Input placeholder="Araba Adı" 
            onChange = {(e) => this.setState({name : e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label>Resim</Label>
            <Input placeholder="Resim" 
            onChange = {(e) => this.setState({image : e.target.value})}/>
          </FormGroup>
          <FormGroup>
            <Label>Modeli</Label>
            <Input
              placeholder="Araba Modeli"
              onChange = {(e) => this.setState({model : e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label>Günlük Fiyat</Label>
            <Input
              placeholder="Günlük Fiyat"
              onChange = {(e) => this.setState({dailyPrice : e.target.value})}
            />
          </FormGroup>
          <Link className="ml-3" to="/cars"><Button color="success" type="submit" onClick={(event) => this.handleClick(event)}>Ekle</Button></Link>
        </Form>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {};
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveCar: bindActionCreators(
          carActions.saveCar,
          dispatch
      )
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SaveCar);