// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SingleNumRegister {
    uint256 storedData;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256 retVal) {
        return storedData;
    }
}
