const apiKey = 'rT7GcUWyykHV6s1pJgyupHJ8XkmBnFwC9rK27uq4SZpYFZisvcODyu9d'; // Замініть на ваш API ключ
let currentPage = 1;

document.addEventListener('DOMContentLoaded', () => {
    fetchPhotos(currentPage);
});

function fetchPhotos(page) {
    fetch(`https://api.pexels.com/v1/search?query=nature&per_page=10&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayPhotos(data.photos);
        updatePagination(data);
    })
    .catch(error => console.error('Помилка отримання фотографій:', error));
}

function displayPhotos(photos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'gallery-item';
        photoDiv.innerHTML = `<img src="${photo.src.medium}" alt="${photo.photographer}">`;
        gallery.appendChild(photoDiv);
    });
}

function changePage(direction) {
    currentPage += direction;
    fetchPhotos(currentPage);
}

function updatePagination(data) {
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = !data.next_page;
}
