function customFlexDeal(name, address) {
    contracts[name] =  contract.at(address);
}

function newDeal(coin, payment, seekerCollateral, providerCollateral, seeker, provider, arbitrator) {
    web3.eth.getTransactionCount(ethPublicKey, (err0, res0) => {
        if (err0) {
            //Err
            console.log(err0);
            return;
        }
        var tx = new EthJS.Tx({
            nonce: res0,
            gasPrice: 20000000000,
            gasLimit: 2000000,
            to: contracts[coin].address,
            from: ethPublicKey,
            data: contracts[coin].newDeal.getData(payment, seekerCollateral, providerCollateral, seeker, provider, arbitrator)
        });
        tx.sign(account);
        tx = tx.serialize();
        web3.eth.sendRawTransaction("0x" + tx.toString("hex"), (err1, res1) => {
            if (err1) {
                //Err
                console.log(err1);
                return;
            }
            console.log(res1);
        });
    });
}

function fundDeal(coin, deal, amount) {
    contracts[coin].fundDeal.call(deal, amount);
}

function refund(coin, deal) {
    web3.eth.getTransactionCount(ethPublicKey, (err0, res0) => {
        if (err0) {
            //Err
            console.log(err0);
            return;
        }
        var tx = new EthJS.Tx({
            nonce: res0,
            gasPrice: 20000000000,
            gasLimit: 2000000,
            to: contracts[coin].address,
            from: ethPublicKey,
            data: contracts[coin].refund.getData(deal)
        });
        tx.sign(account);
        tx = tx.serialize();
        web3.eth.sendRawTransaction("0x" + tx.toString("hex"), (err1, res1) => {
            if (err1) {
                //Err
                console.log(err1);
                return;
            }
            console.log(res1);
        });
    });
}

function setState(coin, deal, state) {
    web3.eth.getTransactionCount(ethPublicKey, (err0, res0) => {
        if (err0) {
            //Err
            console.log(err0);
            return;
        }
        var tx = new EthJS.Tx({
            nonce: res0,
            gasPrice: 20000000000,
            gasLimit: 2000000,
            to: contracts[coin].address,
            from: ethPublicKey,
            data: contracts[coin].setState.getData(deal, state)
        });
        tx.sign(account);
        tx = tx.serialize();
        web3.eth.sendRawTransaction("0x" + tx.toString("hex"), (err1, res1) => {
            if (err1) {
                //Err
                console.log(err1);
                return;
            }
            console.log(res1);
        });
    });
}
