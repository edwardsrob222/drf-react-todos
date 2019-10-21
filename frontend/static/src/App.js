import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    axios.get('/api/v1/todos')
    .then(res => {
      // console.log(res);
      this.setState({todos: res.data});
    })
    .catch(error => {
      console.log(error);
    });
  }

  addTodo(e){
    e.preventDefault();
    axios.post('/api/v1/todos/new/', {
      text: 'Serve Dinner',
      due_date: '2020-11-21'
    })
    .then(res =>{
      console.log('new object', res);
      let todos = [...this.state.todos];
      todos.push(res.data);
      this.setState({todos});
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {

    let todos = this.state.todos.map(todo => (
      <li key={todo.id}>
        <p>{todo.text}</p>
        <time>{todo.due_date}</time>
      </li>
    ))

    return (
      <React.Fragment>
      <form onSubmit={this.addTodo}>
        <input type='text'/>
        <button>Submit</button>
      </form>
      <ul>{todos}</ul>
      </React.Fragment>
    )
  }
}

export default App;
