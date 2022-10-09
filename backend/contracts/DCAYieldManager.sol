//SPDX-License-Identifier: Unlicense
//https://github.com/superfluid-finance/super-examples/tree/main/examples/money-streaming-intro

pragma solidity ^0.8.14;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperfluidToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

error Unauthorized();

contract DCAYieldManager {
    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1;


    constructor(ISuperfluid host) {
        assert(address(host) != address(0));

        // Initialize CFA Library
        cfaV1 = CFAv1Library.InitData(
            host,
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                    )
                )
            )
        );
    }

    function sendSuperTokensToCont(ISuperToken token, uint256 amount) external {
        token.transferFrom(msg.sender, address(this), amount);
    }


    function createFlowInContract(ISuperfluidToken token, int96 flowRate) external {
        cfaV1.createFlowByOperator(msg.sender, address(this), token, flowRate);
    }


    function updateFlowInContract(ISuperfluidToken token, int96 flowRate) external {
        cfaV1.updateFlowByOperator(msg.sender, address(this), token, flowRate);
    }

    function deleteFlowIntoContract(ISuperfluidToken token) external {
        cfaV1.deleteFlow(msg.sender, address(this), token);
    }

    
    function withdrawAssetsFromContract(ISuperToken token, uint256 amount) external {
        token.transfer(msg.sender, amount);
    }

    
    function createFlowFromContract(
        ISuperfluidToken token,
        address receiver,
        int96 flowRate
    ) external {
        cfaV1.createFlow(receiver, token, flowRate);
    }

   
    function updateFlowFromContract(
        ISuperfluidToken token,
        address receiver,
        int96 flowRate
    ) external {
        cfaV1.updateFlow(receiver, token, flowRate);
    }

    
    function deleteFlowFromContract(ISuperfluidToken token, address receiver) external {
        cfaV1.deleteFlow(address(this), receiver, token);
    }
}