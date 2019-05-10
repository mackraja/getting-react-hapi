/**
 * @author {[Monty Khanna]}
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormFeedback, FormText } from 'reactstrap';


const TextBox = ({ input, meta, ...custom }) => {
  const { touched, error, warning } = meta || {};
  const hasError = (touched && !!error);
  
  if (input && !input.value && custom && custom.disabled && custom.emptyValue) {
    input.value = custom.emptyValue;
  }
  
  if (custom && custom.emptyValue) {
    delete custom.emptyValue;
  }

  return (
    <React.Fragment>
      <Input
        className={ hasError ? 'is-invalid' : '' }
        {...(touched && input.value ? { valid: !error } : {})}
        { ...input }
        { ...custom }
      />
      { touched && error && <FormFeedback className="help-block">{ error }</FormFeedback> }
      { warning && <FormText>Example help text that remains unchanged.</FormText> }
    </React.Fragment>
  );
};

TextBox.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  custom: PropTypes.object
};

export default TextBox;
