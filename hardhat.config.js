/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0x99dbc144f99fa8592b70278abb06598a0d0c611071098403cf6c4fa7ece8fe7d","balance":"1000000000000000000000"},{"privateKey":"0x175d49c4c28434c9135711aaba2ddb0da9db77db7591360793a8606922f23c7a","balance":"1000000000000000000000"},{"privateKey":"0xeefaf54cbad021623c859d28eb4d7d469a8dbf914753544194a6f26ed949eea7","balance":"1000000000000000000000"},{"privateKey":"0xd0f759b995e5ccf51609d55dd2788270ed81a0c14af5c9a71e1581b8ed228553","balance":"1000000000000000000000"},{"privateKey":"0x4e03e4bb79cdbc64039175c294fbc2eef05af18753eb23d23affe07d6c354062","balance":"1000000000000000000000"},{"privateKey":"0x9bd96a2e5eeeafa53315d95f4ab15cbd7fc37788851e9d3ebefce8b85d009c1c","balance":"1000000000000000000000"},{"privateKey":"0x534b9de20152e9b2166170711e14355ff51d6ed7d49d504826a692df604b84d7","balance":"1000000000000000000000"},{"privateKey":"0xacc66c78e4fabde38d341e86d1dad0500d6552738d2ea83af2e0cc946be626f2","balance":"1000000000000000000000"},{"privateKey":"0x8cd995aa5cba2618cd78791648ca819857e69d19ac06b5a0c0e6e461951f0be6","balance":"1000000000000000000000"},{"privateKey":"0x82198cafc3c85778ff9a67be506ac0516b17dd205ada456ca75799da6f80e177","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};