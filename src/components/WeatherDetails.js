import React, { Component } from "react";
import Skycons from "react-skycons";
import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

class WeatherDets extends Component {
  render() {
    let rows = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <div style={{ margin: "5px" }}>
        <Title level={3}>Nairobi, Kenya, Kenya</Title>
        <Title level={4} type="secondary">
          Slight Showers
        </Title>
        <Row>
          <Col span={12} push={12}>
            <Text type="secondary">Precipitation: Rainy</Text>
            <br />
            <Text type="secondary">Humidity: 36.0</Text>
            <br />
            <Text type="secondary">Wind 19Km/h</Text>
          </Col>
          <Col span={12} pull={12}>
            <div style={{ width: "50%" }}>
              <Skycons type="secondary" icon="RAIN" autoplay={true} />
            </div>
            <Text type="secondary">Condition: Rainy</Text>
            <br />
            <Text type="secondary">Temperature: 36.0</Text>
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          {rows.map((value, index) => {
            return (
              <Col span={3}>
                <div style={{textAlign: 'center', backgroundColor:'rgba(255,255,255,0.5)', margin: "1px"}}>
                    <Text type="secondary">day</Text>
                    <Skycons icon="RAIN" autoplay={true}/>
                    <Row>
                        <Col span={1.4}>24</Col>
                        <Col span={1.4}>26</Col>
                    </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default WeatherDets;
