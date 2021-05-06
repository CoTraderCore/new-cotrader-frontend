import Web3 from "web3";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { makeObservable, observable } from "mobx";
import isMobile from '../utils/isMobile'
import { fromWei, toBN } from 'web3-utils'
import BigNumber from 'bignumber.js'

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



class MOBXStorage {
  web3 = null
  account = null
  SmartFunds = []
  SmartFundsOriginal = []
  SmartFundsCurrentPage = []
  FilterActive = false
  FilterInfo = ''
  TotalValue = 0
  TotalProfit = 0
  HistoryTotalProfit = 0
  userTotalValue = 0
  userTotalProfit = 0
  userHistoryTotalProfit = 0
  filterOptions = null

  // Initializers
  initWeb3AndAccounts(_web3: any, accounts: any){
    this.web3 = _web3
    this.account = accounts
  }

  initSFList(_newList: any) {
    const initPageNumber = (isMobile()) ? 5 : 10

    this.SmartFundsOriginal = this.sortSFByValue(_newList)
    this.SmartFundsCurrentPage = this.sortSFByValue(_newList).slice(0, initPageNumber)
    this.SmartFunds = this.sortSFByValue(_newList).slice(0, initPageNumber)

    const { totalValue, totalProfit, historyTotalProfit } = this.calculateValueAndProfit(this.SmartFundsOriginal)
    this.TotalValue = totalValue as number
    this.TotalProfit = totalProfit as number
    this.HistoryTotalProfit = historyTotalProfit as number
  }

  // Update fund list with custom data
  // updateSmartFundsListByFilter(smartFunds, filterOptions, filterKeys){
  //   const keys = filterKeys.join(',')
  //   this.FilterActive = true
  //   this.FilterInfo = `Filter funds by ${keys}`
  //   this.SmartFunds = smartFunds
  //   this.filterOptions = filterOptions
  // }

  // Filters
  sortSFByValue(smartFunds: any){
    const sorted = smartFunds.slice().sort(function (a:any, b:any) {
    return a.profitInETH - b.profitInETH;
    })
    return sorted.reverse()
  }


  // myFunds(owner){
  //   this.SmartFunds = this.SmartFundsOriginal.filter(fund => fund.owner.toLowerCase().includes(owner.toLowerCase()))
  //   this.FilterActive = true
  //   this.FilterInfo = "Filter funds by owner: " + owner.slice(0,-35) + "..."

  //   const { totalValue, totalProfit, historyTotalProfit } = this.calculateValueAndProfit(this.SmartFunds)
  //   this.userTotalValue = totalValue
  //   this.userTotalProfit = totalProfit
  //   this.userHistoryTotalProfit = historyTotalProfit
  // }

  // myInvestments(address){
  //   this.SmartFunds = this.SmartFundsOriginal.filter(fund => fund.shares && fund.shares.includes(address))
  //   this.FilterActive = true
  //   this.FilterInfo = "Filter funds by investor: " + address.slice(0,-35) + "..."

  //   const { totalValue, totalProfit, historyTotalProfit } = this.calculateValueAndProfit(this.SmartFunds)
  //   this.userTotalValue = totalValue
  //   this.userTotalProfit = totalProfit
  //   this.userHistoryTotalProfit = historyTotalProfit
  // }

  // reset filters
  // AllFunds(){
  //   this.SmartFunds = this.SmartFundsCurrentPage
  //   this.FilterActive = false
  //   this.FilterInfo = ""
  //   this.filterOptions = null
  // }

  // pagination
  // paginationChange(_smartFunds) {
  //   this.SmartFunds = _smartFunds
  //   this.SmartFundsCurrentPage = _smartFunds
  // }

  // internal helper
  calculateValueAndProfit(SmartFunds: any){
    if(SmartFunds.length > 0){
      const reducer = (accumulator: any, currentValue: any) =>new BigNumber(accumulator).plus(currentValue)
      // get value
      const value = SmartFunds.map((fund: { valueInUSD: string | import("bn.js"); }) => Number(fromWei(fund.valueInUSD)))
      const totalValue = Number(value.reduce(reducer)).toFixed(2)

      // get profit
      const profit = SmartFunds.map((fund: { profitInUSD: BigNumber.Value; }) => {
        if(fund.profitInUSD > 0){
          try{
            return fromWei(toBN(new BigNumber(fund.profitInUSD) as any))
          }catch(e){
            console.log("Error, can't convert fund.profitInUSD error ", e)
            return 0
          }
        }else{
          return 0
        }
      })
      const totalProfit = Number(profit.reduce(reducer)).toFixed(2)

      // get history profit
      const historyProfit = SmartFunds.map((fund: { historyProfitInUSD: number; }) => {
        if(fund.historyProfitInUSD > 0){
          try{
            return fromWei(String(fund.historyProfitInUSD))
          }catch(e){
            console.log("Error, can't convert fund.historyProfitInUSD error ", e)
            return 0
          }
        }else{
          return 0
        }
      })

      const historyTotalProfit = Number(historyProfit.reduce(reducer)).toFixed(2)

      return { totalValue, totalProfit, historyTotalProfit }
    }
    else{
      return { totalValue:0, totalProfit:0, historyTotalProfit:0 }
    }
  }
}

export const walletStore = new WalletStore();
export const mobxStorage = new MOBXStorage();