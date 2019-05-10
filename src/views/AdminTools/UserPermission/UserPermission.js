/**
 * @author {[Monty Khanna]}
 */
import React, {Component} from 'react';
import {Row, Col, Card, CardHeader } from 'reactstrap';

class UserPermission extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                  User Permission
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UserPermission;