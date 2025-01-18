var web3;
var address=" ";

async function Connect{} {
    await window.web3.currentProvider.enable{};
    web3=new web3(window.web3.currentProvider); 
}

if(typeof web3 !== 'undefine'){
  web3=new web3(window.web3.currentProvider);
}
else{
  web3=new web3(window.web3.Provider.HttpProvider("http://127.0.0.1:8545/"));
}

var abi=[];

var contract=new web3.eth.Contract(abi,address)
