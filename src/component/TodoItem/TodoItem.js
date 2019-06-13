import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { InputGroup, FormControl } from 'react-bootstrap';

export default class TodoItem extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            inputValue : this.props.value,
            keyValue : this.props.datakey
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    onchangvalueupdate = (e) =>{
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        return (
            <div style={{clear : "both" , display : "block"}}>
                <hr/>
                <div dataid={this.props.datakey} style={{clear : "both" , display : "block"}}>
                    <span style={{float : "left"}}>                
                        {this.props.value}
                    </span>
                    <span style={{float : "right"}}>
                        < Button variant = "danger"
                        onClick = {
                            () => {
                                this.props.deletedata(this.props.datakey)
                            }
                        } >
                        Delete
                        </Button>
                    </span>
                    <span style={{float : "right"}}>
                        <Button variant="primary" onClick={this.handleShow}>
                        Edit
                        </Button>
                    </span>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>                
                    <Modal.Header closeButton>
                        <Modal.Title>Edit TO-DO Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                    Woohoo, now you can chaneg your To-Do List!
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                
                                <FormControl placeholder="Enter Data"
                                aria-describedby="basic-addon1"
                                datakey={this.props.datakey}
                                onChange={this.onchangvalueupdate}
                                value={this.state.inputValue}
                                />
                            </InputGroup>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={() => {this.props.updatedata(this.state.inputValue,this.state.keyValue);  this.handleClose()} }>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
      }
}
