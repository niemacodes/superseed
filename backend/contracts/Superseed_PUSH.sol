pragma solidity ^0.6.2;
 
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/ERC20.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(address _channel, address _recipient, bytes calldata _identity) external;
}

contract Push is ERC20 {
    address public EPNS_COMM_ADDRESS = 0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC;

    constructor ()
        ERC20("Push Token", "PUSH")
        public {
        _mint(msg.sender, 1000 * 10 ** uint(decimals()));
    }

    function transfer(address to, uint amount) override public returns (bool success) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        
        IPUSHCommInterface(EPNS_COMM_ADDRESS).sendNotification(
            0xfA4B23aCc814e7946C61bE3348E2107408D0BF05, 
            to, 
            bytes(
                string(
                    abi.encodePacked(
                        "0", 
                        "+", // segregator
                        "3", 
                        "+", // segregator
                        "Tranfer Alert", // this is notificaiton title
                        "+", // segregator
                        "Hooray! ", //  body
                        addressToString(msg.sender), //  body
                        " sent ", //  body
                        uint2str(amount.div(10 ** uint(decimals()))), //  body
                        " PUSH to you!" 
                    )
                )
            )
        );

        return true;
    }

    function addressToString(address _address) internal pure returns(string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = '0';
        _string[1] = 'x';
        for(uint i = 0; i < 20; i++) {
            _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }
    interface ICoWSwapSettlement {
 
   function vaultRelayer() external view returns 0xfA4B23aCc814e7946C61bE3348E2107408D0BF05;
} 
}
