// Funzione per recuperare la data odierna da inserire nel footer
function getCurrentDate() {
    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const update = today.toLocaleDateString('it-IT', options);
    document.getElementById('current-date').textContent = `🕒 ${update}`;
}

// Aggiorna una volta all'avvio
getCurrentDate();

// Aggiornamento ogni minuto
setInterval(getCurrentDate, 60000);

// Adesso costruisco la funzione per il bottone di ricerca
    
// Recupero il bottone di ricerca
const bottone = document.getElementById("search-button");

// Recupero il div dove andrò a stampare i risultati
const risultato = document.getElementById("risultato");

async function SearchButton() {
    const città = document.getElementById("città").value.trim();
    document.getElementById("città").value = "";

    // Inserisci qui la tua API key personale di OpenWeatherMap
    const apiKey = "d9b020928afa578e1aba2077af133535";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(città)}&appid=${apiKey}&units=metric&lang=it`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Errore nella chiamata API: ${response.status}`);
        }

        const data = await response.json();

        risultato.innerHTML = `
            <h2>${data.name}</h2>
            <p><span class="icon"><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon"></span></p>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Umidità: ${data.main.humidity}%</p>
            <p>Vento: ${data.wind.speed} m/s</p>
            <p>Condizione: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        risultato.innerHTML = `
            <h2>Errore</h2>
            <p class="error">La città "${città}" non è disponibile o si è verificato un errore.<br>Prova a scrivere correttamente il nome della città.</p>
        `;
        console.error('Si è verificato un errore:', error);
    }
}

// Aggiungo un evento al pulsante per caricare le attività
bottone.addEventListener('click', SearchButton);
