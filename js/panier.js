
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

    renderProducts(cart.products);



    // Envoie requête serveur

    document.querySelector('#myForm').addEventListener('submit', function(event){

        var form_inscription = document.getElementById("myForm");
        var nom = document.getElementById("name");
        var prenom = document.getElementById("firstName");
        var email = form_inscription.elements["inputEmail"];
        var adresse = form_inscription.elements["adresse"];
        var ville = form_inscription.elements["inputCity"];
        var form_OK = true;
        var regex = /\w/ ;
        var email_Regex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;


        if(regex.exec(nom.value) == null){
            form_OK = false;
            alert('Nom Incorrect');
            event.preventDefault();
        }

        if(regex.exec(prenom.value) == null){
            form_OK = false;
            alert('Prénom Incorrect');
            event.preventDefault();
        }

        if(regex.exec(adresse.value) == null){
            form_OK = false;
            alert('Adresse Incorrecte');
            event.preventDefault();
        }

        if(email_Regex.exec(email.value) == null){
            form_OK = false;
            alert('email Incorrect');
            event.preventDefault();
        }

        if(regex.exec(ville.value) == null){
            form_OK = false;
            alert('Ville Incorrecte');
            event.preventDefault();
        }

        if(form_OK){

            event.preventDefault();
            var myForm = document.getElementById('myForm');
            formData = new FormData(myForm);
            console.log(formData.get);
            const order = {
                contact: 
                {
                    firstName: formData.get("firstName"),
                    lastName: formData.get("name"),
                    address: formData.get("adresse"),
                    city: formData.get("inputCity"),
                    email: formData.get("email")
                },
                products : []
            }
            
            cart.products.forEach(element => {
                order.products.push(element.product._id)
            });
            
            fetch('http://localhost:3000/api/teddies/order', {
                method: "post", 
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(order)
            }).then(response => {
                return response.json();
            }).then(data => {
                localStorage.setItem("commande", JSON.stringify({id: data.orderId, total: cart.totalPrice}));
                window.location.href = "confirmation.html?id=" + data.orderId + "&total=" + cart.totalPrice;
                console.log(data);
                initCart();
                nombreProduitPanier();
            });
        }
    })

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
        
        if (idArticle !== element.product._id) {
            return element;     
        }
    });
    cart.products = products;
    updateCart(cart);
}



function renderProducts(products){
    const carContent = document.querySelector('#cart-products');
    carContent.innerHTML = "";
    cart.totalPrice = 0;
    products.forEach(item => {
        const productTemplate = document.querySelector('#product-cart-template');

        let div = document.createElement('div');
        article = productTemplate.innerHTML;
        article = article.replaceAll('{imageUrl}', item.product.imageUrl);
        article = article.replaceAll('{title}', item.product.name);
        article = article.replaceAll('{id}', item.product._id);

        div.innerHTML = article;

        carContent.appendChild(div);
        console.log(item);
        cart.totalPrice += item.product.price*item.number;        
    });

    //Supprimer un produit du panier
    const clearArticleNode = document.querySelectorAll('.clear-article');
    if(null !== clearArticleNode){
        clearArticleNode.forEach(element => {
            element.addEventListener('click', function(event){
                const idArticle = event.target.attributes.getNamedItem('data-id').nodeValue;
                removeProductInCart(idArticle);
            });
        });     
    }
    const totalProductNode = document.querySelector('.total-product');
    totalProductNode.innerHTML = cart.totalPrice;
}

function updateCart(cart){
    renderProducts(cart.products);
    nombreProduitPanier();
    localStorage.setItem("cart", JSON.stringify(cart));
}
