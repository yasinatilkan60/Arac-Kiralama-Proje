import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,

} from "reactstrap";
class SaveCar extends Component {
  componentDidMount() {
    this.props.actions.getCurrentCar();
  }
  render() {
    return (
        
      <div>
        <Form>
          <FormGroup>
            <Label>Araba Adı</Label>
            <Input placeholder="Araba Adı" defaultValue={this.props.car.name} />
          </FormGroup>
          <FormGroup>
            <Label>Modeli</Label>
            <Input
              placeholder="Araba Modeli"
              defaultValue={this.props.car.model}
            />
          </FormGroup>
          <FormGroup>
            <Label>Günlük Fiyat</Label>
            <Input
              placeholder="Günlük Fiyat"
              defaultValue={this.props.car.dailyPrice}
            />
          </FormGroup>
          <Button color="success" type="submit">
            Kaydet
          </Button>
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
      ) /*,
        saveCar: bindActionCreators(
          carActions.saveCar,
          dispatch
        )*/
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveCar);
