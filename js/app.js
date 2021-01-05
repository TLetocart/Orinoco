/* Calcul contenu panier */

let cart = localStorage.getItem('cart');

if (null === cart) {
    initCart();
} else {
    cart = JSON.parse(cart);
}

function initCart(){
    cart = {
        totalPrice : 0,
        createdAt: new Date(),
        products: []
    };
}


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

