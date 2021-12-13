import { HARDHAT_PORT, HARDHAT_PRIVATE_KEY } from "@env";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import localhost from "react-native-localhost";
import Web3 from "web3";
import { DataTokens, Ocean, Config, ConfigHelper, Logger } from "@oceanprotocol/lib";
const factoryABI = require("@oceanprotocol/contracts/artifacts/DTFactory.json").abi;
const datatokensABI = require("@oceanprotocol/contracts/artifacts/DataTokenTemplate.json").abi;
import WalletConnectProvider from "@walletconnect/web3-provider";

import Hello from "../artifacts/contracts/Hello.sol/Hello.json";

const defaultConfig = {
  metadataCacheUri: 'https://aquarius.oceanprotocol.com',
  oceanTokenAddress: null,
  oceanTokenSymbol: 'OCEAN',
  factoryAddress: '0x1234',
  poolFactoryAddress: null,
  fixedRateExchangeAddress: null,
  dispenserAddress: null,
  metadataContractAddress: null,
  transactionBlockTimeout: 50,
  transactionConfirmationBlocks: 1,
  transactionPollingTimeout: 750,
  gasFeeMultiplier: 1,
	networkId: 4,
  network: 'rinkeby',
  infuraId: 'c5ada3e623654993b6298eda8d20d5a3',
  nodeUri: 'https://rinkeby.infura.io/v3/c5ada3e623654993b6298eda8d20d5a3',
  providerUri: 'https://provider.rinkeby.oceanprotocol.com',
  subgraphUri: 'https://subgraph.rinkeby.oceanprotocol.com',
  explorerUri: 'https://rinkeby.etherscan.io',
  startBlock: 7294090
}

const styles = StyleSheet.create({
  center: { alignItems: "center", justifyContent: "center" },
  // eslint-disable-next-line react-native/no-color-literals
  white: { backgroundColor: "white" }
});

const shouldDeployContract = async (web3, abi, data, from: string) => {
  const deployment = new web3.eth.Contract(abi).deploy({ data });
  const gas = await deployment.estimateGas();
  const {
    options: { address: contractAddress }
  } = await deployment.send({ from, gas });
  return new web3.eth.Contract(abi, contractAddress);
};

export default function App(): JSX.Element {
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState("Loading...");
  //const web3 = React.useMemo(
  //  () =>
  //    new Web3(
  //      new Web3.providers.HttpProvider(defaultConfig.nodeUri)
  //    ),
  //  [HARDHAT_PORT]
  //);
  //React.useEffect(() => {
  //    //const { address } = await web3.eth.accounts.privateKeyToAccount(
  //    //  HARDHAT_PRIVATE_KEY
  //    //);
  //    //const contract = await shouldDeployContract(
  //    //  web3,
  //    //  Hello.abi,
  //    //  Hello.bytecode,
  //    //  address
  //    //);
  //    //setMessage(await contract.methods.sayHello("React Native").call());
  //  })();
  //}, [web3, shouldDeployContract, setMessage, HARDHAT_PRIVATE_KEY]);
  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  const signTransaction = React.useCallback(async () => {
			console.log("attempting to sign");
      const provider = new WalletConnectProvider({
        infuraId: defaultConfig.infuraId
      });
      await provider.enable();
      const web3 = new Web3(provider);
      const config = {
        ...defaultConfig,
        web3Provider: web3
      };
      const ocean = await Ocean.getInstance(config);
console.log(ocean);
      const datatoken = new DataTokens(
        "0x57317f97E9EA49eBd19f7c9bB7c180b8cDcbDeB9",
        factoryABI,
        datatokensABI,
        web3
      );
      const blob = `http://localhost:8030/api/v1/services/consume`;
      const accounts = await ocean.accounts.list();
      const alice = accounts[0].id;
      const tokenAddress = await datatoken.create(blob, alice);
      //console.log(`Deployed datatoken address: ${tokenAddress}`);
    //try {
    //  await connector.signTransaction({
    //    data: "0x",
    //    from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
    //    gas: "0x9c40",
    //    gasPrice: "0x02540be400",
    //    nonce: "0x0114",
    //    to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
    //    value: "0x00"
    //  });
    //} catch (e) {
    //  console.error(e);
    //}
  }, [connector]);
  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);
  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <TouchableOpacity onPress={signTransaction}>
            <Text>Sign a Transaction</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={killSession}>
            <Text>Kill Session</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
