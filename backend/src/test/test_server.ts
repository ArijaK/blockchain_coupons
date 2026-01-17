// Test POST and GET requests

async function read_response(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function send_request(method: string, url: string, body?: any) {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  const data = await read_response(res);

  return { status: res.status, data };
}

async function main() {
  const base = "http://localhost:8000";

  console.log("\nFetching all user coupons (USER=0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc)");
  const coupons = await send_request(
    "GET",
    `${base}/coupons/user/0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc`
  );
  console.log("Coupons: ", coupons);

  // TODO: There won't be any, since I did not mint any
  console.log("\nFetching single coupon (ID=0)");
  const coupon = await send_request("GET", `${base}/coupons/0`);
  console.log("Coupon: ", coupon);
}

main().catch(err => {
  console.error("Unexpected error:", err);
});


/// Generated examples on how to do POST calls
//   console.log("=== Minting a book ===");
//   const mint = await call("POST", `${base}/actions/mint`, {
//     to: "0x1234567890abcdef1234567890abcdef12345678",
//     amount: 1
//   });
//   console.log("Mint response:", mint);


//   console.log("\n=== Testing destroy (example: ID 1) ===");
//   const destroy = await call("POST", `${base}/actions/destroy`, {
//     bookId: 1,
//     from: "0x1234567890abcdef1234567890abcdef12345678"
//   });
//   console.log("Destroy response:", destroy);
