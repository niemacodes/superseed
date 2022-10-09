pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { ISuperToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import { ILendingPool,ILendingPoolAddressesProvider } from "./Interfaces.sol";
import { SafeMath } from "./Libraries.sol";

contract YieldFlow{
    event downgrade(address token, address superToken, uint256 amountToWrap);
    event upgrade(address token, address superToken, uint256 amountToWrap);

    address private _owner;
    mapping(address => uint) public amountsDeposited;

    // Retrieve LendingPool address
    ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(address(0x178113104fEcbcD7fF8669a0150721e231F0FD4B)); // testnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
    address lendingPoolAddress = /*0xDF9e4ABdbd94107932265319479643D3B05809dc;//*/provider.getLendingPool();
    ILendingPool lendingPool = ILendingPool(lendingPoolAddress);
    
    function getTokenBalance(address token, address account)
    public
    view
    returns(uint){
        return ERC20(token).balanceOf(account);
    }
    

    function downgradeSuperToken(address token, address superToken, uint256 amountToUnWrap) 
    public
    {
        address underlyingTokenAddress = ISuperToken(superToken).getUnderlyingToken();
        ERC20(underlyingTokenAddress).approve(superToken, amountToUnWrap);
        // unwrapping
        ISuperToken(superToken).downgrade(amountToUnWrap);
        emit downgrade(token, superToken, amountToUnWrap);
    }

    function upgradeSuperToken(address token, address superToken, uint256 amountToWrap) 
    public
    {
        address underlyingTokenAddress = ISuperToken(superToken).getUnderlyingToken();
        ERC20(underlyingTokenAddress).approve(address(this), amountToWrap);
        ERC20(underlyingTokenAddress).approve(superToken, amountToWrap);
        ISuperToken(superToken).upgrade(amountToWrap);
        emit upgrade(token, superToken, amountToWrap);
    }

    function deposit(
        address asset, 
        uint256 amount, 
        address msgSender, 
        address onBehalfOf, 
        uint16 referralCode
        )
    internal 
    {
        ERC20 token = ERC20(address(asset));
        uint allowance = token.allowance(msgSender, lendingPoolAddress);
        if (allowance==0){
            token.approve(lendingPoolAddress, 115792089237316195423570985008687907853269984665640564039457584007913129639935);
        }
        lendingPool.deposit(asset, amount, onBehalfOf, referralCode);
    }

    
    function withdrawFromAave(address asset, uint256 amount, address to) 
    internal 
    {
        IERC20 token = IERC20(address(asset));
        uint allowance = token.allowance(msg.sender, lendingPoolAddress);
        if (allowance==0){
            token.approve(lendingPoolAddress, 115792089237316195423570985008687907853269984665640564039457584007913129639935);
        }
        lendingPool.withdraw(asset, amount, to);
    }

    function depositToAave(
        address asset,
        uint256 amount
    )
    public
    {
        deposit(asset, amount, address(this), address(this),0);
    }

    function getAaveUserAccountData(address user)
    public
    view
    returns (
        uint256 totalCollateralETH,
        uint256 totalDebtETH,
        uint256 availableBorrowsETH,
        uint256 currentLiquidationThreshold,
        uint256 ltv,
        uint256 healthFactor
    )
    {
        return lendingPool.getUserAccountData(user);
    }

    



}