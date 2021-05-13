const message = artifacts.require("message");

module.exports = function(deployer) {
  deployer.deploy(message);
};
