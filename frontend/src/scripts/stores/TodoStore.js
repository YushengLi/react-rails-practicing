var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter  = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');

var CHANGE_EVENT = 'change';

// 資料本體
var _todos = {};

// 操作資料本體的函式
function create(text) {
  var id = randomID();

  _todos[id] = {
    id: id,
    text: text,
    complete: false
  }
}

function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
}

// 對 View (Component) 公開的函示var TodoStore = assign({}, EventEmitter.prototype, {
var TodoStore = assign({}, EventEmitter.prototype, {
  // addChangeListener
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  // removeChangeListener
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // emitChange
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  // 拿資料的函式
  getAll: function() {
    return _todos;
  },

  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  }
});


// 巨大的 Switch / Case
AppDispatcher.register(function(action) {
  switch (action.actionType) {
    case TodoConstants.ADD_TODO:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.UPDATE_TODO_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;
  }
});

// var _randomID = function() {}; 此種宣告法讓 #58 行上方不得呼叫 _randomID() (匿名函式)

// 這種宣告法，會將 function 提到檔案的最上方，讓 #60 上方得以呼叫 _randomID()
function _randomID() {
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

module.exports = TodoStore; // 外界只 Call 得到 TodoStore 的東西
