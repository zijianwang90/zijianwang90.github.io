/** Created by miniQ on 18/12/5. */

const Common = {
    fee: 100,
    feeToAddress: '0xc67D67dC079E0Cb720A76e943f8fA7fb29228d99',
    weiOfCmt: Math.pow(10,18),

    getUrlParam: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    getValueById: function (id) {
        return document.getElementById(id).value;
    },

    payServiceFee: function (callback, errorCallback) {
        web3.cmt.getAccounts(function(error,accounts){
            console.log(accounts[0]);
            web3.cmt.sendTransaction({from: accounts[0], to: Common.feeToAddress, value: web3.toWei(Common.fee, "ether")}, function (error, tx) {
                if (!error && tx != null){
                    Common.log('Pay service fee tx', tx);
                    // App.hasPaid = true;
                    if(callback != null && callback != undefined){
                        callback();
                    }else{
                        Common.iutoast('iusuccess', 'Pay successfully!', 1500);
                    }
                }else{
                    if(errorCallback != null && errorCallback != undefined){
                        errorCallback(error);
                    }else{
                        Common.handleTransationError('Pay failed!', error);
                    }

                }
            })
        });
    },

    handleTransationError: function (title, error) {
        if (error.code == '1002') {
            Common.iutoast('iuerror', 'Your balance is not enough!', 1500);
        } else if (error.code == '1001') {
            Common.iutoast('iuerror', 'Transaction canceled!', 1500);
        }
        Common.log(title, error);
    },

    log: function (title, obj) {
        if(Common.getUrlParam('mode') == 'test1010'){
            console.log('********************* ' + title + ':start **********************');
            console.log(obj);
            console.log('********************* ' + title + ':end **********************');
        }
        if(Common.getUrlParam('mode') == 'test1111'){
            alert(title + '@@' + JSON.stringify(obj));
        }
    },

    iutoast: function (iutype, iutitle, delay) {
        alert(iutitle);
        // $('[data-code="icon"]').hide();
        // $('#' + iutype).show();
        // var localIutitle = iutitle;
        // if(App.toastLocalizeData != null && App.toastLocalizeData[iutitle] != undefined){
        //     localIutitle = App.toastLocalizeData[iutitle];
        // }
        // $('#iutitle').html(localIutitle);
        // $('#iutoast').show();
        // if(delay != null && delay != '' && delay != undefined){
        //     setTimeout(function () {
        //         $('#iutoast').hide();
        //     }, delay);
        // }
    },

    isFieldEmpty: function(fieldValue){
        if(fieldValue == null || fieldValue == undefined || fieldValue == ''){
            return true;
        }
        return false
    },

    formateBalance: function (banlance, decimals) {
        var d = 18;
        if(decimals != null && decimals != undefined){
            d = parseInt(decimals.toString(10))
        }
        if(banlance.toString(10).length < d){
            return banlance.toString();
        }
        banlance = banlance.toString(10).substring(0, banlance.toString(10).length - d);
        var len = banlance.length;
        if(len < 4){
            return banlance;
        }
        var left = len % 3;
        var headStr = banlance.substring(0, left);

        for(var i = 0; i < (len - left)/3; i++){
            headStr = headStr + ',' + banlance.substring(left + i*3, left + (i+1)*3);
        }
        if(left == 0){
            headStr = headStr.substring(1, headStr.length);
        }
        return headStr;
    },

    formateAmount: function (amount, decimals) {
        var d = 18;
        if(decimals != null && decimals != undefined){
            d = parseInt(decimals.toString(10))
        }
        const amountStr = amount + '';
        var len = amountStr.length;
        if(len < 4){
            return amountStr;
        }
        var left = len % 3;
        var headStr = amountStr.substring(0, left);

        for(var i = 0; i < (len - left)/3; i++){
            headStr = headStr + ',' + amountStr.substring(left + i*3, left + (i+1)*3);
        }
        if(left == 0){
            headStr = headStr.substring(1, headStr.length);
        }
        return headStr;
    },

    checkTransactionStatus: function(tx, successCallback, errorCallback){
        var checkTransactionTimer = setInterval(function () {
            web3.cmt.getTransactionReceipt(tx, function (error, result) {
                if(!error){
                    if(result != null && result.status == '0x1'){
                        clearInterval(checkTransactionTimer);
                        if(successCallback != null && successCallback != undefined){
                            successCallback(result);
                        }else{
                            alert('Transaction successfully!')
                            // IUToast.show('ok', 'Transaction successfully!', 1500);
                        }

                    }else if(result != null && result.status == '0x0'){
                        if(errorCallback != null && errorCallback != undefined){
                            errorCallback(error);
                        }else{
                            alert('Transaction failed!')
                            // IUToast.show('error', 'Transaction failed!', 1500);
                        }
                        clearInterval(checkTransactionTimer);
                    }
                }
            })
        }, 5000)
    },


}

export default Common;