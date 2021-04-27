import { Form } from 'react-bootstrap';

import React from 'react';

export const AdFormInputGroup = ({
  title,
  required,
  pattern,
  placeholder,
  defaultValue,
  invalidFeedback,
  handleOnChange,
}) => {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1);
  };

  const toHumanReadableTitle = (name) => {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(' ');
  };

  return (
    <Form.Group controlId={title} className={required ? 'required' : ''}>
      <Form.Label>{toHumanReadableTitle(title)}</Form.Label>
      <Form.Control
        required={required}
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e, title)}
        defaultValue={defaultValue}
        pattern={pattern}
      />
      {invalidFeedback ? (
        <Form.Control.Feedback type="invalid">
          {invalidFeedback}
        </Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};
