/**
 * @author {[Monty Khanna]}
 */
import React, { Fragment } from 'react';
import { Input, FormFeedback, FormText } from 'reactstrap';

export const renderText = ({ input, meta: { touched, error, warning }, ...custom }) => (
    <Fragment>
        <Input {...(error ? { invalid: true } : {} ) } {...(touched ? { valid: !error } : {})} {...input} {...custom} />
        {error && <FormFeedback className="help-block">{error}</FormFeedback>}
        {!error && warning && <FormText>{warning}</FormText>}
    </Fragment>
);

export const renderRadio = ({ value, input, ...custom }) => (
    <Input type="radio" checked={value === input.value} {...input} {...custom} />
);

export const renderCheckbox = ({ input: { value, onChange } }) => (
    <Input type="checkbox" checked={!!value} onChange={onChange} />
);

export const renderSelect = ({ input, meta: { touched, error }, children, ...custom }) => (
    <Input type="select" {...(touched ? { valid: !error } : {})} {...input} {...custom}>
        {children}
    </Input>
);
