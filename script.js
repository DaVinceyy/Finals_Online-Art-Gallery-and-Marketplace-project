// ===== Image Modal =====
function openImage(img) {
    document.getElementById("imageModal").style.display = "flex";
    document.getElementById("modalImg").src = img.src;
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

// ===== Filter Artworks =====
function filterArt(category) {
    let artworks = document.querySelectorAll(".art-box");
    artworks.forEach(art => {
        if (category === "all") {
            art.style.display = "block";
        } else if (art.classList.contains(category)) {
            art.style.display = "block";
        } else {
            art.style.display = "none";
        }
    });
}

// ===== Search Artworks =====
function searchArt() {
    let input = document.getElementById("searchArt").value.toLowerCase();
    let artBoxes = document.querySelectorAll(".art-box");

    artBoxes.forEach(box => {
        let text = box.innerText.toLowerCase();
        box.style.display = text.includes(input) ? "block" : "none";
    });
}

// ===== Dark Mode =====
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// ===== Like Button =====
function likeArt(button) {
    button.classList.toggle("liked");
    button.innerText = button.classList.contains("liked") ? "❤️ Liked" : "❤️ Like";
}

// ===== Shopping Cart with LocalStorage, Quantity & Remove =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

// Add to Cart
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateCart();
}

// Save Cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Display
function updateCart() {
    let cartList = document.getElementById("cartItems");
    if (!cartList) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} - ₱${item.price.toLocaleString()}</span>
            <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${index}, this.value)">
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        cartList.appendChild(li);
    });

    document.getElementById("cartTotal").innerText = total.toLocaleString();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

// Change Quantity
function changeQuantity(index, value) {
    value = parseInt(value);
    if (value < 1) value = 1;
    cart[index].quantity = value;
    saveCart();
    updateCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Checkout successful! (Demo only)");
    cart = [];
    saveCart();
    updateCart();
}
