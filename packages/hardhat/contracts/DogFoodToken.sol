pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DogFoodToken is Ownable {

  constructor() payable {
    // what should we do on deploy?
  }

  

  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
