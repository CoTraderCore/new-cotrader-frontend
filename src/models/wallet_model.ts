import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import Fortmatic from "fortmatic";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { makeObservable, observable } from "mobx";

class WalletStore {
  loading: boolean = false;
  account: boolean = false;
  web3: unknown;
  accounts:unknown;

  constructor() {
    makeObservable(this, {
      account: observable,
      loading: observable,
      web3: observable,
      accounts:observable,
    });
    // autorun(async () => this.web3 = await this.getweb3());
  }

  async getweb3() {
    this.loading = true;
    let providerOptions;
    let web3Modal;
    let web3;
    providerOptions = {
      authereum: {
        package: Authereum, // required
      },

      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId:
            "https://mainnet.infura.io/v3/36b6921562ec407e826fb24562a5c9db", // required
        },
      },

      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: "pk_live_7E6A277E15DE415B", // required
        },
      },
    };

    web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      disableInjectedProvider: false,
      providerOptions,
    });

    const provider = await web3Modal.connect();
    console.log(provider)
    provider.on("accountsChanged", (accounts: string[]) => {
      console.log("Account Disconnected");
      this.account = false;
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
    });

    // Subscribe to provider connection
    provider.on("connect", (info: { chainId: number }) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error: { code: number; message: string }) => {
      console.log(error);
    });

    web3 = new Web3(provider);
    this.loading = false;
    this.account = true;
    this.web3 = web3;
    return web3;
  }
}

export const walletStore = new WalletStore();
