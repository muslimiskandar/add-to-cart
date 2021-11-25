//Deyishenler (variables)
var carts = document.querySelectorAll('.add-to-cart');
var desc = document.querySelectorAll('.desc');

let products = [
    {
        name: 'Blue Hoodie',
        tag: 'bluehoodie',
        price: 20,
        inCart: 0
    },
    {
        name: 'Brown T-shirt',
        tag: 'browntshirt',
        price: 40,
        inCart: 0
    },
    {
        name: 'Jeans Trousers',
        tag: 'jeanstrousers',
        price: 30,
        inCart: 0
    },
    {
        name: 'Adidas Shoes',
        tag: 'adidasshoes',
        price: 60,
        inCart: 0
    }
]

//Her click üçün loop
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });    
}

//Sehife refresh olunan zaman cart saygacini oldugu kimi saxlayir
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if ( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

//Cart saygaci, her defe yeni mehsul elave olunanda artir
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

//Mehsullarin localstorage-a yerleshdirilmesi
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if ( cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

//Umumi meblegin gosterilmesi
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

//Cart səhifəsində göstərmək
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');

    if( cartItems && productContainer ) {
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-line">
            <div class="product">
                <img src="./Images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                     Subtotal:
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            </div>
        `
    }
}


displayCart();
onLoadCartNumbers();