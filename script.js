async function getWeather() {
  const city = document.getElementById('city').value;
  const apiKey = '011a783f174dc7551664428ebb8020eb'; // <-- заміни на свій ключ OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ua`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Місто не знайдено");

    const data = await response.json();
    document.getElementById('weatherResult').innerHTML = `
      <p><strong>${data.name}</strong></p>
      <p>Температура: ${data.main.temp} °C</p>
      <p>Погода: ${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById('weatherResult').innerText = error.message;
  }
}

async function checkLogin() {
  const login = document.getElementById('login').value;
  const response = await fetch(`/check?login=${encodeURIComponent(login)}`);
  const html = await response.text();
  document.getElementById('loginResult').innerHTML = html;
}
