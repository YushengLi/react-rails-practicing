import React       from 'react';
import TodoStore   from '../stores/TodoStore';
import Header      from './Header.react';
import MainSection from './MainSection.react';
import Footer      from './Footer.react';

function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

const App = React.createClass({
  getInitialState() {
    return getTodoState();
  },

  ComponentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmoint() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <div>
        <h1>東西有出來，痛哭流涕 Q_Q</h1>
        {/*
          <Header />
          <MainSection
            allTodos={this.state.allTodos}
            areAllComplete={this.state.areAllComplete}
          />
          <Footer allTodos={this.state.allTodos} />
        */}
      </div>
    )
  },

  // 用 _method_name 在 Javascript 中模擬 Private Method
  _onChange() {
    this.setState(getTodoState());
  }
});

export default App;
