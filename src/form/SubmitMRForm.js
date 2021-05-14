import react from "react";
import {Box, Button, Card, Form, Input, Select} from "@alifd/next";
import * as React from "react";


import User from "../data/user";

import '../static/css/home/Servers.css';
import '../static/css/home/WorkBench.css';
import axios from "axios";
import qs from "qs";

class SubmitMRForm extends react.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <Card.Content>
                <Form className="HierarchicalForm">
                </Form>
            </Card.Content>
        )
    }
}

export default SubmitMRForm