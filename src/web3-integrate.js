import Web3 from 'web3';

export default {
    provider: null,
    init: function() {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {

            // Web3 browser user detected. You can now use the provider.
            this.provider = window['ethereum'] || window.web3.currentProvider

            // Using Web3 v1.0
            window.web3 = new Web3(window.web3.currentProvider);
            return true;
        } else {
            document.getElementById("app").innerText = "You browser does not support web3 currently."
            document.getElementById("app").style.padding = '10px';
            document.getElementById("app").style.textAlign = 'center';
            document.getElementById("app").style.background = 'none';
            return false;
        }
    }
}
