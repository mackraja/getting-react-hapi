/**
 * @author {[Monty Khanna]}
 */
import React, {Component} from 'react';
import {Row, Col, Card, CardHeader} from 'reactstrap';

class ListClients extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                  List Clients
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ListClients;