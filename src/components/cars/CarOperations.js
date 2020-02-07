import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import {Card} from "reactstrap";
class CarOperations extends Component {
    render() {
        return (
            <div className="my-2">
                <Card style={{width:"100%", height:"300px"}} className="p-3">
                <div>
                    <label><strong>Araç adı:</strong> {this.props.currentCar.name}</label>
                </div>
                <div>
                    <label><strong>Araç modeli:</strong> {this.props.currentCar.model}</label>
                </div>
                <div>
                    <label><strong>Araç Durumu:</strong>
                    {this.props.currentCar.isRented && "Hazır"}
                    {this.props.currentCar.isRented===false && "Kirada"}
                    </label>
                </div>
                </Card>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      currentCar : state.changeCarReducer
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        changeCar: bindActionCreators(carActions.changeCar, dispatch)
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarOperations);
