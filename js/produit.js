function addCart(item) {
    console.log(cart.products);
    let exist = false;

    cart.products.forEach(product => {
        console.log(product);
        
        if (item.product._id === product._id) {
            exist = true;
        }
    });

    if (false === exist) {
        cart.products.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        nombreProduitPanier();
    }
}

window.addEventListener("DOMContentLoaded", (event) => {

    const searchParameters = new URLSearchParams(window.location.search);

    fetch('http://localhost:3000/api/teddies/'+searchParameters.get('id'))
    .then(function(response) {
        if(response.status === 200) {
            return response.json();
        }
    })
    .then(function(data) {
        console.log(data.name);

        document.querySelector('h1').innerText = data.name;
        document.querySelector('.description').innerText = data.description;
    
        document.querySelector('#add-cart').addEventListener('click', function() {
           alert('Ajout dans le panier');
           addCart({
               "number": document.querySelector('#product-number').value ,
               "color": document.querySelector('#product-color').value, 
               "product": data
           });
   
        });
      
        var x = document.getElementById("imageOurson");
        x.setAttribute("src", data.imageUrl)
    });
});
