import React from "react";

class CustomRadio extends React.Component {
  render() {
    const { number, label, value, name, onChange, ...rest } = this.props;

    return (
      <div className="radio">
        <input id={number} name={name} type="radio" value={value} onChange={onChange} {...rest} />
        <label htmlFor={number}>{label}</label>
      </div>
    );
  }
}

export default CustomRadio;
