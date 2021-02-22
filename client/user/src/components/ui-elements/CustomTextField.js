import React from 'react';
//Styles
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const CustomTextField = ({ id, label, type = "text", autoComplete, autoFocus = false, onChange, value, required = false }) => {

  return (
    <StyledTextField
      variant="outlined"
      margin="normal"
      required={required}
      fullWidth
      id={id}
      label={label}
      name={id}
      type={type}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onChange={onChange}
      value={value}
    />
  );
}

const StyledTextField = styled(TextField)`

  label {
    color: white;

    &.Mui-focused {
      color: white !important;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 1px;
    border-color: white !important;
  }
  
  input {
    color: white;
  }

  fieldset {
    border-color: white; 
  }

  .MuiOutlinedInput-root:hover {
    border-color: white; 

  }
  
  .MuiOutlinedInput-notchedOutline {
    border-color: white; 
  }
`;

export default CustomTextField;

