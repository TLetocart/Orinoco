
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
            totalProductNode.innerHTML = "";
            nombreProduitPanier();
        });
    }

    document.querySelector('#clear-cart').hidden = true; 
    
    if (cart.products.length > 0) {
        document.querySelector('#panier_Vide').hidden = true;
        document.querySelector('#products').innerHTML = taillePanier();
        document.querySelector('#clear-cart').hidden = false; 
        
    }

    totalPrice = 0;

    renderProducts(cart.products);

    
    totalProductNode.innerHTML = totalPrice;

    if (cart.products.length === 0) {
        totalProductNode.innerHTML = "";
    }

});

creationPanier = () => {
    cart = JSON.parse(cart);
    if (cart.length === 0) {
      document.getElementById('panier_Vide').innerHTML = "Votre panier est vide";
    }
}

/* Supprimer un article du panier */

function removeProductInCart(idArticle) {
    const products = cart.products.filter(element => {
        console.log(element);
        
        if (idArticle !== element._id) {
            return element;     
        }
    });
    cart.products = products;
    updateCart(cart);
}



function renderProducts(products){
    const carContent = document.querySelector('#cart-products');
    carContent.innerHTML = "";
    products.forEach(product => {
        const productTemplate = document.querySelector('#product-cart-template');

        let div = document.createElement('div');
        article = productTemplate.innerHTML;
        article = article.replaceAll('{imageUrl}', product.imageUrl);
        article = article.replaceAll('{title}', product.name);
        article = article.replaceAll('{id}', product._id);

        div.innerHTML = article;

        carContent.appendChild(div);

        totalPrice += product.price;
    });

    const clearArticleNode = document.querySelectorAll('.clear-article');
    if(null !== clearArticleNode){
        clearArticleNode.forEach(element => {
            element.addEventListener('click', function(event){
                const idArticle = event.target.attributes.getNamedItem('data-id').nodeValue;
                removeProductInCart(idArticle);
                nombreProduitPanier();
                updateCart();
                document.querySelector('#total-products').innerHTML = cart.products;
            });
        });     
    }
}

function updateCart(cart){
    renderProducts(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
}
