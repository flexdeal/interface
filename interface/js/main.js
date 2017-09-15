function generateWallet(password) {
    password = cryptico.generateRSAKey(password, 2048);
    window.publicKey = cryptico.publicKeyString(password);
    lightwallet.keystore.createVault({ password: "" }, (err, ks) => {
        ks.keyFromPassword("", (err, key) => {
            ks.generateNewAddress(key, 1);
            window.ethPrivateKey = ks.exportPrivateKey(ks.getAddresses()[0], key);
            ks = reset(ks);
            key = reset(key);
            location = "data:application/octet-stream," + cryptico.encrypt(ethPrivateKey, publicKey).cipher;
        });
    });
    password = reset(password);
}

function loadWallet(event) {
    window.reader = new FileReader();
    reader.onload = (() => {
        window.file = reader.result;
        file = atob(file.substr(13));
        reader.result = reset(reader.result);
        delete reader.result;
        reader = reset(reader);
        delete window.reader;
    });
    reader.readAsDataURL(event.target.files[0]);
};

function decryptWallet(password) {
    password = cryptico.generateRSAKey(password, 2048);
    window.ethPrivateKey = cryptico.decrypt(file, password).plaintext;
    password = reset(password);

    file = reset(file);
    delete window.file;

    if (ethPrivateKey) {
        window.ethPublicKey = "0x" + lightwallet.keystore._computeAddressFromPrivKey(ethPrivateKey);
        document.write("Address: " + ethPublicKey + "<br>" +
            "Private Key: " + ethPrivateKey);
        window.account = new EthJS.Buffer.Buffer(ethPrivateKey, "hex");
    } else {
        alert("Failure decrypting.");
    }
    event = contracts["test"].dealCreated({}, {});
    event.watch((err, res) => {
        if ((web3.eth.getTransaction(res.transactionHash).from) === ethPublicKey) {
            alert("Deal created! ID: " + res.args.id.c[0])
        }
    });
}

function generate() {
    if (document.getElementById("pass").value === "") {
        alert("Please enter a password.");
        return;
    }
    generateWallet(document.getElementById("pass").value);
}
function decrypt() {
    if (document.getElementById("pass").value === "") {
        alert("Please enter a password.");
        return;
    }
    decryptWallet(document.getElementById("pass").value);
}

window.onbeforeunload = ((e) => {
    if (window.ethPrivateKey) {
        window.ethPrivateKey = reset(window.ethPrivateKey);
        delete window.ethPrivateKey;
    }
    if (window.account) {
        window.account = reset(window.account);
        delete window.account;
    }
});
