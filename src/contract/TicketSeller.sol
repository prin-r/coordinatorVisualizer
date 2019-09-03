pragma solidity 0.5.10;

interface QueryInterface {
  enum QueryStatus { INVALID, OK, NOT_AVAILABLE, DISAGREEMENT }

  function query(bytes calldata input)
    external payable returns (bytes32 output, uint256 updatedAt, QueryStatus status);

  function queryPrice() external view returns (uint256);
}

contract TicketSeller {

  uint256 public constant ticketPrice = 100; // 100 บาท
  QueryInterface[] public oracles;

  mapping (address => uint256) public numTickets;

  constructor(address[] memory _oracles) public {
      for (uint256 i = 0; i < _oracles.length; i++) {
        oracles.push(QueryInterface(_oracles[i]));
      }
  }

  function buyTicket() public payable {
    require(msg.value * getETHTHBRate() / 1e36 >= ticketPrice, "INSUFFICIENT_ETHER");
    numTickets[msg.sender] += 1;
  }

  function sendTicket(address receiver) public {
    require(numTickets[msg.sender] > 0);
    numTickets[msg.sender] -= 1;
    numTickets[receiver] += 1;
  }

  function getETHTHBRate() internal returns (uint256 rate) {
    QueryInterface.QueryStatus status;
    bytes32 eth_usd;
    bytes32 thb_usd;
    (eth_usd,, status) = oracles[0].query.value(oracles[0].queryPrice())("ETH/USD");
    require(status == QueryInterface.QueryStatus.OK);
    (thb_usd,, status) = oracles[1].query.value(oracles[1].queryPrice())("THB/USD");
    require(status == QueryInterface.QueryStatus.OK);

    uint256 eth_thb = (uint256(eth_usd)*1e18)/uint256(thb_usd);

    return eth_thb;
  }
}