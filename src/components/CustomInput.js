import { InputText } from 'primereact/inputtext';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function CustomInput({ onChange, defaultValue, value, name }) {
    useEffect(() => {
        console.log(defaultValue,value,name)
        onChange({ target: { value: defaultValue } }, name);
    },[]);

    return <InputText id={name} value={value} onChange={onChange} />;
}

CustomInput.propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CustomInput;