"use strict";
const g_constants = require("../constants")
const P2P = require("p2plib");

const options = {
    SSL_options: g_constants.SSL_options,
    seeders: ["82.118.22.155:10443"]
}

require("./database").Init();

// @ts-ignore
global.p2p = new p2plib(false);

p2p.StartServer(options)

const utils = require("../utils")
setInterval(() => {
    const sell_coins = ["tbtc", "btc"];

    for (let i=0; i<sell_coins.length; i++)
    {
        utils.getOrdersFromP2P(sell_coins[i], async result => {
            if (!result || result.result != true || result.sell_coin != sell_coins[i])
                return;

            utils.SaveOrdersToDB(result.orders, result.sell_coin)
        });
    }
}, 60*1000)

