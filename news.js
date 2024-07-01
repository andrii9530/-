$(document).ready(function() {
    var apiKey = '7fac673397684133afbba4165aace349';
    var apiUrl = 'https://newsapi.org/v2/top-headlines';
    var country = 'ua'; 
    var category = 'general';
    var pageSize = 5; 

    var newsUrl = `${apiUrl}?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

    $.ajax({
        url: newsUrl,
        method: 'GET',
        success: function(response) {
            console.log(response);
            var newsHtml = '';
            response.articles.forEach(function(article) {
                var title = article.title;
                var description = article.description;
                var imageUrl = article.urlToImage;
                var publishedAt = new Date(article.publishedAt).toLocaleDateString();
                var sourceUrl = article.url;

                newsHtml += `
                    <div class="news-item">
                        <img src="${imageUrl}" alt="${title}">
                        <h2>${title}</h2>
                        <p>${description}</p>
                        <p>Дата публікації: ${publishedAt}</p>
                        <a class="source-link" href="${sourceUrl}" target="_blank">Деталі</a>
                    </div>
                `;
            });
            $('#newsContainer').html(newsHtml);
        },
        error: function(err) {
            console.error('Помилка отримання новин:', err);
        }
    });
});
