
import React from "react";
import { FormGroup, ControlLabel, FormControl} from "react-bootstrap";

export class FormInput extends React.Component {
  render() {
    return (
          <FormGroup style={{width: this.props.width, marginLeft: this.props.marginLeft}}>
            <ControlLabel>{this.props.label} </ControlLabel>
            <FormControl
              type={this.props.type}
              bsClass={this.props.bsClass}
              placeholder={this.props.placeholder}
              defaultValue={this.props.value} 
              style={this.props.style}
              disabled={this.props.disabled}
              componentClass={this.props.componentClass}
              rows={this.props.rows}
              onChange={this.props.onChange}/>
          </FormGroup>
    )
  }
}

export default FormInput;
