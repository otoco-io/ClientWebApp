export default {
    provider: null,
    init: function() {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {

            // Web3 browser user detected. You can now use the provider.
            this.provider = window['ethereum'] || window.web3.currentProvider
        } else {
            document.getElementById("loading").innerText = "You shoud intsall MetaMask first."
        }
    }
}
