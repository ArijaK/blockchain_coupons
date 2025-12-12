// TODO:
// 1) Šis ļauj taisīt frontend (urā)
// 2) Vēlāk, lai nebūtu "Dummy function", jāizdomā, vai mums ir
//      JS -> Solidity
//      JS -> Python (api server small) -> Solidity  

const logDiv = document.getElementById("log");

// Dummy function to simulate "create coupon"
function createCoupon() {
    const couponId = Math.floor(Math.random() * 1000);
    logDiv.innerHTML += `<p>Coupon created with ID: ${couponId}</p>`;
    return couponId;
}

// Dummy function to simulate "mint coupon"
function mintCoupon(couponId, amount) {
    logDiv.innerHTML += `<p>Minted ${amount} of coupon ${couponId}</p>`;
}

// Connect buttons to dummy functions
document.getElementById("createCouponBtn").onclick = () => {
    window.currentCoupon = createCoupon();
};

document.getElementById("mintCouponBtn").onclick = () => {
    if (!window.currentCoupon) {
        alert("Create a coupon first!");
        return;
    }
    mintCoupon(window.currentCoupon, 10);
};
