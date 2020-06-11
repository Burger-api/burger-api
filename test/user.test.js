const assert = require('assert')
import * as lodash from 'lodash'
import { User as User } from '../src/class/user'

const user = {
  first_name: 'Jean',
  last_name: 'Brick',
  birthdate: '1987-05-10',
  password: '12345678',
  email: 'jo.cas@gmail.com'
}

describe("IsValid()", () => {
  it("should return true if all parameters match preset", () => {
    assert.equal(true, User.isValid(user))
  })

  it("should return false if any parameters is null", () => {
    const without_first_name_test = lodash.clone(user)
    without_first_name_test.first_name = null

    assert.equal(false, User.isValid(without_first_name_test))

    const without_last_name_test = lodash.clone(user)
    without_last_name_test.last_name = null

    assert.equal(false, User.isValid(without_last_name_test))

    const without_birthdate_test = lodash.clone(user)
    without_birthdate_test.birthdate = null

    assert.equal(false, User.isValid(without_birthdate_test))

    const without_email_test = lodash.clone(user)
    without_email_test.email = null

    assert.equal(false, User.isValid(without_email_test))

    const without_password_test = lodash.clone(user)
    without_password_test.password = null

    assert.equal(false, User.isValid(without_password_test))
  })

  it("should return false if user is null", () => {
    const user = null

    assert.equal(false, User.isValid(user))
  })

  it("should return false if password length isn't between 8 and 40", () => {
    const under_8_length_password_test = lodash.clone(user)
    under_8_length_password_test.password = '1234567'

    assert.equal(false, User.isValid(under_8_length_password_test))
  })

  it("should return false if date is not a date", () => {
    const wrong_password_test = lodash.clone(user)
    wrong_password_test.birthdate = 'dog'

    assert.equal(false, User.isValid(wrong_password_test))
  })

  it("should return false if user age is under 13", () => {
    const wrong_birthdate_test = lodash.clone(user)
    wrong_birthdate_test.birthdate = '2010-05-10'

    assert.equal(false, User.isValid(wrong_birthdate_test))
  })

  it("should return false if user email is messed up", () => {
    const messed_up_email_test = lodash.clone(user)
    messed_up_email_test.email = 'jo'

    assert.equal(false, User.isValid(messed_up_email_test))

  })
})