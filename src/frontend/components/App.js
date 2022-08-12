import './App.css';
import logo from './logo.png';
import EnsNameAbi from '../contractsData/EnsName.json'
import EnsNameAddress from '../contractsData/EnsName-address.json'
import ensAbi from './ENSContract.json'
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { ethers } from 'ethers';
import ListItem from './ListItem';
import { Route, Routes } from 'react-router-dom';
import BuyEns from './BuyEns';

const App = () => {

  

  
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marketplace, setMarketplace] = useState('');
  const [ENSContract, setENSContract] = useState('');
  

  const ENSContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";

  useEffect(() => {
    checkIfWalletIsConnected();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await checkIfWalletIsConnected();
      window.location.reload();
    })
  }, []);

  


  const checkIfWalletIsConnected = async () => {
    try {
      setLoading(true)
      if (!window.ethereum) {
        alert('No Web3 Provider Detected. Kindly Install Metamask');
      } else {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length !== 0) {
          setAccount(accounts[0]);
          loadContracts();
        } else {
          console.log('Please Connect Your Wallet');
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('No Web3 Provider Detected. Kindly Install Metamask');
      } else {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        loadContracts();
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  //loading contracts
  const loadContracts = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const mp = new ethers.Contract(
        EnsNameAddress.address,
        EnsNameAbi.abi,
        signer
      );
      setMarketplace(mp);
      const ensCont = new ethers.Contract(ENSContractAddress, ensAbi.abi, signer);
      setENSContract(ensCont);

      // console.log(await signer.provider.getCode(marketplace))

      console.log('Contracts Loaded!');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };


  return (
    <div>
      <Navbar logo={logo} connectWallet={connectWallet} account={account} loading={loading}/>
      <div className='px-4 py-5 my-5'>
      <Routes>
      <Route path='/' element={<ListItem EnsNameAddress={EnsNameAddress} marketplace={marketplace} ENSContract={ENSContract} account={account}/>}></Route>
      <Route path='/buyens' element={<BuyEns  marketplace={marketplace} ENSContract={ENSContract} account={account}/>}></Route>
      </Routes>
      
      </div>
    </div>
  );
};

export default App;
