import XRegExp from 'xregexp';

import db from '../db';

const Content = db.Schema({
  name: { type: String },
  amount: { type: Number },
}, { _id: false })

const Todolist = db.Schema({
  name: { type: String },
  todos: [{ type: Content }],
  last_add_time: { type: Date },
  creation_time: { type: Date, default: Date.now() }
}, { _id: false })

export const model = db.model('User', {
  first_name: { type: String, },
  last_name: { type: String },
  email: { type: String },
  birthdate: { type: Date, },
  password: { type: String },
  todolist: { type: Todolist, default: null }
});
