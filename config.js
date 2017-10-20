var config = (function() {
    var clientID = "113409873799.204747421377";
    var clientSecret = "e909c582ab13cdbaa6336a1c70af4cc1";
    var sessionSecret = { secret: "secret!!!" };
    var mongoUser = 'admin';
    var mongoPass = 'pass';
  
    return {
      getClientID: function() {
        return clientID;
      },
      getClientSecret: function() {
        return clientSecret;
      },
      getSessionSecret: function() {
        return sessionSecret;
      },
      getMongoUser: function() {
        return mongoUser;
      },
      getMongoPass: function() {
        return mongoPass;
      }
    };
  })();
  
  module.exports = config;
  