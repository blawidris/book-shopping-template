// ************************************************
//  Cart API
// ************************************************

let Cart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count, img, id) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.id = id;
        this.img = img;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('bookCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('bookCart'));
    }
    if (sessionStorage.getItem("bookCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    let obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count, image, prod_id) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        let item = new Item(name, price, count, image, prod_id);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (let i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCart = function (name) {
        for (let item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        let totalCount = 0;
        for (let item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.subtotalCart = function () {
        let totalCart = 0;
        for (let item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        let cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    let name = $(this).data('name');
    let price = Number($(this).data('price'));
    let qty = Number($('.num-product').val());
    let img = $(this).data('img');
    let id = Number($(this).data('prod-id'));
    Cart.addItemToCart(name, price, qty, img, id);
    displayCart();

    console.log(qty)
});

// Clear items
$('.clear-cart').click(function () {
    Cart.clearCart();
    displayCart();
});


function displayCart() {
    let cartArray = Cart.listCart();
    let output = "";
    for (let i in cartArray) {
        output += `<tr>
                        <td class="p-3">
                            <div class="d-flex align-items-center justify-content-start">
                                <div class="img-cart">
                                    <img src="${cartArray[i].img}" alt="" class="img-fluid">
                                </div>
                                <div class="cart-info">
                                    <h6>${cartArray[i].name}</h6>
                                </div>
                                <div class="remove-item d-flex justify-content-center align-items-center" data-name="${cartArray[i].name}">
                                    <i class="bi bi-x"></i>
                                </div>
                            </div>
                        </td>
                        <td class="p-3">
                            <div class="d-flex align-items-center justify-content-start">
                                <span class="price"></span>${cartArray[i].price}
                            </div>

                        </td>
                        <td class="p-3">
                            <div class="wrap-num-product d-flex ms-auto me-0">
                                <div
                                    class="btn-num-product-down hov-btn3 trans-04 justify-content-center align-items-center" data-name="${cartArray[i].name}">
                                    <i class="bi bi-dash"></i>
                                </div>
                                <input class="form-control text-center num-product" type="number"
                                    disabled name="num-product1" value="${cartArray[i].count}" data-name="${cartArray[i].name}">
                                <div
                                    class="btn-num-product-up cl8 hov-btn3 trans-04 justify-content-center align-items-center" data-name="${cartArray[i].name}">
                                    <i class="bi bi-plus"></i>
                                </div>
                            </div>
                        </td>
                        <td class="p-3">
                            <div class="d-flex align-items-center justify-content-start">
                                <span class="price"></span> ${cartArray[i].total}
                            </div>
                        </td>
                    </tr>`;
    }
    $('.show-cart').html(output);
    $('.subtotal-cart').html(Cart.subtotalCart());
    $('.total-count').html(Cart.totalCount());
}



// Delete item button

$('.show-cart').on("click", '.remove-item', function (event) {
    let name = $(this).data('name')
    Cart.removeItemFromCart(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".btn-num-product-down", function (event) {
    let name = $(this).data('name')
    Cart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".btn-num-product-up", function (event) {
    let name = $(this).data('name')
    Cart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    let name = $(this).data('name');
    let count = Number($(this).val());
    Cart.setCountForItem(name, count);
    displayCart();
});

displayCart();
