function getEth() {
    var balance = web3.eth.getBalance(ethPublicKey).c;
    balance.forEach((e, i) => {
        balance[i] = "" + e;
    });
    balance = balance.join("");
    if (balance.length < 19) {
        var prepend;
        for (prepend = ""; (prepend.length + balance.length) < 18;) {
            prepend += "0";
        }
        balance = "0" + prepend + balance;
    }
    balance = balance.split("");
    balance.splice(balance.length - 18, 0, ".");
    return balance.join("");
}

var contract = [{"constant":false,"inputs":[{"name":"deal","type":"uint256"},{"name":"howMuch","type":"uint256"}],"name":"fundDeal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"deal","type":"uint256"}],"name":"getDealMoney","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"deal","type":"uint256"}],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getERC20","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAmountOfDeals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"deal","type":"uint256"},{"name":"state","type":"uint8"}],"name":"setState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"deal","type":"uint256"},{"name":"who","type":"address"}],"name":"getInvolvement","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"payment","type":"uint256"},{"name":"seekerCollateral","type":"uint256"},{"name":"providerCollateral","type":"uint256"},{"name":"seeker","type":"address"},{"name":"provider","type":"address"},{"name":"arbitrator","type":"address"}],"name":"newDeal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"deal","type":"uint256"}],"name":"getDealStates","outputs":[{"name":"","type":"uint8"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deal","type":"uint256"}],"name":"getDealPeople","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"dealCreated","type":"event"}];
contract = web3.eth.contract(contract);

var contracts = {
    test: contract.at("0x70232323a55b4E585042b3A54f14ef7756f1AEf7")
}

function getDealCount(coin) {
    return contracts[coin].getAmountOfDeals.call().c[0];
}

function getERC20(coin) {
    return contracts[coin].getERC20.call();
}

var ERC20ABI = [{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"}];
function getERC20Balance(coin) {
    return ((() => {
        var balance = web3.eth.contract(ERC20ABI).at(getERC20(coin)).balanceOf.call(ethPublicKey);
        if (balance.e != balance.c.join("").length) {
            balance.c.forEach((e, i) => {
                balance.c[i] = "" + e;
            });
            balance.c = balance.c.join("");
            var append;
            for (append = ""; (balance.c.length + append.length) < balance.e;) {
                append += "0";
            }
            balance.c = balance.c + append;
            try {
                web3.eth.contract(ERC20ABI).at(getERC20(coin)).decimals.call();
            } catch (e) {
                console.log("NO DECIMALS!");
                return balance.c;
            }
            balance.c = balance.c.split("");
            balance.c.splice(balance.c.length - web3.eth.contract(ERC20ABI).at(getERC20(coin)).decimals.call(), 0, ".");
            return balance.c.join("");
        }
    })());
}

function getDealMoney(coin, deal) {
    var money = contracts[coin].getDealMoney.call(deal);
    return [money[0].c[0], money[1].c[0], money[2].c[0], money[3].c[0]];
}

function getDealPeople(coin, deal) {
    return contracts[coin].getDealPeople.call(deal);
}

function getDealStates(coin, deal) {
    var states = contracts[coin].getDealStates.call(deal);
    return [states[0].c[0], states[1], states[2]];
}

function getInvolvement(coin, deal, who) {
    return contracts[coin].getInvolvement.call(deal, who).c[0];
}
