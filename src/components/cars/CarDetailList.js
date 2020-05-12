import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import { Badge, Button } from 'reactstrap';
import { Table } from "reactstrap";
import {Link} from "react-router-dom";
import Image from 'react-bootstrap/Image';
class CarDetailList extends Component {
    componentDidMount() {
        this.props.actions.getCars();
    }
    clearCurrentCar = () => {
        this.props.actions.changeCar({});
    }
    selectCar = car => {
        this.props.actions.changeCar(car);
      }
    render() {
        return (
            <div>
        <h3>
          <Badge color="warning">Arabalar</Badge>
          <Link className="ml-3" to="/save-car"><Button color="success" onClick={() => this.clearCurrentCar()}><strong>Araba ekle</strong></Button></Link>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Resim</th>
              <th>Ad</th>
              <th>Model</th>
              <th>Günlük Fiyat</th>
              <th>Durum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cars.map(car => (
              <tr key={car.id}>
                <th scope="row">{car.id}</th>
                <td><Image width="100" src={require('../../img/'+car.image+".png")} alt="value"/></td>
                <td>{car.name}</td>
                <td>{car.model}</td>
                <td>{car.dailyPrice}</td>
                <td>{car.isRented ? "Kirada" : "Hazır"}</td>
                {<td><Link className="ml-3" to="/save-car"><Button color="warning" onClick={() => this.selectCar(car)}><strong>Güncelle</strong></Button></Link></td>}
              </tr>
            ))}
          </tbody>
        </Table>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(CarDetailList);