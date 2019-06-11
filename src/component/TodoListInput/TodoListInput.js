import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';


export default class TodoListInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            newArray : []
        };
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }
    // componentDidUpdate() {
    //     console.log("Upfdate " , this.state.newArray);
    // }

    componentDidUpdate() {
        fetch("https://nodedatastore.herokuapp.com/syedumerhasan")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
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
     
    render() {
      console.log(this.state.inputValue)
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
                            <ListGroup>
                            {
                                this.state.newArray.map(function(item, key) {
                                return (
                                    <ListGroup.Item contentEditable={true} onChange={function(e){
                                        console.log("I am chnaging");
                                    }} key={key}>{item}</ListGroup.Item>
                                    )     
                                })
                            }
                            
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                    
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </div>
        );
    }
}

