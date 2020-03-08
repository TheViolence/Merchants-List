import React, { Component } from 'react';
import { generateID } from '../helpers';

class FormField extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ``,
            valueBeingModified: ``,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value })
    }

    render() {
        return (
            <div className={`Form__Field ${this.props.modifierClass}`}>
                <label className="Form__FieldLabel" htmlFor={generateID(this.props.modifierClass)}>{this.props.label}</label>
                <input className="Form__FieldInput" value={this.state.value} id={generateID(this.props.modifierClass)}
                    onInput={({ target }) => this.props.onInput(target.value)} type={this.props.inputType || `text`}
                />
            </div>
        )
    };
}

export default FormField;
