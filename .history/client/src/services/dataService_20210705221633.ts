import { info } from "../data/info";
import { allocation } from "../data/allocation";
import { performance } from "../data/performance";
import { positions } from "../data/positions";
import { Allocation, History} from "../data/models";

function getRandomDelay() {
  // return 0;
  return 500 + (Math.random() * 2000);
  // return 9999999999;
}

export function getFundInfo(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(info);
    }, getRandomDelay());
  })
}

export function getFundAllocation(): Promise<Allocation[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allocation);
    }, getRandomDelay());
  });
}

export function getHistory(stockHistory: History[] | PromiseLike<History[]>): Promise<History[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stockHistory);
    }, getRandomDelay());
  });
}

export function getPerformance(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(performance);
    }, getRandomDelay());
  })
}

export function getPositions(): Promise<Position[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(positions);
    }, getRandomDelay());
  });
}

