// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Message {
    string message;

    function set(string memory msg_in) public {
        message = msg_in;
    }

    function get() public view returns (string memory) {
        return message;
    }
}
