/**
 * @author {[Monty Khanna]}
 */
const isEmpty = value => value === undefined || value === null || value === '';
const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const join = rules => (value, data) => rules
  .map(rule => rule(value, data))
  .filter(error => !!error)[0];

export function email (value) {
  if (!isEmpty(value) && !emailReg.test(value)) {
    return 'Must be an email';
  }
}

export function required (value) {
  if (isEmpty(value) || /^\s+$/.test(value)) {
    return 'Required';
  }
}

export const optional = () => {};

export function minLength (min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength (max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function minValue (min) {
  return (value) => {
    if (!isEmpty(value) && value < min) {
      return `Must be ${min} or greater`;
    }
  };
}

export function maxValue (max) {
  return (value) => {
    if (!isEmpty(value) && value > max) {
      return `Must be no more than ${max}`;
    }
  };
}

export function integer (value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function float (value) {
  if (isNaN(parseFloat(value))) {
    return 'Must be a float value';
  }
}

export function oneOf (enumeration) {
  return (value) => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match (field, type = '') {
  return (value, data) => {
    if (!type && data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    } else if (type === 'RegExp') {
      return !field.test(value) && 'Invalid entry';
    }
  };
}

export function createValidator (rules) {
  return (data = {}) => {
    const errors = {};
    
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    
    return errors;
  };
}

export function fieldArray (rules) {
  return (value, data) => {
    if (!value) {
      return;
    }
    
    const membersArrayErrors = [];
    value.forEach((o, idx) => {
      if (o) {
        Object.keys(rules).forEach((key) => {
          const rule = join([].concat(rules[key]));
          const error = rule(o[key], data);
          if (error) {
            if (!membersArrayErrors[idx]) {
              membersArrayErrors[idx] = {};
            }
            membersArrayErrors[idx][key] = error;
          }
        });
      }
    });
    
    return membersArrayErrors;
  };
}

export function multipleEmails (value) {
  const values = value.replace(/\s/g, '').split(/,|;/);
  const emails = values.forEach( function (v) {
    if (!emailReg.test(v)) {
      return false;
    }
  });

  const valid = emails.findIndex(e => e === false);
  if (valid !== -1) {
    return 'Must be an Valid email';
  }
}
