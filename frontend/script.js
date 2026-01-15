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

function show_coupons(container_id, issued_coupons) {
    const container = document.getElementById(container_id);
    if (!container) return;

    container.innerHTML = ""; // clear existing

    if (issued_coupons.length == 0) { // show "no coupons"
        const div = document.createElement("div");
        div.className = "not_any_issued_coupon_div";
        div.textContent = "No coupons issued yet";
        container.appendChild(div);
    }
    issued_coupons.forEach(coupon => { // show retrieved coupons
        // whole wrapper        
        const wrapper = document.createElement("div");
        wrapper.className = "display_coupon_div";

        // left 1st line
        const first_line = document.createElement("div");
        first_line.className = "line_in_wrapper";

        const name = document.createElement("span");
        name.innerHTML = `<b>Name:</b> ${coupon.name}`;
        const date = document.createElement("span");
        date.innerHTML = `<b>Date:</b> ${coupon.date_from}  -  ${coupon.date_to}`;

        // left 2nd line
        const second_line = document.createElement("div");
        second_line.className = "line_in_wrapper";
        second_line.className = "line_in_wrapper counts";

        const count = document.createElement("span");
        count.innerHTML = `<b>Total count:</b> ${coupon.total_count}`;
        const redeemed = document.createElement("span");
        redeemed.innerHTML = `<b>Redeemed count:</b> ${coupon.redeemed_count}`;
        const not_issued = document.createElement("span");
        not_issued.innerHTML = `<b>Not issued count:</b> ${coupon.not_issued_count}`;
        const expand_view = document.createElement("button");
        expand_view.className = "button";
        expand_view.appendChild(document.createTextNode("See more")); // TODO: this button does nothing, but should open view

        // append left
        first_line.appendChild(name);
        first_line.appendChild(date);

        // append right
        second_line.appendChild(count);
        second_line.appendChild(redeemed);
        second_line.appendChild(not_issued);
        second_line.appendChild(expand_view);

        // append all
        wrapper.appendChild(first_line);
        wrapper.appendChild(second_line);

        container.appendChild(wrapper);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mint_shortcut").onclick = function () { showView("mint_view", this); };
    document.getElementById("show_shortcut").onclick = function () { showView("show_view", this); };
    document.getElementById("profile_shortcut").onclick = function () { showView("profile_view", this); };

    ///////////////////////// TODO: replace with info from backend / blockchain  (because need to know usage) about coupons that this person has
    const fake_data = [{
        name: "fake_data_November Campaign 2025",
        date_from: "2026-01-01",
        date_to: "2026-01-15",
        total_count: 100,
        redeemed_count: 50,
        not_issued_count: 40
    },
    {
        name: "fake_data_December Promo",
        date_from: "2026-01-20",
        date_to: "2026-01-31",
        total_count: 20000,
        redeemed_count: 100,
        not_issued_count: 50
    }];
    // fake_data = []

    show_coupons("show_view", fake_data);
    /////////////////////////

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
