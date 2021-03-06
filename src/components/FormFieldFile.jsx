import React, { Component } from 'react'
import { generateID } from '../helpers';

export default class FormFieldFile extends Component {
    constructor(props) {
        super(props);

        this.statuses = {
            NO_FILE: `Select or drop a file`,
            FILE_OVER: `Drop here`,
        };

        this.state = {
            isFileDraggingOn: false,
            fileStatus: this.statuses.NO_FILE,
            value: this.props.value,
        };

        this.processFile = this.processFile.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.value) {
            this.props.editedMerchant !== prevProps.editedMerchant && this.setState({
                value: false,
                fileStatus: this.statuses.NO_FILE,
            });
        } else {
            prevProps.value !== this.props.value && this.setState({ value: this.props.value });
        }
    }

    processFile({ target: { files: [file] } }) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.setState({
            fileStatus: file.name,
            isFileDraggingOn: false,
        });
        reader.onload = () => {
            this.setState({
                value: reader.result,
            });
            this.props.onInput(reader.result)
        };
    }

    render() {
        return (
            <div
                className={
                    `Form__Field ${this.props.modifierClass} ${this.state.isFileDraggingOn ? `--IsFileDraggingOn` : ``}`
                }
                data-label={
                    this.state.fileStatus
                }
            >
                <label
                    className="Form__FieldLabel"
                    htmlFor={
                        generateID(this.props.modifierClass)
                    }
                >
                    {
                        this.props.label
                    }
                </label>
                {
                    this.state.value && (
                        <img src={this.state.value} className="Form__FieldImage" alt=""/>
                    )
                }
                <input
                    className="Form__FieldFileInput"
                    id={
                        generateID(this.props.modifierClass)
                    }
                    onInput={
                        this.processFile
                    }
                    onDragOver={
                        () => this.setState({
                            isFileDraggingOn: true,
                            fileStatus: this.statuses.FILE_OVER,
                        })
                    }
                    onDragEnd={
                        () => this.setState({
                            isFileDraggingOn: false,
                            fileStatus: this.statuses.NO_FILE,
                        })
                    }
                    accept="image/png, image/jpeg"
                    type="file"
                />
            </div>
        )
    }
};
