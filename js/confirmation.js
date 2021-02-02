window.addEventListener("DOMContentLoaded", (event) => {
    const commande = JSON.parse(localStorage.getItem("commande"));
    document.querySelector('#commande').innerHTML = commande.id;
    document.querySelector('#prix').innerHTML = commande.total;
    localStorage.clear();
})