import { useEffect, useState } from 'react';
import React, { Component }  from 'react';
import { logAccountConnectedEvent, logCustomEvent } from 'arena-tools'
import './App.css';

const ARENA_TOKEN = "c987oaicduis3eoiolx1ac"

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  })
  const button1Click = () => {
    if (walletAddress != null) {
      logCustomEvent(ARENA_TOKEN, walletAddress, 'button 1');
    }
  };
  const button2Click = () => {
    if (walletAddress != null) {
      logCustomEvent(ARENA_TOKEN, walletAddress, 'button 2');
    }
  };
  const connectWallet = async () => {
    if (typeof window != `undefined` && typeof window.ethereum != `undefined`) {
      try {
        // Metamask installed
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        console.log(walletAddress);
        logAccountConnectedEvent(ARENA_TOKEN, accounts[0]);

      } catch(err) {
        console.error(err.message);
      }
    } else {
      // metamask not installed
      console.log("Please install MetaMask");
    }
  };
  const getCurrentWallet = async () => {
    if (typeof window != `undefined` && typeof window.ethereum != `undefined`) {
      try {
        // Metamask installed
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log(walletAddress);
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect again");
        }
      } catch(err) {
        console.error(err.message);
      }
    } else {
      // metamask not installed
      console.log("Please install MetaMask");
    }
  };
  const addWalletListener = async () => {
    if (typeof window != `undefined` && typeof window.ethereum != `undefined`) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0]);
      })
    } else {
      setWalletAddress(null);
      console.log("Please install MetaMask");
    }
  };
  return (
    <div className="App">
      <h2>This is a test app for trying out Arena Tools </h2>
      <button className="button connect-wallet" onClick={connectWallet}>
        <span className="is-link has-text-weight-bold">
          {walletAddress
            ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
            : "Connect wallet"}
        </span>
      </button>
      <br/>
      <button className="button button1" onClick={(button1Click)}>Button 1</button>
      <br/>
      <button className="button button2" onClick={button2Click}>Button 2</button>
    </div>
  );
}

export default App;
