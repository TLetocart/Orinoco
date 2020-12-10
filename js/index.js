window.addEventListener("DOMContentLoaded", (event) => {
    fetch('http://localhost:3000/api/teddies')
    .then(function(response) {
        if(response.status === 200) {
            return response.json();
        }
    })
    .then(function(data) {

        const articles = document.querySelector('#articles');
        const articleTemplate = document.querySelector('#article-template');
        console.log(articleTemplate);

       data.forEach(element => {
           console.log(element);
           let div = document.createElement('div');
           div.className = 'col-md-4';

        article = articleTemplate.innerHTML;
        article = article.replaceAll('article-template', 'article-' + element._id)
        article = article.replaceAll('{titre}', element.name);
        article = article.replaceAll('{description}', element.description);
        article = article.replaceAll('{url}', 'produit.html?id=' + element._id);
        article = article.replaceAll('{imageUrl}', element.imageUrl);

        div.innerHTML = article;
        articles.appendChild(div);

       }); 
    });
});
