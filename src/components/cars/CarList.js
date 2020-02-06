import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
class CarList extends Component {
    componentDidMount(){
        this.props.actions.getCars();
    }
    render() {
        return (
            <div className="my-2">
                <h2>
                    <Badge color="success">Araçlar</Badge>
                </h2>
                <ListGroup>
                    {this.props.cars.map(car => (
                        <ListGroupItem key={car.id}>
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
      cars: state.carListReducer
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        getCars: bindActionCreators(carActions.getCars, dispatch)
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarList);