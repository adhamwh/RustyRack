$(document).ready(function () {
    $.getJSON("products.json", function (products) {

        let container = $(".products_container");

        products.forEach(product => {
           let productHTML = `
    <div class="product_card">
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
                <button class="add_to_cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
`;

            container.append(productHTML);
        });
     $(document).on("click", ".add_to_cart", function () {
            let id = $(this).data("id");

            let product = products.find(p => p.id === id);

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
        });


    });
});
