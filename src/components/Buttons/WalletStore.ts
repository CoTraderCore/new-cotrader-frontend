import Web3 from "web3";
import Web3Modal from "web3modal";

import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { makeObservable, observable } from "mobx";


class WalletStore {
  loading: boolean = false;
  account: boolean = false;
  web3: any;
  web3Modal:any;
  accounts: any;
  balance: any;
  constructor() {
    makeObservable(this, {
      account: observable,
      loading: observable,
      web3: observable,
      accounts: observable,
      balance: observable,
      web3Modal:observable
    });
    // autorun(async () => this.web3 = await this.getweb3());
  }

  async getweb3() {
    this.loading = true;
    let providerOptions;
    // let web3Modal: Web3Modal;
    let web3: unknown;
    providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "https://data-seed-prebsc-1-s1.binance.org:8545/", // required
        },
      },

      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: "pk_live_7E6A277E15DE415B", // required
        },
      },

      portis: {
        package: Portis, // required
        options: {
          id: "ae694217-1169-413a-95d4-9798f161a265", // required
        },
      },
    };

    this.web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
      disableInjectedProvider: false,
      providerOptions,
    });

    const provider = await this.web3Modal.connect();
    web3 = new Web3(provider);
    this.loading = false;
    this.account = true;
    this.web3 = web3;

    if (provider.on) {
      provider.on("accountsChanged", (accounts: string[]) => {
        console.log("Account Disconnected");
        this.web3Modal.clearCachedProvider();
        this.account = false;
      });

      // Subscribe to chainId change
      provider.on("chainChanged", async (chainId: number) => {
        if (this.web3) {
          const balance = await this.web3.eth.getBalance(this.accounts[0]);
          this.balance = parseFloat(
            this.web3.utils.fromWei(balance.toString())
          ).toFixed(4);
          console.log(this.balance);
        }

        console.log(chainId);
      });

      // Subscribe to provider connection

      provider.on("connect", (info: { chainId: number }) => {
        console.log(info);
      });

      // Subscribe to provider disconnection
      provider.on("disconnect", (error: { code: number; message: string }) => {
        this.web3Modal.clearCachedProvider();

        console.log(error);
      });  
    }

    return web3;
  }
}




export const walletStore = new WalletStore();