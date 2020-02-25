/**
 * Created by miniQ on 18/11/8.
 */

var App = {
    isOwnner: false,
    //100 cmt
    updateProfileFee: '100000000000000000000',
    feeToAddress: '0xc67D67dC079E0Cb720A76e943f8fA7fb29228d99',

    contract:{
        address: null,
        abi:[
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "property",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "document",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_logo",
                        "type": "string"
                    }
                ],
                "name": "setLogo",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "INITIAL_SUPPLY",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "unpause",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "founder",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_property",
                        "type": "string"
                    }
                ],
                "name": "setProperty",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_document",
                        "type": "string"
                    }
                ],
                "name": "setDocument",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "version",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "paused",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseApproval",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "links",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "description",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "pause",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "issueDate",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "rights",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_logo",
                        "type": "string"
                    },
                    {
                        "name": "_webSite",
                        "type": "string"
                    },
                    {
                        "name": "_links",
                        "type": "string"
                    },
                    {
                        "name": "_rights",
                        "type": "string"
                    },
                    {
                        "name": "_description",
                        "type": "string"
                    }
                ],
                "name": "updateProfile",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "crowdFunding",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "freezenAmount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "website",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_founder",
                        "type": "address"
                    },
                    {
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "isFounderFreezen",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "name": "_addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseApproval",
                "outputs": [
                    {
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_contractAddress",
                        "type": "address"
                    },
                    {
                        "name": "_tokenAmount",
                        "type": "uint256"
                    }
                ],
                "name": "setCrowdFunding",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "freezenTime",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_webSite",
                        "type": "string"
                    }
                ],
                "name": "setWebsite",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "logo",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_symbol",
                        "type": "string"
                    },
                    {
                        "name": "_decimals",
                        "type": "uint8"
                    },
                    {
                        "name": "_supply",
                        "type": "uint256"
                    },
                    {
                        "name": "_freezenAmount",
                        "type": "uint256"
                    },
                    {
                        "name": "_freezenTime",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "tokenName",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "logo",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "webSite",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "links",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "rights",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ProfileHistory",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "Pause",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "Unpause",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipRenounced",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            }
        ],
        instance: null,
        ownner: null,
    },
    profile:{
        logo: null,
        website: null,
        links: null,
        rights: null,
        description: null,
    },
    updateProfileTx: null,
    hasPaid: false,
    tokenVisionFlag: ['bbd80029','16550029'],
    currentTokenVersion: 1,
    tokenTrackingUrl:"https://testnet.cmttracking.io/token/{contract_address}",
    gasPrice: '10000000000',
    defaultGas: '20000000',
    toastLocalizeData: null,
    crowdfundingAddress: null,

    init: function () {
        //test   test
        // App.checkWalletInstall();

        App.initContractAddress();

        //need contract address
        App.initTokenTrackingUrl();

        App.initContractInstance();
        App.initContractOwner();
        App.initView();
        App.initCrowdfunding();
        App.initLanguage();
        App.bindEvent();
        App.endSartAnimation();
        //test
        // App.hasPaid = true;

    },

    initTokenTrackingUrl: function () {
        if(window.location.origin.indexOf("www.cmtoken.io") > 0){
            App.tokenTrackingUrl = App.tokenTrackingUrl.replace('testnet', 'www');
        }
        App.tokenTrackingUrl = App.tokenTrackingUrl.replace('{contract_address}', App.contract.address);
        console.log(App.tokenTrackingUrl);
    },

    getContractCode: function (contractAddress) {
        //0x8d58aca59f6a3d1db96a0abdb284bc4a7323ad8c
        web3.cmt.getCode(contractAddress, function (error, code) {
            console.log(contractAddress)
            console.log(code.substring(code.length - 8));
        })

    },

    initContractAddress: function (url) {
        App.contract.address = App.getQueryVariable("contractAddress");
        if(!App.contract.address){
            console.log('init contract address fail');
            App.contract.address = null;
            var contractAdressMissingAlert = weui.alert('Missing contract address!', {
                buttons: [{
                    label: 'Confirm',
                    type: 'primary',
                    onClick: function () {
                        contractAdressMissingAlert.hide();
                    }
                }]
            });
        }else{
            console.log(App.contract.address);
        }
    },

    initContractInstance: function () {
        if(App.contract.address != null){
            App.contract.instance = web3.cmt.contract(App.contract.abi).at(App.contract.address);
        }
    },

    initView: function () {
        if(App.contract.instance != null){
            App.contract.instance.version(function (error, result) {
                if(!error && result != null){
                    //new token version from 2
                    if(parseInt(result.toString()) > 1){
                        App.currentTokenVersion = parseInt(result.toString());
                    }
                }
                App.showTokenVersionDetailView();
                // test
                App.hideOldTokenUpdateBtn();
                // App.hideOldTokenWebsiteInput();
            })

            App.contract.instance.owner(function (error, owner) {
                if(!error){
                    web3.cmt.getAccounts(function (error, accounts) {
                        if(!error && accounts[0].toLowerCase() == owner.toLowerCase()){
                            App.ownerView();
                        }else{
                            App.unownerView();
                        }
                    })
                    console.log(owner);
                }else{
                    console.log(error);
                }

            })
        }

    },

    fetchProfile: function () {
        if(App.contract.instance != null){

            App.contract.instance.name(function(error, tokenName){
                if(!error){
                    // App.profile.totalSupply = totalSupply;
                    //return 0
                    $('#tokenName').html(tokenName);
                }
                console.log(tokenName);
            })

            App.contract.instance.symbol(function(error, tokenSymbol){
                if(!error){
                    // App.profile.totalSupply = totalSupply;
                    //return 0
                    $('#tokenSymbol').html('(' + tokenSymbol + ')');
                }
                console.log(tokenSymbol);
            })


            App.contract.instance.decimals(function(error, decimals){
                if(!error){
                    // App.profile.totalSupply = totalSupply;
                    //return 0
                    App.contract.instance.totalSupply(function(error, totalSupply){
                        if(!error){
                            // App.profile.totalSupply = totalSupply;
                            //return 0
                            $('#totalSupply').html(App.formateBalance(totalSupply, decimals));
                        }
                        console.log(totalSupply);
                        console.log(totalSupply.toString(10));

                    })
                }
                console.log(decimals);
            })


            App.contract.instance.issueDate(function(error, issueDate){
                $('#issueDate').html('N/A');
                App.log('issueDate', issueDate);
                if(!error && issueDate != null && issueDate.toNumber() > 0){
                    // App.profile.issueDate = issueDate;
                    // return 0
                    var date = new Date(parseInt(issueDate.toString())*1000);
                    // $('#issueDate').html('03 Nov 2018')
                    $('#issueDate').html(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
                }
                console.log('issue date:' + issueDate.toNumber());
            })

            //contract address
            $('#contractAddress').html(App.contract.address.substring(0,6) + '****' + App.contract.address.substring(App.contract.address.length-4,App.contract.address.length));
            $('#contractAddressHref').attr('href', App.tokenTrackingUrl);

            App.contract.instance.logo(function(error, result){
                if(!error && result != null && result != ''){
                    App.profile.logo = result;
                    $('#tokenLogo').attr('src', App.corpIconTool(result));
                }else{
                    App.profile.logo = "";
                }
                console.log('logo:' + result  + ';');
            })

            App.contract.instance.website(function(error, website){
                if(!error){
                    App.profile.website = website;
                    $('#websiteDetail').html(website);
                    $('#websiteHref').attr('href', website);
                    // adapt old token
                    // App.showOldTokenLogo(website);
                }
                console.log('website:' + website);
            })

            App.contract.instance.links(function(error, links){
                if(!error){
                    App.profile.links = links;
                    $('#linksDetail').html(links);
                    if(links != null && links != undefined && links.indexOf('http') > 0){
                        $('#linksHref').attr('href', links);
                    }

                }
                console.log(links);
            })

            App.contract.instance.rights(function(error, rights){
                if(!error){
                    App.profile.rights = rights;
                    $('#rightsDetail').html(rights);
                }
                console.log(rights);
            })

            App.contract.instance.description(function(error, description){
                if(!error){
                    App.profile.description = description;
                    $('#descriptionDetail').html(description);
                }
                console.log(description);
            })
        }
    },

    loadEditProfile: function () {
        $('#website').val(App.profile.website);
        $('#links').val(App.profile.links);
        $('#rights').val(App.profile.rights);
        $('#description').html(App.profile.description);
    },

    sendUpdateProfileTransation: function (logo, website, links, rights, description) {
        var feeData = App.contract.instance.updateProfile.getData(logo, website, links, rights, description);

        var fee = web3.cmt.estimateGas({data:feeData, to: App.contract.address},function (error, gas) {
            App.log('estimateGas value', gas);
            App.log('estimateGas error', error);
            if(!gas){
                gas = '1000000';
            }
            if(gas){
                App.contract.instance.updateProfile(logo, website, links, rights, description, {gasPrice: App.gasPrice, gas: gas + ''}, function (error, tx) {
                    App.log('update profile tx', tx);
                    if(!error){
                        var successUpdateTimer = setInterval(function () {
                            web3.cmt.getTransactionReceipt(tx, function (error, result) {
                                console.log(result);

                                if(!error){
                                    // console.log(result.status);
                                    if(result != null && result.status == '0x1'){
                                        App.hasPaid = false;
                                        App.iutoast('iusuccess','Update profile successfully!', 1500);
                                        App.showProfileDetail();
                                        App.fetchProfile();
                                        clearInterval(successUpdateTimer);
                                    }else if(result != null && result.status == '0x0'){
                                        App.iutoast('iusuccess','Update profile fail!', 1500);
                                        clearInterval(successUpdateTimer);
                                    }
                                }
                            })
                        }, 5000)
                    }else{
                        App.handleTransationError('Update profile fail!', error);
                    }

                })
            }

        });
    },

    showProfileDetail: function () {
        $('.token-profile-detail').show();

        $('.token-input-ed').hide();
        $('.token-desc-area').hide();

        //remove logo click event when show token detail
        // $('#tokenLogo').off('click');
        // $('#file').off('change');
        $('.token-logo-mask').hide();

        App.showTokenVersionDetailView();
        App.ownerView();
    },

    showProfileEdit: function () {
        App.loadEditProfile();
        $('.token-profile-detail').hide();

        $('.token-input-ed').css('display', 'flex');
        $('.token-desc-area').css('display', 'flex');
        $('.token-logo-mask').show();
        App.showTokenVersionDetailView();
        App.ownerView();
    },

    getQueryVariable: function (variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            console.log(pair);
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },


    payUpdateProfileFee: function () {
        web3.cmt.getAccounts(function(error,accounts){
            console.log(accounts[0]);
            web3.cmt.sendTransaction({from: accounts[0], to: App.feeToAddress, value: App.updateProfileFee}, function (error, tx) {
                if (!error && tx != null){
                    App.log('Pay update profile fee tx', tx);
                    App.iutoast('iusuccess', 'Pay successfully!', 1500);
                    App.hasPaid = true;
                    App.showProfileEdit();
                }else{
                    App.handleTransationError('Pay failed!', error);
                }
            })
        });
    },

    handleUpdateProfileClick: function () {
        if(App.currentTokenVersion == 1){
            if(App.hasPaid){
                App.iutoast('iuloading', 'Transaction processing...');
                App.sendTransationUpdateWebsite();
            }else{
                // old token skip pay
                App.hasPaid = true;
                App.showProfileEdit();
                // App.iutoast('iuloading', 'Transaction processing...', 100);
            }
        }else{
            App.iutoast('iuloading', 'Transaction processing...');
            if(App.hasPaid){
                App.sendUpdateProfileTransation(App.profile.logo, App.buildLink($('#website').val()), App.buildLink($('#links').val()), $('#rights').val(), $('#description').val());
            }else{
                App.payUpdateProfileFee();
            }
        }
    },

    isEmpty: function () {

        if(App.isEmptyInput($('#website'), 'website')){
            return true;
        }

        if(App.isEmptyInput($('#links'), 'links')){
            return true;
        }

        if(App.isEmptyInput($('#rights'), 'rights')){
            return true;
        }

        if(App.isEmptyInput($('#description'), 'description')){
            return true;
        }

        return false;
    },

    bindEvent: function () {
        $(document).on('click', '#updateProfile', App.handleUpdateProfileClick);
        $(document).on('click', '#updateProfileSubmit', App.handleUpdateProfileClick);
        $(document).on('click', '#tokenLogoUploadBtn', App.handleLogoClick);
        $(document).on('change', '#file', App.handleFileInputChange);
        $(document).on('click', '#file', App.handleUploadInputClick);
        $(document).on('click', '#crowdfunding', App.handleCrowdfundingClick);
        $(document).on('click', '#participate', App.handleParticipateClick);
    },

    handleCrowdfundingClick: function () {
      location.href = './crowdfunding/pages/index.html?token=' +  App.getQueryVariable("contractAddress");
    },

    handleParticipateClick: function () {
        location.href = './crowdfunding/pages/detail.html?token=' +  App.getQueryVariable("contractAddress") + '&crowdfundingAddress=' + App.crowdfundingAddress;
    },

    initContractOwner: function () {
        if(App.contract.instance != null){
            App.contract.instance.owner(function (error, owner) {
                if(!error){
                    App.contract.ownner = owner;
                    console.log(owner);
                }else{
                    console.log(error);
                }

            })
        }
    },

    initCrowdfunding: function () {
        //init crowdfunding address
        App.contract.instance.crowdFunding(function(error, crowdFunding){
            if(location.href.indexOf('www.cmtoken.io') > -1){
                return false;
            }
            if(!error){
                // App.profile.totalSupply = totalSupply;
                //return 0
                App.crowdfundingAddress = crowdFunding;
            }
            console.log('crowdfunding address:' + crowdFunding);
            if(!App.isEmptyContractAddress()){
                $('#participate').show();
            }
            //
            App.contract.instance.owner(function (error, owner) {
                web3.cmt.getAccounts(function (error, accounts) {
                    if(!error && accounts[0].toLowerCase() == owner.toLowerCase()){
                        if(App.isEmptyContractAddress()){
                            $('#crowdfunding').show();
                        }
                    }
                })

            });

        })
    },

    isEmptyContractAddress: function () {
      if(App.crowdfundingAddress == null || App.crowdfundingAddress == '' || App.crowdfundingAddress == '0x0000000000000000000000000000000000000000'){
          return true;
      }
      return false;
    },

    handleLogoClick: function (e) {
        e.preventDefault();
        $('#file').click();
    },

    handleUploadInputClick: function(e){
        // App.handleFileInputChange();
         e.stopPropagation();
    },

    ownerView: function () {
        if(App.hasPaid){
            $('#submitFooter').show();
            $('#updateProfileFooter').hide();
        }else{
            $('#updateProfileFooter').show();
            $('#submitFooter').hide();
        }

        //old token

    },


    unownerView: function () {
        //crowdfunding
        if( App.crowdfundingAddress != null && App.crowdfundingAddress != ''){
            $('#participate').show();
            $('#crowdfunding').hide();
        }
    },

    hideOldTokenUpdateBtn: function () {
        // test hide old token update
        if(App.currentTokenVersion == 1){
            $('.submit').hide();
        }
    },

    showOldTokenLogo: function(url){
        if(App.currentTokenVersion == 1 && url != null && url != ''){
            $('#tokenLogo').attr('src', App.corpIconTool(url));
        }
    },

    hideOldTokenWebsiteInput: function () {
        // test hide old token update website
        if(App.currentTokenVersion == 1){
            $('#websiteSection').hide();

        }
    },

    showTokenVersionDetailView: function () {
        if(App.currentTokenVersion == 1){
            $('#linksSection').hide();
            $('#rightsSection').hide();
            $('#descriptionSection').hide();
            $('.cost-token').hide();
            $('#websiteSection').hide();
        }else{
            $('#linksSection').show();
            $('#rightsSection').show();
            $('#descriptionSection').show();
            $('.cost-token').show();
        }
    },

    checkImgType: function (fileName) {

        if (fileName == "") {
            alert("请上传图片");
            return false;
        } else {
            if (!/\.(jpg|jpeg|png|JPEG|JPG|PNG)$/.test(fileName)) {
                alert("Logo image type must be one of jpeg,jpg,png.");
                return false;
            }
        }
        return true;

    },

    handleFileInputChange: function () {
        var formData = new FormData();
        formData.append('file', $('#file')[0].files[0]);
        if(!App.checkImgType($('#file').val())){
            $('#file').val('');
            return;
        }
        formData.append('upload_preset', 'tokenlogo');
        App.iutoast('iuloading', 'Logo uploading...');
        $.ajax({
            url: 'https://api.cloudinary.com/v1_1/cmt/image/upload',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res) {
            App.iutoast('iusuccess', 'Logo upload successfully!', 1500);
            console.log(res);
            $('#tokenLogo').attr('src', App.corpIconTool(res.secure_url));
            App.profile.logo = res.secure_url;
            if(App.currentTokenVersion == 1){
                // test
                // App.sendTrasantionUpdateLogo();
                App.profile.website = res.secure_url;
                $('#website').val(res.secure_url);
            }
        }).fail(function(res) {
            App.iutoast('iuerror', 'Upload logo fail!', 1500);
            console.log('upload fail!')
            console.log(res);
        });
    },

    formateBalance: function (banlance, decimals) {
        var d = parseInt(decimals.toString(10));
        if(banlance.toString(10).length < parseInt(decimals.toString(10))){
            return banlance.toString();
        }
        banlance = banlance.toString(10).substring(0, banlance.toString(10).length - parseInt(decimals.toString(10)));
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

    buildLink: function (link) {
        if(link != null && link != '' && link.indexOf('.') > 0 && link.indexOf('http') < 0){
            return 'http://' + link;
        }
        return link;
    },

    // initCurrentTokenVersion: function () {
    //     if(App.contract.instance != null){
    //         App.contract.instance.version(function (error, result) {
    //             if(!error){
    //                 App.currentTokenVersion = result;
    //                 console.log('CurrentTokenVersion:');
    //                 console.log(result);
    //             }else{
    //                 console.log(error);
    //             }
    //         })
    //     }
    //
    // },

    corpIconTool: function (result) {
        var index = result.indexOf('/image/upload/') + '/image/upload/'.length;
        return result.substring(0, index) + 'w_120,h_120,r_max/' + result.substring(index);
    },

    checkWalletInstall: function () {
        if (!window.cmtwallet) {
            var alertTip = weui.alert('Please install CMT Wallet 2.0 App', {
                buttons: [{
                    label: 'ok',
                    type: 'primary',
                    onClick: function () {
                        // window.cmtwallet.closeDapp();
                        alertTip.hide();
                    }
                }]
            })
        }
    },

    testOldTokenSendUpdateProfile: function () {
        var feeData = App.contract.instance.updateProfile.getData('1', '1', '1', '1', '1');

        web3.cmt.estimateGas({data:feeData, to: App.contract.address},function (error, gas) {
            App.log('estimateGas value', gas);
            App.log('estimateGas error', error);
        })
    },

    sendTrasantionUpdateLogo: function () {
        // App.testOldTokenSendUpdateProfile();
        var feeData = App.contract.instance.setLogo.getData(App.profile.logo);
        App.iutoast('iuloading', 'Transaction processing...')
        web3.cmt.estimateGas({data:feeData, to: App.contract.address},function (error, gas) {
            var virtualGas = gas;
            if(!error){
                App.log('estimateGas value', gas);
            }else{
                App.log('estimateGas error', error);
                virtualGas = '20000000';
            }
            App.log('before send, old token logo ', App.profile.logo);
            App.contract.instance.setLogo(App.profile.logo, {gasPrice: App.gasPrice, gas: virtualGas},function (error, tx) {
                if(!error){
                    App.log('update logo tx', tx);
                    var successLogoTimer = setInterval(function () {
                        web3.cmt.getTransactionReceipt(tx, function (error, result) {
                            if(!error){
                                if(result != null && result.status == '0x1'){
                                    App.hasPaid = false;
                                    App.iutoast('iusuccess', 'Update logo successfully!', 1500);
                                    App.showProfileDetail();
                                    App.fetchProfile();
                                    clearInterval(successLogoTimer);
                                }else if(result != null && result.status == '0x0'){
                                    App.iutoast('iuerror', 'Update logo fail!', 1500);
                                    App.showProfileDetail();
                                    clearInterval(successLogoTimer);
                                }
                            }
                        })
                    }, 5000)
                }else{
                    App.handleTransationError('Update logo fail!', error);
                }
            })
        })

    },

    sendTransationUpdateWebsite: function () {
        var feeData = App.contract.instance.setWebsite.getData($('#website').val());
        web3.cmt.estimateGas({data:feeData, to: App.contract.address},function (error, gas) {
            var defaultGas = App.defaulGas;
            if(gas){
                defaultGas = gas
            }
            App.contract.instance.setWebsite(App.buildLink($('#website').val()), {gasPrice: App.gasPrice, gas: defaultGas}, function(error, tx){
                if(!error){
                    App.log('update website:' + $('#website').val() + ',tx:', tx);
                    var successUpdateTimer = setInterval(function () {
                        web3.cmt.getTransactionReceipt(tx, function (error, result) {
                            console.log(result);

                            if(!error){
                                // console.log(result.status);
                                if(result != null && result.status == '0x1'){
                                    App.hasPaid = false;
                                    App.iutoast('iusuccess', 'Update profile successfully!', 1500)
                                    App.showProfileDetail();
                                    App.fetchProfile();
                                    clearInterval(successUpdateTimer);
                                }else if(result != null && result.status == '0x0'){
                                    App.iutoast('iuerror', 'Update profile fail!', 1500);
                                    clearInterval(successUpdateTimer);
                                }
                            }
                        })
                    }, 5000)
                }else{
                    App.handleTransationError('Update website fail!', error);
                }
            })
        });

    },

    log: function (title, obj) {
        if(App.getQueryVariable('mode') == 'test1010'){
            console.log('********************* ' + title + ':start **********************');
            console.log(obj);
            console.log('********************* ' + title + ':end **********************');
        }
        if(App.getQueryVariable('mode') == 'test1111'){
            alert(title + '@@' + JSON.stringify(obj));
        }
    },

    handleTransationError: function (title, error) {
        if (error.code == '1002') {
            App.iutoast('iuerror', 'Your balance is not enough!', 1500);
        } else if (error.code == '1001') {
            App.iutoast('iuerror', 'Transaction canceled!', 1500);
        }
        App.log(title, error);
    }
    ,

    initLanguage: function () {
        if(!(!window.cmtwallet)){
            window.cmtwallet.getCurrentLanguage(function (e, language) {
                if (language == 'zh_CN') {
                    $("[data-localize]").localize("locales/application", {
                        language: "zh", callback: function(data, defaultCallback){
                            App.toastLocalizeData = data['profile-toast'];
                            defaultCallback(data);
                            // alert(JSON.stringify(data));
                        }
                    });
                }
            });
        }

    },

    iutoast: function (iutype, iutitle, delay) {
        $('[data-code="icon"]').hide();
        $('#' + iutype).show();
        var localIutitle = iutitle;
        if(App.toastLocalizeData != null && App.toastLocalizeData[iutitle] != undefined){
            localIutitle = App.toastLocalizeData[iutitle];
        }
        $('#iutitle').html(localIutitle);
        $('#iutoast').show();
        if(delay != null && delay != '' && delay != undefined){
            setTimeout(function () {
                $('#iutoast').hide();
            }, delay);
        }
    },

    endSartAnimation: function () {
        setTimeout(function () {
            $('.start-loading-mask').hide();
        }, 3000);
    },

    showOldTokenNotSupportInfo: function(){
        if(App.contract.instance != null){
            App.contract.instance.version(function (error, result) {
                if(!error && result != null){
                    //new token version from 2
                    if(parseInt(result.toString()) > 1){
                        return;
                    }
                    App.contract.instance.owner(function (error, owner) {
                        if(!error){
                            web3.cmt.getAccounts(function (error, accounts) {
                                if(!error && accounts[0].toLowerCase() == owner.toLowerCase()){
                                    $('.old-profile-support').show();

                                }
                            })
                            console.log(owner);
                        }else{
                            console.log(error);
                        }

                    })
                }

                // App.showTokenVersionDetailView();
                // test
                // App.hideOldTokenUpdateBtn();
                // App.hideOldTokenWebsiteInput();
            })


        }
    }


}

$(function() {
    $(window).load(function() {
        App.init();
        App.fetchProfile();
        App.showOldTokenNotSupportInfo();

        //test
        // App.showProfileEdit();
    });
});

