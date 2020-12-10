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
           addCart(data);
   
        });
      
        var x = document.getElementById("imageOurson");
        x.setAttribute("src", data.imageUrl)
    });
});
