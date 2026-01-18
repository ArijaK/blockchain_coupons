// // Test POST and GET requests

// function delay(ms: number) {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// }

// async function read_response(res: Response) {
//   const text = await res.text();
//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// }

// async function send_request(method: string, url: string, body?: any) {
//   const options: RequestInit = {
//     method,
//     headers: { "Content-Type": "application/json" }
//   };

//   if (body) {
//     options.body = JSON.stringify(body);
//   }

//   const res = await fetch(url, options);
//   const data = await read_response(res);

//   return { status: res.status, data };
// }

// async function main() {
//   const base = "http://localhost:8000";

//   console.log("\nGrant issuer rights to user (USER=0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
//   const issuer = await send_request(
//     "POST", `${base}/blockchain/issuer-add`,
//     {
//       account: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
//     }
//   );
//   console.log("Add issuer response: ", issuer);
//   await delay(1000); // NOTE: Because otherwise the calls are too fast for blockchain

//   console.log("\nCreating new coupons (USER=0x70997970c51812dc3a010c7d01b50e0d17dc79c8)");
//   const mint = await send_request(
//     "POST", `${base}/blockchain/mint`,
//     { 
//       to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
//       amount: 10
//     }
//   );
//   console.log("Mint response: ", mint);
//   await delay(1000);  // NOTE: Because otherwise the calls are too fast for blockchain

//   console.log("\nFetching all user created coupons (USER=0x70997970c51812dc3a010c7d01b50e0d17dc79c8)");
//   const created_coupons = await send_request(
//     "GET",
//     `${base}/coupons/user/created/0x70997970c51812dc3a010c7d01b50e0d17dc79c8`
//   );
//   console.log("Coupons: ", created_coupons);

//   console.log("\nTransferring coupons (FROM=0x70997970c51812dc3a010c7d01b50e0d17dc79c8, TO=0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc)");
//   const trans = await send_request(
//     "POST", `${base}/blockchain/transfer`,
//     {
//       "from": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
//       "to": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
//       "id": "1",
//       "amount": 5
//     }
//   );
//   console.log("Transfer response: ", trans);
//   await delay(1000);  // NOTE: Because otherwise the calls are too fast for blockchain

//   console.log("\nFetching all user coupons (USER=0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc)");
//   const coupons = await send_request(
//     "GET",
//     `${base}/coupons/user/0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc`
//   );
//   console.log("Coupons: ", coupons);

//   console.log("\nFetching single coupon (ID=0)");
//   const coupon = await send_request("GET", `${base}/coupons/0`);
//   console.log("Coupon: ", coupon);

//   console.log("\nRedeeming a coupon (ID=1)");
//   const redemption = await send_request(
//     "POST", `${base}/blockchain/redeem`,
//     {
//       coupon_id: 1,
//       from: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc"
//     }
//   );
//   console.log("Redemption response: ", redemption);
// }

// main().catch(err => {
//   console.error("Unexpected error:", err);
// });
