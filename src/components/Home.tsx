import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import SidePanelContainer from "./sidePanel/SidePanelContainer";
import MapWrapper from "./map/MapWrapper";

const rowStyle: React.CSSProperties = {
    marginRight: 0,
    marginLeft: 0,
    height: "100vh"
}

const colStyle: React.CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0
}

const center = {lat: 47.64795, lng: 6.85469};

const Home = () => {
    return (
        <Row style={rowStyle}>
            <Col style={colStyle} sm={8}>
                <MapWrapper zoom={16} center={center}/>
            </Col>
            <Col style={colStyle} sm>
                <SidePanelContainer/>
            </Col>
        </Row>
    )
}

export default Home;