let cart = JSON.parse(localStorage.getItem("cart")) || [];
let container = document.querySelector(".items_cart");

// ------------------------------------------------------------
// REMOVE ITEM
// ------------------------------------------------------------
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ------------------------------------------------------------
// CHANGE QUANTITY
// ------------------------------------------------------------
function changeQty(id, direction) {
    cart = cart.map(item => {
        if (item.id === id) {
            if (direction === "plus") item.quantity++;
            if (direction === "minus" && item.quantity > 1) item.quantity--;
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ------------------------------------------------------------
// MAIN RENDER FUNCTION
// ------------------------------------------------------------
function renderCart() {
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <p style="padding:20px; font-size:1.4rem; font-family:Poppins;">
                Your cart is empty 💔
            </p>
        `;
        document.getElementById("subtotal").textContent = "$0";
        document.getElementById("discount").textContent = "$0";
        document.getElementById("delivery").textContent = "$0";
        document.getElementById("total").textContent = "$0";
        return;
    }

    // --- HEADER ROW (plain text, no box) ---
    const headerRow = document.createElement("div");
    headerRow.classList.add("cart-item", "cart-header");
    headerRow.innerHTML = `
        <div style="text-align:center; font-weight:700;">Product</div>
        
        <div style="text-align:center; font-weight:700;">Quantity</div>
        <div style="text-align:center; font-weight:700;">Total</div>
        <div style="text-align:center; font-weight:700;">Delete</div>
    `;
    container.appendChild(headerRow);

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemTotal = (item.price * item.quantity).toFixed(2);

        container.innerHTML += `
        <div class="cart-item">

            <!-- PRODUCT IMAGE -->
            <img src="${item.image}" alt="Product">

            <!-- PRODUCT NAME + SIZE -->
            <div class="item-info">
                <p>${item.name}</p>
                <p style="font-size:1rem; opacity:0.7;">${item.size || ""}</p>
            </div>

            <!-- QUANTITY BUTTONS -->
            <div class="quantity-box">
                <button class="qty-btn" onclick="changeQty('${item.id}', 'minus')">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 'plus')">+</button>
            </div>

            <!-- ITEM TOTAL PRICE -->
            <div class="item-total">
                $${itemTotal}
            </div>

            <!-- DELETE BUTTON -->
            <button class="delete-btn" onclick="removeItem('${item.id}')">
                <img src="imgs/delete.png" alt="del">
            </button>

        </div>
        `;
    });

    // SUMMARY CALCULATIONS
    let discount = subtotal * 0.15;
    let delivery = subtotal > 0 ? 5 : 0;
    let total = subtotal - discount + delivery;

    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("discount").textContent = "-$" + discount.toFixed(2);
    document.getElementById("delivery").textContent = "$" + delivery.toFixed(2);
    document.getElementById("total").textContent = "$" + total.toFixed(2);
}

// INITIAL RENDER
renderCart();
