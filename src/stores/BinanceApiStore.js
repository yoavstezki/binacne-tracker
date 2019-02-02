import { action, computed, observable } from 'mobx';
import hmacSHA256 from 'crypto-js/hmac-sha256';

export default class BinanceApiStore {

    constructor(apiKeysStore) {
        this.apiKeysStore = apiKeysStore;
    }

    @observable apiKeysStore = null;
    @observable balances = [];
    @observable oldBalances = [];
    @observable tickers = [];

    @computed get tickersMap() {
        return this.tickers.reduce((acc, item) => {
                acc[item.symbol] = (Number(item.askPrice) + Number(item.bidPrice)) / 2
                return acc
            }
            , {})
    }

    symbolPriceInBtc(symbol, amount) {
        if (symbol === 'BTC') {
            return amount
        }
        const priceInBtc = this.tickersMap[`${ symbol }BTC`] || 1 / (this.tickersMap[`BTC${ symbol }`])
        return (priceInBtc * amount).toFixed(8)
    }

    btcPriceInUsdt(amount) {
        return (amount * this.tickersMap[`BTCUSDT`]).toFixed(2)
    }


    @computed get computedBalances() {
        if (!this.balances || !this.tickers) {
            return
        }
        const that = this;
        return this.balances && this.balances
            .filter(item => Number(item.free) > 0)
            .map(item => {
                item.btcPrice = that.symbolPriceInBtc(item.asset, Number(item.free));
                item.usdPrice = that.btcPriceInUsdt(item.btcPrice);
                return item
            })
    }

    @action
    async loadBookTickers() {
        const data = await fetch('https://api.binance.com/api/v3/ticker/bookTicker')
            .then(res => res.json())
            .catch(err => console.log(err))
        if (data.msg) {
            throw data.msg;
        }
        this.tickers = data;
    }


    @action
    async loadAccountData() {
        const timestamp = Date.now()
        const signature = hmacSHA256('timestamp=' + timestamp, this.apiKeysStore.apiSecret)
        const myHeaders = {'X-MBX-APIKEY': this.apiKeysStore.apiKey}
        const data = await fetch('https://api.binance.com/api/v3/account?timestamp=' + timestamp + '&signature=' + signature,
            {headers: myHeaders})
            .then(res => res.json())
            .catch(err => console.log(err))
        // console.log(JSON.stringify(data));
        if (-2014 == data.code) {
            throw data.msg
        } else {
            this.balances = data.balances;

            console.log('balances', data.balances)
        }
    }

}
