
/* Vider panier */

window.addEventListener("DOMContentLoaded", (event) => {
    const clearCart = document.querySelector('#clear-cart');
    const totalProductNode = document.querySelector('.total-product');

    if(null !== clearCart) {
        clearCart.addEventListener('click', function(){
            localStorage.clear();
            initCart();
            document.querySelector('#panier_Vide').hidden = false;
            document.querySelector('#cart-products').innerHTML = '';
            totalProductNode.innerHTML = 0;
        });
    }

    const carContent = document.querySelector('#cart-products');
    
    if (cart.products.length > 0) {
        document.querySelector('#panier_Vide').hidden = true;
        document.querySelector('#products').innerHTML = taillePanier();
    }

    totalPrice = 0;

    cart.products.forEach(product => {
        const productTemplate = document.querySelector('#product-cart-template');

        let div = document.createElement('div');
        article = productTemplate.innerHTML;
        article = article.replaceAll('{imageUrl}', product.imageUrl);
        article = article.replaceAll('{title}', product.name);

        div.innerHTML = article;

        carContent.appendChild(div)

        totalPrice += product.price;
    });

    totalProductNode.innerHTML = totalPrice;
});




creationPanier = () => {
    cart = JSON.parse(cart);
    if (cart.length === 0) {
      document.getElementById('panier_Vide').innerHTML = "Votre panier est vide";
    }
}

/* 
removeProductInCart(product) {
    cart.products.forEach(element => {
        console.log(element);
        
        if (product._id === element._id) {
            // supprimer
        }
    });
}

*/