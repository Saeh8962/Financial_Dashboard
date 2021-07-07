export interface FundInfo {
  managers: [{
    firstName: string,
    lastName: string,
    position: string
  }],
  quarters: [{
    title: string,
    details: [{
      name: string,
      value: string
    }]
  }]
}

export interface Allocation {
  category: string,
  value: number
}
export interface History {
  category: string,
  value: number
}

export interface History {
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  adj_high: string,
  adj_low: string,
  adj_close: string,
  adj_open: string,
  adj_volume: string,
  split_fact0r: string,
  symbol: string,
  exchange: string,
  date: string,
}

export interface Stock {
  symbol: string,
  currentPrice: string
}