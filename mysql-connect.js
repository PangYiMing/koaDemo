var mysql = require('mysql');

var con = mysql.createConnection({
  user: 'root',
  password: 'P123qc..',
  database: 'test',
  authSwitchHandler: function({ pluginName, pluginData }, cb) {
    if (pluginName === 'ssh-key-auth') {
      getPrivateKey(key => {
        const response = encrypt(key, pluginData);
        // continue handshake by sending response data
        // respond with error to propagate error to connect/changeUser handlers
        cb(null, response);
      });
    } else {
      const err = new Error(
        `Unknown AuthSwitchRequest plugin name ${pluginName}`
      );
      err.fatal = true;
      cb(err);
    }
  }
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});
