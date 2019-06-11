import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import TodoListInput from '../TodoListInput/TodoListInput';
export default class TodoApplication extends Component {
  render() {
    return (
      <div>
        <NavigationBar/>
        <TodoListInput/>
      </div>
    )
  }
}
