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

async function SearchButton(){
    
    // Recupero ciò che viene inserito nel textbox
    const città = document.getElementById("città").value;
    
    // Ora che ho recuperato l'informazione, svuoto il campo
    document.getElementById("città").value = "";
    
    try{
        // Effetuo la chiamata API
        const respone = await fetch('Data.json');

        // Controllo se la risposta è andata a buon fine
        if (!respone.ok) {
            throw new Error(`Errore nella chiamata API: ${respone.status}`);
        }

        // Converto la risposta in formato JSON
        const data = await respone.json();
        
        // Controllo che città è stata inserita e comunico le informazioni
        if(città == "Milano") {
            risultato.innerHTML = `
                <h2>${data.Milano.name}</h2>
                <p><span class="icon">${data.Milano.icon}</span></p>
                <p>Temperatura: ${data.Milano.temp} °C</p>
                <p>Umidità: ${data.Milano.humidity} %</p>
                <p>Vento: ${data.Milano.wind} m/s</p>`;
        }
        else if(città == "Roma") {
            risultato.innerHTML = `
                <h2>${data.Roma.name}</h2>
                <p><span class="icon">${data.Roma.icon}</span></p>
                <p>Temperatura: ${data.Roma.temp}°C</p>
                <p>Umidità: ${data.Roma.humidity}%</p>
                <p>Vento: ${data.Roma.wind} m/s</p>`;
        }
        else if(città == "Napoli") {
            risultato.innerHTML = `
                <h2>${data.Napoli.name}</h2>
                <p><span class="icon">${data.Napoli.icon}</span></p>
                <p>Temperatura: ${data.Napoli.temp}°C</p>
                <p>Umidità: ${data.Napoli.humidity}%</p>
                <p>Vento: ${data.Napoli.wind} m/s</p>`;
        }
        else if(città == "Torino") {
            risultato.innerHTML = `
                <h2>${data.Torino.name}</h2>
                <p><span class="icon">${data.Torino.icon}</span></p>
                <p>Temperatura: ${data.Torino.temp}°C</p>
                <p>Umidità: ${data.Torino.humidity}%</p>
                <p>Vento: ${data.Torino.wind} m/s</p>`;
        }
        else if(città == "Palermo") {
            risultato.innerHTML = `
                <h2>${data.Palermo.name}</h2>
                <p><span class="icon">${data.Palermo.icon}</span></p>
                <p>Temperatura: ${data.Palermo.temp}°C</p>
                <p>Umidità: ${data.Palermo.humidity}%</p>
                <p>Vento: ${data.Palermo.wind} m/s</p>`;
        }
        else{
            risultato.innerHTML = `
                <h2>Errore</h2>
                <p class="error">La città "${città}" non è disponibile. Prova con Milano, Roma, Napoli, Torino o Palermo. Ricorda di inserire la lettera maiuscola!</p>`; 
        }
        
    }catch(error) {
        console.error('Si è verificato un errore:', error);
    }
}
// Aggiungo un evento al pulsante per caricare le attività
bottone.addEventListener('click', SearchButton);