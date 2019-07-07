import React from 'react';
import {STATUS, Todo} from "./todo.js";
import Divider from "@material-ui/core/Divider";
import {ErrorNotification} from "./ErrorNotification";
import {AddTodoButton} from "./AddTodoButton";
import {EdittingCard} from "./EdittingCard";
import {DisplayingCard} from "./DisplayingCard";

const HOST_URL = window.config.hostUrl;
const editTodoEndpoint = `${HOST_URL}/edit_todo`;
const createTodoEndpoint = `${HOST_URL}/create_todo`;
const getTodoEndpoint = `${HOST_URL}/get_todo`;
const archiveTodoEndpoint = `${HOST_URL}/archive_todo`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      editTargetId: null,
      edittingText: "",
      edittingTextIsValid: false,
      creatingText: "",
      creatingTextIsValid: false,
      showErrorMessage: false
    };
  }

  componentWillMount() {
    const method = "POST";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(getTodoEndpoint, {method, headers, body: "{}"})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject();
        }
      }).then(json => {
      this.setState({
        todos: json.map(Todo.fromJsonObject)
      });
    }).catch(e => {
      this.setState({
        showErrorMessage: true
      })
    });
  }

  onClickAddTodoButton() {
    const method = "POST";
    const newTodo = Todo.make(this.state.creatingText);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(createTodoEndpoint, {method, headers, body: newTodo.toJson()})
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            todos: [...this.state.todos, newTodo],
            creatingText: "",
            creatingTextIsValid: false
          });
        } else {
          this.setState({
            showErrorMessage: true
          })
        }
      }).catch(() => {
      this.setState({
        showErrorMessage: true
      })
    });
  }

  onClickEditButton(editTarget) {
    this.setState({editTargetId: editTarget.id, edittingText: editTarget.content});
  };

  onClickEditOkButton(todo) {
    const method = "POST";
    const edittedTodo = todo.edit(this.state.edittingText);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(editTodoEndpoint, {method, headers, body: edittedTodo.toJson()})
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            todos: this.state.todos.map(todo => {
              if (todo.id === this.state.editTargetId) {
                return edittedTodo;
              }
              return todo;
            }),
            editTargetId: null,
            edittingText: "",
            edittingTextIsValid: false
          });
        } else {
          this.setState({
            showErrorMessage: true
          })
        }
      }).catch(() => {
      this.setState({
        showErrorMessage: true
      })
    });
  };

  onClickArchiveButton(archiveTodo) {
    const method = "POST";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch(archiveTodoEndpoint, {method, headers, body: JSON.stringify({archive_todo_id: archiveTodo.id})})
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            todos: this.state.todos.map(todo => {
              if (todo.id === archiveTodo.id) {
                return archiveTodo.archive;
              }
              return todo;
            })
          });
        } else {
          this.setState({
            showErrorMessage: true
          })
        }
      }).catch(() => {
      this.setState({
        showErrorMessage: true
      })
    });
  };

  onClickEditCancelButton() {
    this.setState({
      editTargetId: null,
      edittingText: "",
      edittingTextIsValid: false
    });
  };

  onChangeEdittingTodoText(e) {
    this.setState({
      edittingText: e.target.value,
      edittingTextIsValid: e.target.value.length > 0
    })
  };

  onChangeCreatingTodoText(e) {
    this.setState({
      creatingText: e.target.value,
      creatingTextIsValid: e.target.value.length > 0
    })
  };

  closeNotification() {
    this.setState({
      showErrorMessage: false
    })
  }

  render() {
    const cards = this.state.todos
      .filter(todo => todo.status === STATUS.ACTIVE)
      .map(todo =>
        todo.id === this.state.editTargetId ?
          <EdittingCard key={todo.id}
                        todo={todo}
                        edittingText={this.state.edittingText}
                        edittingTextIsValid={this.state.edittingTextIsValid}
                        onClickEditOkButton={this.onClickEditOkButton.bind(this)}
                        onClickEditCancelButton={this.onClickEditCancelButton.bind(this)}
                        onClickEditButton={this.onClickEditButton.bind(this)}
                        onChangeEdittingTodoText={this.onChangeEdittingTodoText.bind(this)}/> :
          <DisplayingCard key={todo.id}
                          todo={todo}
                          creatingTextIsValid={this.state.creatingTextIsValid}
                          onClickArchiveButton={this.onClickArchiveButton.bind(this)}
                          onClickEditButton={this.onClickEditButton.bind(this)}/>);
    return (
      <div>
        <ErrorNotification showErrorMessage={this.state.showErrorMessage}
                           closeNotification={this.closeNotification.bind(this)}/>
        <AddTodoButton onClickAddTodoButton={this.onClickAddTodoButton.bind(this)}
                       creatingText={this.state.creatingText}
                       creatingTextIsValid={this.state.creatingTextIsValid}
                       onChangeCreatingTodoText={this.onChangeCreatingTodoText.bind(this)}/>
        <Divider variant="middle"/>
        <br/>
        {cards}
      </div>
    );
  }
}

export default App;

