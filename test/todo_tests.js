const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// start of other test
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var params = {

  name: 'First Todo',

  description: 'First Description',

  completed: false

}

var params2 = {

  name: 'Second Todo',

  description: 'First Description',

  completed: false

}

var params3 = {

  name: 'Only name'

}

var params4 = {

  description: 'error here'

}

var params5 = {

  name: 'four'

}

// normal case: creating new todos

var firstTodo = todos.create(params)

assert.strictEqual(todos.list().length, 1, 'List should have one after create')

// normal case: params contains 3 props

assert.strictEqual(firstTodo.hasOwnProperty('name'), true)

// normal case

// actual firstTodo._id

// expected? true

assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'every todo needs to have _id property')

// normal case

// secondTodo._id is unique

var secondTodo = todos.create(params2)

assert.notStrictEqual(secondTodo._id, firstTodo._id, '_id prop needs to be unique')

// normal case

// new todo without name in param, should have default description and completed

var onlyNameTodo = todos.create(params3)

var defaultDescription = 'my todo description'

var defaultCompleted = false

assert.strictEqual(onlyNameTodo.description, defaultDescription, 'Description should be default')

assert.strictEqual(onlyNameTodo.completed, defaultCompleted, 'Completed should be default')

// error case

// cannot create new todo without name property

var noNameTodo = todos.create(params4)

assert.strictEqual(noNameTodo, false, 'Name is required')

// error case

// cannot create new todo with short name

var shortTodo = todos.create(params5)

assert.strictEqual(shortTodo, false, 'Name is too short')

// normal case

// show todo with correct id, returns the todo object
assert.strictEqual(todos.show(firstTodo._id), firstTodo, 'Show doesn\'t return the correct todo object')

// error case

// show false if todo is not found
assert.strictEqual(todos.show('123'), false, 'Show false if todo is not found')

var newParams1 = {

  description: 'new description'

}

var newParams2 = {

  completed: true

}

var newParams3 = {

  name: 'new name'

}

var newParams4 = {

  name: 'four'

}

// normal case

// todos.update() update each params individually

todos.update(secondTodo._id, newParams1)

var updatedSecondTodo = todos.show(secondTodo._id)

assert.strictEqual(updatedSecondTodo.description, 'new description', 'Update doesn\'t update description')

todos.update(secondTodo._id, newParams2)

var updatedSecondTodo = todos.show(secondTodo._id)

assert.strictEqual(updatedSecondTodo.completed, true, 'Update doesn\'t update completed')

todos.update(secondTodo._id, newParams3)

var updatedSecondTodo = todos.show(secondTodo._id)

assert.strictEqual(updatedSecondTodo.name, 'new name', 'Update doesn\'t update name')

// error case

// update name needs to follow name property convention

todos.update(secondTodo._id, newParams4)

assert.strictEqual(todos.update(secondTodo._id, newParams4), false, 'Update should fail if name is too short')

// normal case

// destroy function should remove the object from the array

todos.destroy(firstTodo._id)

assert.strictEqual(todos.show(firstTodo._id), false, 'FirstTodo should not exist after destroying')

// error case

// destroy function should return false if object doesn't exist

assert.strictEqual(todos.destroy(123), false, 'Destroy doesn\'t return false if id is invalid')

// normal case

// destroyAll emptied the todos array

todos.destroyAll()

assert.strictEqual(todos.list().length, 0, 'Todo list should be empty after destroyAll')
// end of other test

// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var params = {
  name: 'First Todo',
  description: 'first description',
  completed: false
}

// ### CREATE
// normal case: creating new todo
todos.create(params)
assert.strictEqual(todos.list().length, 1, 'List should have 1 item after creating')

// param should have id
var firstTodo = todos.list()[0]
assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'should have an id')

// creation of name only param should have defaulted description and completed
var nameParam = {
  name: 'name only Todo'
}
todos.create(nameParam)
var secondTodo = todos.list()[1]
var defaultCompleted = false
var defaultDescription = 'my todo description'
assert.strictEqual(secondTodo.description, defaultDescription, 'Description should be default')
assert.strictEqual(secondTodo.completed, defaultCompleted, 'Completed should be default')

// error case, create a param without name
var badParam = {
  description: 'describe'
}
todos.create(badParam)
assert.strictEqual(todos.list().length, 2, 'list should not be created with no name')

// error case, create param with short name
var shortNameParam = {
  name: 'abc'
}
todos.create(shortNameParam)
assert.strictEqual(todos.list().length, 2, 'List should not be created with name <5')

// error case, create param with numbers
var numberParam = {
  name: '123'
}
todos.create(numberParam)
assert.strictEqual(todos.list().length, 2, 'List should not be created with numbers')

// normal cases not thought of - first ID should not be equal second ID
assert.notStrictEqual(firstTodo._id, secondTodo._id, 'id should not be the same')

// ###READ
// list
assert.strictEqual(todos.list().length, 2, 'unable to fetch right list')

// normal case, show id with valid
var firstTodo = todos.list()[0]
var validid = firstTodo._id
assert.strictEqual(todos.show(validid).name, 'First Todo', 'unable to fetch right list')

// error case, show id with id that doesn't exist or string
var invalidid = 'abc'
assert.strictEqual(todos.show(invalidid), false, 'nothing should be fetched')

// error case, show id when no id passed
assert.strictEqual(todos.show(), false, 'nothing should be fetched')

// edge? more than 1 id passed?

// ###UPDATE
// normal case, edit name, desc, completed
var updatedParams = {
  name: 'changedName',
  description: 'newdesc',
  completed: 'true'
}
var test = todos.update(validid, updatedParams)
assert.strictEqual(test, true, 'unable to update Name true false')
assert.strictEqual(firstTodo.name, 'changedName', 'unable to update Name')

// normal case, edit completed only
var updatedParams = {
  completed: 'false'
}
assert.strictEqual(todos.update(validid, updatedParams), true, 'unable to update')
assert.strictEqual(firstTodo.completed, 'false', 'unable to update completed')
assert.strictEqual(firstTodo.description, 'newdesc', 'description should stay')

// error case, edit to delete name or < 5 char
var updatedParams = {
  name: '',
  description: 'newdesc',
  completed: 'true'
}
var test = todos.update(validid, updatedParams)
assert.strictEqual(test, false, 'should not allow change name')

// // ###DESTROY
// normal case, delete todo with valid id
var test = todos.destroy(validid)
assert.strictEqual(test, true, 'should allow destroying id')

// error case, delete todo with invalid id
console.log(todos.list().length) // 1 left before delete
var invalidid = '123'
var test = todos.destroy(invalidid)
assert.strictEqual(test, false, 'should not allow destroying invalidid false')
assert.strictEqual(todos.list().length, 1, 'should not allow destroying invalidid length')

// normal case, destroy all
var test = todos.destroyAll()
assert.strictEqual(test, true, 'should allow destroying all')
assert.strictEqual(todos.list().length, 0, 'should allow destroying all')
