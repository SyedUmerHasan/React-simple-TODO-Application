import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Card from 'react-bootstrap/Card'
// import InputGroup from 'react-bootstrap/InputGroup'
// import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalDialog from 'react-bootstrap/ModalDialog'
import Modal from 'react-bootstrap/Modal'
import TodoItem from '../TodoItem/TodoItem';

export default class TodoListInput extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            inputValue: '',
            newArray: [],
            show: [],
        };
    }

    componentDidMount() {
        fetch("https://nodedatastore.herokuapp.com/syedumerhasan")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    newArray: result.newArray
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        )
    }

    handleClick = (evt) => {
        if (this.state.inputValue.replace(/\s+/g, '') == '')
        {
            return;
        }
        this.state.newArray = [...this.state.newArray, this.state.inputValue];
        this.setState({
            inputValue: '',
            newArray: this.state.newArray
        });

        fetch('https://nodedatastore.herokuapp.com/syedumerhasan', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "newArray": this.state.newArray
            })
        });
        alert(this.state.newArray);
        evt.preventDefault();
    }
    updatedata = (inputValue, datakey) => {
        console.log("inputValue :  ", inputValue)
        console.log("datakey    :  ", datakey)

        this.state.newArray[datakey] = inputValue;
        this.setState({
            newArray: this.state.newArray
        })
        fetch('https://nodedatastore.herokuapp.com/syedumerhasan', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "newArray": this.state.newArray
            })
        });
    }
    deletedata = (key) => {
        // this.state.newArray[key];

       let arr = [];
         this.state.newArray.map((v,i)=> {
if (key !== i) {
    arr.push(v)
}
         })
        this.setState({
            newArray: arr
        })

        console.log('====================================');
        console.log(this.state.newArray);
        console.log('====================================');
        

    }
     
    render() {
        return (
            <div>
                <div style={{ width: '80%', margin: 'auto', marginTop: '50px', }}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter To-Do List" value={this.state.inputValue} onChange={(e)=> this.setState({inputValue : e.target.value})}/>
                    </Form.Group>
                    <Button variant="primary" type="button"  style={{marginLeft: '45%'}}  onClick={this.handleClick}>
                        Submit
                    </Button>
                </div>
                <Card className="text-center"  border="primary" style={{ width: '80%', margin: 'auto', marginTop: '50px', }}>
                    <Card.Header>
                        <h2>TO-DO Application using React</h2>
                    </Card.Header>

                    <Card.Body>
                        <Card.Title>
                            Add your To-Do List
                        </Card.Title>
                        <Card.Text>
                            Now you can add To-DO List using this Web Application.  
                            {
                                this.state.newArray.map((item, key) =>{
                                    return (
                                        <TodoItem value={item} datakey={key} updatedata={this.updatedata} deletedata={this.deletedata} />
                                    );
                                })
                            }
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </div>
        );
    }


}

