const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create(params) {
  var {
    name,
    description,
    completed
  } = params
  if (!name) return false // check if name is undefined
  if (name.length < 5) return false // check name length
  params._id = uuidGenerator()
  if (!description || !completed) {
    params.description = 'my todo description'
    params.completed = false
  }
  todos.push(params)
  return todos[todos.length - 1]
}

// READ (list & show)
function list() {
  return todos
}

function show(id) {
  var results = ''
  if (!id) {
    return false
  }
  if (id) {
    todos.forEach(
      function(e) {
        if (e._id == id) {
          results = e
        }
      })
    return results ? results : false
  }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update(id, params) {
  var {
    name,
    description,
    completed
  } = params
  var state = ''
    todos.forEach(
        function(e) {
          if (e._id == id) {
            if (name || name=='') {
              if (name.length >=5) {
              e.name = name
              if (description) e.description = description
              if (completed) e.completed = completed
              state = true
              }
              if (name.length < 5){state = false}
            }
            if (!name && name!=='') {
              if (description) e.description = description
              if (completed) e.completed = completed
              state = true
              }
            }
          }
        )
        return state
      }

        // DESTROY (destroy & destroyAll)
        function destroy(id) {
          var state = false
          // function chkId(e){
          //   return e._id==id
          // }
          //
          // var index = todos.findIndex(chkId)
          // if (index>-1){todos.splice(index,1)
          //   state=true}

          if (id) {
            todos.forEach(
              function(e) {
                if (e._id == id) {
                  var index=todos.indexOf(e)
                  todos.splice(index,1)
                  state = true
                }
              })
            }
            return state
        }

        function destroyAll(){
          todos.splice(0)
          return true
        }

        module.exports = {
          create,
          list,
          show,
          update,
          destroy,
          destroyAll
        }
