let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.querySelector(".items_cart");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItem(id) {
    cart = cart.filter(item => item.id != id);
    saveCart();
    renderCart();
}

function changeQty(id, direction) {
    cart = cart.map(item => {
        if (item.id == id) {
            if (direction === "plus") {
                item.quantity++;
            } else if (direction === "minus" && item.quantity > 1) {
                item.quantity--;
            }
        }
        return item;
    });

    saveCart();
    renderCart();
}

function renderCart() {
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <p style="padding:20px; font-size:1.4rem; font-family:Poppins;">
                Your cart is empty 
            </p>`;
        updateSummary(0);
        return;
    }

    // HEADER
    const headerRow = document.createElement("div");
    headerRow.className = "cart-item cart-header";
    headerRow.innerHTML = `
        <div id="product">Product</div>
        <div id="quantity">Quantity</div>
        <div id="total_header">Total</div>
        <div id="delete">Delete</div>
    `;
    container.appendChild(headerRow);

    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}">
            <div class="item-info">
                <p>${item.name}</p>
                <p style="font-size:1rem; opacity:0.7;">${item.size || ""}</p>
            </div>

            <div class="quantity-box">
                <button class="qty-btn" onclick="changeQty('${item.id}','minus')">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}','plus')">+</button>
            </div>

            <div class="item-total">$${itemTotal.toFixed(2)}</div>

            <button class="delete-btn" onclick="removeItem('${item.id}')">
                <img src="imgs/delete.png">
            </button>
        `;
        container.appendChild(cartItem);
    });

    updateSummary(subtotal);
}

function updateSummary(subtotal) {
    const discount = subtotal * 0.15;
    const delivery = subtotal > 0 ? 5 : 0;
    const total = subtotal - discount + delivery;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("discount").textContent = `-$${discount.toFixed(2)}`;
    document.getElementById("delivery").textContent = `$${delivery.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

renderCart();

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
    const modal = document.getElementById("paymentModal");
const payBtn = document.querySelector(".pay-btn");
const closeBtn = document.querySelector(".modal .close");

// Open modal on button click
payBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default link
    modal.style.display = "block";
});

// Close modal when clicking X
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal if clicking outside content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

