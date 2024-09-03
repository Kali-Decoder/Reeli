const hre = require("hardhat");
const ReelsFiTokenAddress = "0xe8e68427f4E52C90cc05E1A6D86e26842a0da8d1";
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getSecondsOfDays(day) {
  return day * 24 * 60 * 60;
}
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Deploying ReelsFi Contract...");

  const ReelsFi = await hre.ethers.deployContract("ReelsFi", [ReelsFiTokenAddress]);

  await ReelsFi.waitForDeployment();

  console.log(
    "ReelsFi Deployed Successfully on Mentioned Network",
    ReelsFi.target
  );

  console.log("Waiting for 30 Seconds to Verify the Contract on Etherscan");
  await sleep(30 * 1000);

  // // Verify the RektLock Contract
  await hre.run("verify:verify", {
    address: ReelsFi.target,
    constructorArguments: [ReelsFiTokenAddress],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
