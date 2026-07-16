console.log("Loading RequestToken...");
import Hashids from "hashids";

const hashids = new Hashids("realwebapp", 16);

export class RequestToken {
  static generate(): string {
    return hashids.encode(Date.now());
  }
}
console.log("RequestToken module loaded"); 