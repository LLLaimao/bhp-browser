
import axios from 'axios'

const IP = "https://expapi.bhpa.io"
// const IP = "http://47.103.46.191:8700/service-web"

export function index() {
    return axios.get(IP + "/index")
}

export function search(keyword) {
    return axios.get(IP + "/search", { params: { keyword, } })
}

export function txDetails(txid) {
    return axios.get(IP + "/txDetails", { params: { txid, } })
}

export function txScript(txid) {
    return axios.get(IP + "/txScript", { params: { txid, } })
}


export function blocks(current, endKey, size, startKey, toPage) {
    return axios.post(IP + "/blocks", { current, endKey, size, startKey, toPage, })
}

export function transactions(current, endKey, size, startKey, toPage) {
    return axios.post(IP + "/transactions", { current, endKey, size, startKey, toPage, })

}

export function txAttributes(txid) {
    return axios.get(IP + "/txAttributes", { params: { txid, } })
}

export function address(current, size) {
    return axios.post(IP + "/getAddresses", { current, size, })
}

export function getAddressBalance(address) {
    return axios.get(IP + "/getAddressBalance", { params: { address, } })
}

export function getTransactionByAddress(current, size, searchKey,filter) {
    return axios.post(IP + "/getTransactionByAddress", { current, size, searchKey,filter, })
}

export function asset(current, size) {
    return axios.post(IP + "/asset", { current, size, })
}

export function getAssetById(asset) {
    return axios.get(IP + "/getAssetById", { params: { asset, } })
}

export function getTxTransfersByBlock(blockHeight, current, size) {
    return axios.get(IP + "/getTxTransfersByBlock", { params: { blockHeight, current, size, } })
}

export function topAddress(current, size, searchKey) {
    return axios.post(IP + "/topAddress", { current, size, searchKey, })
}

export function getTxDetailByScript(txid) {
    return axios.get(IP + "/getTxDetailByScript", { params: { txid, } })
}

export function getContracts(current, size) {
    return axios.post(IP + "/getContracts", { current, size, })
}

export function decrypt(params) {
    return axios.post(IP + "/decrypt", params)
}