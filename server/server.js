require('./config/config.js');

const _ = require('lodash');
let express = require('express');
let bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
const authenticate = require('./middleware/authenticate');

let app = express();
let port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(201).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('');
  }

  Todo.findById(id).then((todo) => {
    if (todo) {
      return res.send({todo});
    }
    return res.status(404).send('');

  }, (err) => {
    res.status(400).send('');
  })
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo) {
      return res.send({todo});
    }
    return res.status(404).send('');

  }, (err) => {
    res.status(400).send('');
  })
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  });
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

   user.save().then((user) => {
       return user.generateAuthToken();
  }).then((token) => {
       "use strict";
       res.header('x-auth', token).status(201).send(user);
   }).catch((err) => {
    res.status(400).send(err);
  })
});

app.get('/users/me', authenticate, (req, res) => {
    "use strict";
    req.send(req.user);
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
