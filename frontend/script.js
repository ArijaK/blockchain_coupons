// TODO:
// 1) Šis ļauj taisīt frontend (urā)
// 2) Vēlāk, lai nebūtu "Dummy function", jāizdomā, vai mums ir
//      JS -> Solidity
//      JS -> Python (api server small) -> Solidity
///////////////////////////////////////////////////////////////////////


// Show only one of views simultaneously
function showView(viewId, button) {
    // hide all views
    const views = document.querySelectorAll("#views > div");
    views.forEach(v => v.style.display = "none");

    // show selected view
    document.getElementById(viewId).style.display = "block";

    // remove active class from all buttons
    const buttons = document.querySelectorAll("#navigation button");
    buttons.forEach(b => b.classList.remove("active"));

    // add active to clicked button
    button.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mint_shortcut").onclick = function () { showView("mint_view", this); };
    document.getElementById("show_shortcut").onclick = function () { showView("show_view", this); };
    document.getElementById("profile_shortcut").onclick = function () { showView("profile_view", this); };

    const input = document.getElementById("redeemer_input");
    const list = document.getElementById("redeemer_list");
    const addBtn = document.getElementById("add_redeemer_btn");

    let values = [];

    addBtn.addEventListener("click", addValue);

    function addValue() {
        const value = input.value.trim();
        if (!value || values.includes(value)) return;

        values.push(value);

        const tag = document.createElement("div");
        tag.className = "tag";
        tag.textContent = value;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "×";
        remove.addEventListener("click", () => {
            values = values.filter(v => v !== value);
            tag.remove();
        });

        tag.appendChild(remove);
        list.appendChild(tag);

        input.value = "";
        input.focus();
    }

    window.getRedeemers = () => values;
});





//////////////////////////////////////////////////////////////////////
// const logDiv = document.getElementById("log");

// // Dummy function to simulate "create coupon"
// function createCoupon() {
//     const couponId = Math.floor(Math.random() * 1000);
//     logDiv.innerHTML += `<p>Coupon created with ID: ${couponId}</p>`;
//     return couponId;
// }

// // Dummy function to simulate "mint coupon"
// function mintCoupon(couponId, amount) {
//     logDiv.innerHTML += `<p>Minted ${amount} of coupon ${couponId}</p>`;
// }

// // Connect buttons to dummy functions
// document.getElementById("createCouponBtn").onclick = () => {
//     window.currentCoupon = createCoupon();
// };

// document.getElementById("mintCouponBtn").onclick = () => {
//     if (!window.currentCoupon) {
//         alert("Create a coupon first!");
//         return;
//     }
//     mintCoupon(window.currentCoupon, 10);
// };
