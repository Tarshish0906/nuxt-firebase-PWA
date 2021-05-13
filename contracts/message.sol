// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract Message {
    string message;

    function store(string memory msg_in) public {
        message = msg_in;
    }

    function fetch() public view returns (string memory) {
        return message;
    }
}
