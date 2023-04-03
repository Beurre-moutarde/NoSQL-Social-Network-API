const { connect, connection } = require('mongoose');

connect('mongodb://localhost/developersNoSQLApplications', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;