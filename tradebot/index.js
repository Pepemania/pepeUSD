const ethers = require('ethers');

const provider = new ethers.providers.WebSocketProvider("https://aged-polished-liquid.ethereum-sepolia.discover.quiknode.pro/fcfdb5b0b20deb3aba795470852149e089073854/")
const poolABI = require('./poolAbi.json');
const factoryABI = require('./factoryAbi.json');

const factoryAddress = '0x0227628f3F023bb0B980b67D528571c95c6DaC1c';
// const poolAddress = '0x7646C29F0e86a4271Ea844EA3C03E8A0237B6d14';

const getPrice = async (
    token0,
    token1,
    feeAmount
  ) => {
    try {
      const factory = new ethers.Contract(factoryAddress, factoryABI, provider);
      const poolAddress = await factory.getPool(token0, token1, feeAmount);
      const pool = new ethers.Contract(poolAddress, poolABI, provider);
      const slot0 = pool.slot0();
      console.log("slot0", slot0);
      return slot0;
    } catch (error) {
      console.log(error, "this is the error for getPrice")
    }
  };

  getPrice(
    "0xa9392331d48607f77C745275CD3382ebe7a98ee1",
    "0x8622B34d523F74E7db31e2268b74e8528D7dDb32",
    3000
    ).
    then((res) => {
        const price = res?.sqrtPriceX96._hex
        const calcPrice = price ** 2 / 2 ** 192
        console.log(BigInt(calcPrice));
    });
