const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("ethers")
require("dotenv").config()
const DCAYieldManagerABI = [{"inputs":[{"internalType":"contract ISuperfluid","name":"host","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"cfaV1","outputs":[{"internalType":"contract ISuperfluid","name":"host","type":"address"},{"internalType":"contract IConstantFlowAgreementV1","name":"cfa","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"int96","name":"flowRate","type":"int96"}],"name":"createFlowFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"},{"internalType":"int96","name":"flowRate","type":"int96"}],"name":"createFlowInContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"},{"internalType":"address","name":"receiver","type":"address"}],"name":"deleteFlowFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"}],"name":"deleteFlowIntoContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sendSuperTokensToCont","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"int96","name":"flowRate","type":"int96"}],"name":"updateFlowFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperfluidToken","name":"token","type":"address"},{"internalType":"int96","name":"flowRate","type":"int96"}],"name":"updateFlowInContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ISuperToken","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawAssetsFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    
    const dcaYieldManagerAddress = "0x8D62B415f0a15306865A4fDabFeb5107E52Ee59D"

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.RPC_URL
    )

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    const signer = sf.createSigner({
        privateKey:
          process.env.PRIVATE_KEY,
        provider: provider
      });
    

    const dcaYieldManager = new ethers.Contract(
        dcaYieldManagerAddress,
        DCAYieldManagerABI,
        provider
    )

    const daix = await sf.loadSuperToken("DAIx")
    amount = ethers.utils.parseEther("1000")
    //get the current gas price
    gasPrice = (await provider.getGasPrice()).toString()
    
    console.log("attempting to approve smart contract")
    await approveSmartContract(dcaYieldManager, signer, daix, gasPrice, amount.toString());
    
    await sendMoneytoContract(dcaYieldManager, signer, provider, "0.01", daix);
}

async function approveSmartContract(dcaYieldManager, signer, daix, gasPrice, amount){
    //approve to spend the supertoken daix
    const dcaYieldManagerApproval = daix.approve({
        receiver: dcaYieldManager.address,
        amount: ethers.utils.parseEther(amount)
    }, {gasPrice:gasPrice})


    await dcaYieldManagerApproval.exec(signer).then(function (tx) {
        console.log(`
        Congrats! You've just successfully approved the money router contract. 
        Tx Hash: ${tx.hash}
    `)
    })
}

async function sendMoneytoContract(dcaYieldManager, signer, provider, amount, daix){
    gasPrice = (await provider.getGasPrice()).toString()

    await dcaYieldManager
        .connect(signer)
        .sendLumpSumToContract(
            daix.address, "1000000000000000"/*ethers.utils.parseEther(amount)*/,
            {gasPrice:gasPrice})
        .then(function (tx) {
            console.log(`
        Congrats! You just successfully sent funds to the money router contract. 
        Tx Hash: ${tx.hash}
    `)
        })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})