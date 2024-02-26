document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('speichernBudget').addEventListener('click', budgetSpeichern);
    document.getElementById('speichernAusgaben').addEventListener('click', ausgabenSpeichern);
    document.getElementById('resetButton').addEventListener('click', resetAlles);
});

let gesamtbudget = 0;
let ausgabenNachKategorie = {};

//Budget Speichern
function budgetSpeichern() {
    const budget = parseFloat(document.getElementById('budget-input').value);
    if (!isNaN(budget)) {
        gesamtbudget += budget;
        document.getElementById('gesamtbudget').innerText = gesamtbudget.toFixed(2);
        document.getElementById('budget-input').value = '';
    }
}

//Ausgaben Speichern
function ausgabenSpeichern() {
    const betrag = parseFloat(document.getElementById('ausgaben-input').value);
    const kategorie = document.getElementById('kategorie').value;
    if (!isNaN(betrag)) {
        gesamtbudget -= betrag;
        document.getElementById('gesamtbudget').innerText = gesamtbudget.toFixed(2);
        
        if (ausgabenNachKategorie[kategorie]) {
            ausgabenNachKategorie[kategorie] += betrag;
        } else {
            ausgabenNachKategorie[kategorie] = betrag;
        }
        
        aktualisiereAusgabenTabelle();
        document.getElementById('ausgaben-input').value = '';
    }
}

//Tabelle aktualisieren
function aktualisiereAusgabenTabelle() {
    const tabelle = document.getElementById('ausgaben-tabelle').getElementsByTagName('tbody')[0];
    tabelle.innerHTML = '';

    for (const [kategorie, betrag] of Object.entries(ausgabenNachKategorie)) {
        const zeile = tabelle.insertRow();
        const zelle1 = zeile.insertCell(0);
        const zelle2 = zeile.insertCell(1);
        zelle1.innerText = betrag.toFixed(2) + '€';
        zelle2.innerText = kategorie;
    }
}

//Alles zurücksetzen
function resetAlles() {
    gesamtbudget = 0;
    ausgabenNachKategorie = {};
    document.getElementById('gesamtbudget').innerText = '0';
    document.getElementById('budget-input').value = '';
    document.getElementById('ausgaben-input').value = '';
    aktualisiereAusgabenTabelle();
}
