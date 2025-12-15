let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.querySelector(".items_cart");

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

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

function renderCart() {
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `<p style="padding:20px; font-size:1.4rem; font-family:Poppins;">Your cart is empty 💔</p>`;
        document.getElementById("subtotal").textContent = "$0";
        document.getElementById("discount").textContent = "$0";
        document.getElementById("delivery").textContent = "$0";
        document.getElementById("total").textContent = "$0";
        return;
    }

    const headerRow = document.createElement("div");
    headerRow.classList.add("cart-item", "cart-header");
    headerRow.innerHTML = `
        <div id="product" style="text-align:center; font-weight:700;">Product</div>
        <div id="quantity" style="text-align:center; font-weight:700;">Quantity</div>
        <div id="total_header" style="text-align:center; font-weight:700;">Total</div>
        <div id="delete" style="text-align:center; font-weight:700;">Delete</div>
    `;
    container.appendChild(headerRow);

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const itemTotal = (item.price * item.quantity).toFixed(2);

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="Product">
            <div class="item-info">
                <p>${item.name}</p>
                <p style="font-size:1rem; opacity:0.7;">${item.size || ""}</p>
            </div>
            <div class="quantity-box">
                <button class="qty-btn" onclick="changeQty('${item.id}', 'minus')">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 'plus')">+</button>
            </div>
            <div class="item-total">$${itemTotal}</div>
            <button class="delete-btn" onclick="removeItem('${item.id}')">
                <img src="imgs/delete.png" alt="del">
            </button>
        `;
        container.appendChild(cartItem);
    });

    let discount = subtotal * 0.15;
    let delivery = subtotal > 0 ? 5 : 0;
    let total = subtotal - discount + delivery;

    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("discount").textContent = "-$" + discount.toFixed(2);
    document.getElementById("delivery").textContent = "$" + delivery.toFixed(2);
    document.getElementById("total").textContent = "$" + total.toFixed(2);
}

renderCart();

// ---- SUGGESTIONS SECTION ----
fetch("products.json")
    .then(res => res.json())
    .then(products => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);
        const suggestionsContainer = document.querySelector(".suggestions_imgs");

        randomProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product_card");
            productCard.innerHTML = `
                <div class="product_image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product_info">
                    <div class="top_row">
                        <p class="category">${product.category}</p>
                        <p class="size">${product.size}</p>
                    </div>
                    <h3 class="product_name">${product.name}</h3>
                    <div class="bottom_row">
                        <p class="price">$${product.price}</p>
                        <button class="add_to_cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            suggestionsContainer.appendChild(productCard);
        });

        suggestionsContainer.addEventListener("click", e => {
            if (e.target.classList.contains("add_to_cart")) {
                const id = parseInt(e.target.dataset.id);
                const product = products.find(p => p.id === id);
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                let existing = cart.find(item => item.id === id);

                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        size: product.size,
                        price: product.price,
                        image: product.images[0],
                        quantity: 1
                    });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        });
    });
