/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  getTodos() {
    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return todos;

    // return this.props.allTodos.map(function(todo) {
    //   console.log(todo);
    // })
  },

  render() {
    return (
      <div>
        <section id="main">
          <input
            id="toggle-all"
            type="checkbox"
            onChange={this._onToggleCompleteAll}
            checked={this.props.areAllComplete ? 'checked' : ''}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul id="todo-list">{this.getTodos()}</ul>
        </section>
      </div>
    )
  },

  /**
   * @return {object}
   */

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;
