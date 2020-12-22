/* Calcul contenu panier */

let cart = localStorage.getItem('cart');

if (null === cart) {
    initCart();
} else {
    cart = JSON.parse(cart);
}

function initCart(){
    cart = {
        createdAt: new Date(),
        products: []
    };
}



function addCart(product) {
    console.log(cart.products);
    let exist = false;

    cart.products.forEach(element => {
        console.log(element);
        
        if (product._id === element._id) {
            exist = true;
        }
    });

    if (false === exist) {
        cart.products.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        nombreProduitPanier();
    }
}

/* Vider panier */

window.addEventListener("DOMContentLoaded", (event) => {
    nombreProduitPanier(); 
});


/* Affichage contenu panier dans Header */

function taillePanier() {
    return cart.products.length;
}

function nombreProduitPanier() {
    document.querySelector('#products').innerHTML = taillePanier();
}

