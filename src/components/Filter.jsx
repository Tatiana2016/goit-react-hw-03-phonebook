import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #2ecc71;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #2ecc71;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

const Filter = ({ value, onChangeFilter }) => (
  <Label>
    Filter contacts by name:
    <Input type="text" value={value} onChange={onChangeFilter} />
  </Label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
