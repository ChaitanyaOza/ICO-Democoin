// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

abstract contract ERC20Interface {
    function totalSupply() public virtual view returns (uint);
    function balanceOf(address tokenOwner) public virtual view returns (uint balance);
    function allowance(address tokenOwner, address spender) public virtual view returns (uint remaining);
    function transfer(address to, uint tokens) public virtual returns (bool success);
    function approve(address spender, uint tokens) public virtual returns (bool success);
    function transferFrom(address from, address to, uint tokens) public virtual returns (bool success);
 
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

library SafeMath {
 
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
 
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
 
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
 
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


contract ICO is ERC20Interface{
    using SafeMath for uint;
    string public name;
    string public symbol;
    uint public decimals;
    uint public bonusEnds;
    uint public icoEnds;
    uint public icoStarts;
    uint public allContributers;
    uint allTokens;
    address admin;
    mapping (address => uint) public balances;
    mapping(address => mapping(address => uint)) allowed;

    function ICO_Constructor() public {
        name = "Demo Coin";
        decimals = 18;
        symbol = "DC";
        bonusEnds = block.timestamp + 2 weeks;
        icoEnds = block.timestamp + 4 weeks;
        icoStarts = block.timestamp;
        allTokens = 1000000000000000000 * 100;
        admin = (msg.sender);
        balances[msg.sender] = allTokens;
    }

    function buyTokens() public payable {
        uint tokens;
        if (block.timestamp <= bonusEnds) {
            tokens = msg.value.mul(125);
        }else {
            tokens = msg.value.mul(100);
        }

        tokens = msg.value.mul(100);
        balances[msg.sender] = balances[msg.sender].add(tokens);
        allTokens = allTokens.add(tokens);
        emit Transfer(address(0), msg.sender, tokens);
        allContributers++;
    }

    function totalSupply() public virtual override view returns (uint) {
        return allTokens;
    }

    function balanceOf(address tokenOwner) public override view returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public override returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    function approve(address spender, uint tokens) public override returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public override returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }
 
    function allowance(address tokenOwner, address spender) public virtual override view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function myBalance() public virtual view returns (uint) {
        return (balances[msg.sender]);
    }

    function myAddress() public virtual view returns (address) {
        address myAdr = msg.sender;
        return myAdr;
    }

    function endSale() public {
        require(msg.sender == admin);
        payable(admin).transfer(address(this).balance);
    }

}