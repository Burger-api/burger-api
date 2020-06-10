import XRegExp from 'xregexp';

import db from '../db';

const Todolist = db.Schema({
  name: { type: String },
  todos: [{ type: String }],
}, { _id: false })

export const model = db.model('User', {
  first_name: { type: String, },
  lazst_name: { type: String },
  birthdate: { type: Date, },
  todolist: { type: Todolist, default: null }
});

export const username_regex = XRegExp('^[\\p{L}0-9_]{5,20}$');

export const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const password_regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;