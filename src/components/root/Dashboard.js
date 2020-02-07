import React, { Component } from 'react'
import {Row, Col} from "reactstrap";

import CarList from "../cars/CarList"
import CarOperations from '../cars/CarOperations';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="3">
                        <CarList/>
                    </Col>
                    <Col xs="9">
                        <CarOperations/>
                    </Col>
                </Row>
            </div>
        )
    }
}
