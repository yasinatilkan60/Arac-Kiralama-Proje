import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
class CarList extends Component {
    componentDidMount(){
        this.props.actions.getCars();
    }
    selectCar = car => {
        this.props.actions.changeCar(car);
    }
    render() {
        return (
            <div className="my-2">
                <h2 className="my-1">
                    <Badge color="success">Hazır Araçlar</Badge>
                </h2>
                <ListGroup>
                    {this.props.cars.filter(car => !car.isRented).map(car => (
                        <ListGroupItem key={car.id} active={car.id === this.props.currentCar.id}onClick={()=> this.selectCar(car)} >
                            {car.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <h2 className="my-1">
                    <Badge color="success">Kiralanmış Araçlar</Badge>
                </h2>
                <ListGroup>
                    {this.props.cars.filter(car => car.isRented).map(car => (
                        <ListGroupItem key={car.id} active={car.id === this.props.currentCar.id}onClick={()=> this.selectCar(car)} >
                            {car.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      cars: state.carListReducer,
      currentCar : state.changeCarReducer
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        getCars: bindActionCreators(carActions.getCars, dispatch),
        changeCar: bindActionCreators(carActions.changeCar, dispatch)
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarList);