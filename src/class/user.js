import * as faker from 'faker'

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export class User {

  static registration_age_limit = 13

  constructor(user) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.birthdate = user.birthdate
    this.email = user.email
  }

  static generate_mock() {
    const first_name = faker.name.firstName()
    const last_name = faker.name.lastName()
  }

  static isValid(user) {
    if (!user) return false

    const { first_name, last_name, email, birthdate, password } = user || {}
    if (!first_name) return false
    if (!last_name) return false
    if (!email) return false
    if (!birthdate) return false
    if (!password) return false

    const today = new Date()

    const birthdate_date = new Date(birthdate)
    if (isNaN(birthdate_date.getTime())) return false

    if (password.length < 8 || password.length > 40) return false

    if (!email_regex.test(email)) return false

    const range = today.getFullYear() - birthdate_date.getFullYear()
    if (range < User.registration_age_limit) return false

    return true
  }
}