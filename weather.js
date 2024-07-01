$(document).ready(function() {
    var apiKey = '449fad821e844c5b8c1135110243006';
    var apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
    var location = 'Rivne';
    var days = 3;
    var forecastUrl = `${apiUrl}?key=${apiKey}&q=${location}&days=${days}`;

    $.ajax({
        url: forecastUrl,
        method: 'GET',
        success: function(response) {
            console.log(response);
            var weatherHtml = '';
            for (var i = 0; i < response.forecast.forecastday.length; i++) {
                var forecast = response.forecast.forecastday[i];
                var date = forecast.date;
                var iconUrl = forecast.day.condition.icon;
                var tempC = forecast.day.avgtemp_c;
                var pressureMb = forecast.day.avgvis_km;
                var windKph = forecast.day.maxwind_kph;
                var precipitationMm = forecast.day.totalprecip_mm;
                
                weatherHtml += `
                    <div class="weather-item" >
                        <h2>Погода на ${date}</h2>
                        <img src="${iconUrl}" alt="Погодні умови">
                        <p>Температура: ${tempC} °C</p>
                        <p>Тиск: ${pressureMb} мб</p>
                        <p>Втер: ${windKph} км/год</p>
                        <p>Опади: ${precipitationMm} мм</p>
                    </div>
                `;
            }
            $('#weatherRivne').html(weatherHtml);
        },
        error: function(err) {
            console.error('Помилка отримання погоди:', err);
        }
    });
});
