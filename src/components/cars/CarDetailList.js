import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as carActions from "../../redux/actions/carActions";
import { Badge, Button } from "reactstrap";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import alertify from "alertifyjs";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
class CarDetailList extends Component {
  componentDidMount() {
    this.props.actions.getCars();
  }
  clearCurrentCar = () => {
    this.props.actions.changeCar({});
  };
  selectCar = (car) => {
    this.props.actions.changeCar(car);
  };
  deleteCar = (car) => {
    this.props.actions.deleteCar(car);
    this.props.actions.getCars();
    alertify.error(car.name + " aracınızı sildiniz.");
  };
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Arabalar</Badge>
          <Link className="ml-3" to="/add-car">
            <Button color="success" onClick={() => this.clearCurrentCar()}>
              <strong>Araba ekle</strong>
            </Button>
          </Link>
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
            {this.props.cars.map((car) => (
              <tr key={car.id}>
                <th scope="row">{car.id}</th>
                <td>
                  <Image
                    width="100"
                    src={require("../../img/" + car.image + ".png")}
                    alt="value"
                  />
                </td>
                <td>{car.name}</td>
                <td>{car.model}</td>
                <td>{car.dailyPrice}</td>
                <td>{car.isRented ? "Kirada" : "Hazır"}</td>
                {
                  <td>
                    <Link className="ml-3" to="/save-car">
                      <Button
                        color="warning"
                        onClick={() => this.selectCar(car)}
                      >
                        <FaUserEdit
                          size={15}
                          style={{ verticalAlign: "baseline" }}
                        ></FaUserEdit>
                        <strong>Güncelle</strong>
                      </Button>
                    </Link>
                    <Button
                      disabled={car.isRented}
                      className="ml-2"
                      color="danger"
                      onClick={() => this.deleteCar(car)}
                    >
                      <FaTrashAlt
                        size={15}
                        style={{ verticalAlign: "baseline" }}
                      ></FaTrashAlt>
                      <strong>Sil</strong>{" "}
                    </Button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    cars: state.carListReducer,
    currentCar: state.changeCarReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCars: bindActionCreators(carActions.getCars, dispatch),
      changeCar: bindActionCreators(carActions.changeCar, dispatch),
      deleteCar: bindActionCreators(carActions.deleteCar, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailList);
