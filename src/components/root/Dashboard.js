import React, { Component } from 'react'
import {Row, Col} from "reactstrap";

import CarList from "../cars/CarList"

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col xs="3">
                        <CarList/>
                    </Col>
                </Row>
            </div>
        )
    }
}
