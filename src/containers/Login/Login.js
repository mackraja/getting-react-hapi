/**
 * @author {[Monty Khanna]}
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Container, Row, Col, CardGroup, Card, CardBody, Button, Form, InputGroup } from 'reactstrap';
import { TextBox } from '../../components/Form';
import { login } from '../../redux/modules/auth';
import { required, email } from '../../utils/validation';
import logo from '../../style/img/logo.png';

class Login extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        forgotPasswordFlag: PropTypes.bool
    };

    state = {
        loading: true,
        forgotPasswordFlag: false
    };

    constructor(props) {
        super(props);
        this.isShowForgot = this.isShowForgot.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    isShowForgot = () => {
        const { forgotPasswordFlag } = this.state;
        this.setState({ forgotPasswordFlag: !forgotPasswordFlag });
    };

    handleSubmit = async (data) => {
        const { dispatch } = this.props;
        const loginData = data.toJSON();
        console.log('handleSubmit ------- ', data.toJSON());
        await dispatch(login(loginData));
    };

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        const { forgotPasswordFlag } = this.state;

        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup className="mb-4">
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={handleSubmit(this.handleSubmit)}>
                                            <h1>{forgotPasswordFlag ? 'Forgot Password' : 'Login'}
                                            </h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            {forgotPasswordFlag &&
                                            <InputGroup className="mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <i className="icon-envelope"></i>
                                                    </span>
                                                </div>
                                                <Field
                                                    name="email"
                                                    type="text"
                                                    placeholder="Enter your Email"
                                                    component={TextBox}
                                                    validate={[required, email]}
                                                />
                                            </InputGroup>
                                            }
                                            {!forgotPasswordFlag &&
                                            <InputGroup className="mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <i className="icon-user"></i>
                                                    </span>
                                                </div>
                                                <Field
                                                    name="username"
                                                    type="text"
                                                    placeholder="UserName"
                                                    component={TextBox}
                                                    validate={required}
                                                />
                                            </InputGroup>
                                            }
                                            {!forgotPasswordFlag &&
                                            <InputGroup className="mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                      <i className="icon-lock"></i>
                                                    </span>
                                                </div>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    component={TextBox}
                                                    validate={required}
                                                />
                                            </InputGroup>
                                            }
                                            <Row>
                                                <Col xs="3">
                                                    <Button type="submit" color="primary" className="px-3">
                                                        {forgotPasswordFlag ? 'Send' : 'Login'}
                                                    </Button>
                                                </Col>
                                                {!forgotPasswordFlag &&
                                                <Col xs="3">
                                                    <Button disabled={pristine || submitting} onClick={reset}
                                                            className="px-3">Reset</Button>
                                                </Col>
                                                }
                                                {forgotPasswordFlag &&
                                                <Col xs="3">
                                                    <Button onClick={this.isShowForgot} className="px-3">
                                                        Cancel
                                                    </Button>
                                                </Col>
                                                }
                                                {!forgotPasswordFlag &&
                                                <Col xs="6" className="text-right">
                                                    <Button onClick={this.isShowForgot} color="link"
                                                            className="px-0">Forgot password?</Button>
                                                </Col>
                                                }

                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <div className="text-center">
                                                <img src={logo} alt="Login"
                                                     title="Login" style={{ maxWidth: 128 + 'px' }}/>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Login = reduxForm({
    form: 'loginForm',
    // enableReinitialize: true
})(Login);

Login = connect(
    state => ({
        initialValues: Object.assign({})
    })
)(Login);

export default Login;