const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if (error) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('590b4ff95b8a2275ab059fb3')
  }, {
    $set: {
      name: 'Roman'
    },
    $inc: {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
