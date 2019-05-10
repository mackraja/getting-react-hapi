/**
 * @author {[Monty Khanna]}
 */
import React, {Component} from 'react';
import {Row, Col, Card, CardHeader} from 'reactstrap';

class Client extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                  Client
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Client;