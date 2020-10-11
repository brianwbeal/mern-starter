import React, { Component } from 'react';
import axios from 'axios';

// context
import { Provider } from './Context'

// components
import { AddItem } from './Components/AddItem'
import { ItemList } from './Components/ItemList'

import './App.css';

class App extends Component {

  state = {
    items: [],
    newItemName: '',
    isLoading: true
  }

  changeHandler = (e) => {
    this.setState({
      newItemName: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/items', { name: this.state.newItemName })
      .then(() => {
        this.setState({
          newItemName: ''
        })
      })
  }

  deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/items')
      .then((response) => {
        this.setState({
          items: response.data,
          isLoading: false
        })
      })
  }

  componentDidUpdate() {
    axios.get('http://localhost:5000/api/items')
      .then((response) => {
        this.setState({
          items: response.data,
          isLoading: false
        })
      })
  }

  render() {
    return (
      <Provider value={{
        items: this.state.items,
        value: this.state.newItemName,
        actions: {
          deleteItem: this.deleteHandler,
          changeInput: this.changeHandler,
          submitItem: this.submitHandler
        }
      }}>
        <div className="app">
 
          <h1>MERN Starter</h1>

          <AddItem />

          {
            this.state.isLoading
            ? <p className="loadP">Loading...</p>
            : <ItemList />
          }

        </div>
      </Provider>
    );
  }
}

export default App;
