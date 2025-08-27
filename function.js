let currentDate = new Date();
let selectCity = document.getElementById("ville").value;

function updateDate() {
    const day = {weekday: 'long'};
    const dd = {day: 'numeric' };
    const mm = {month: 'long'};
    const yy = {year: 'numeric'};

    document.getElementById("day").innerHTML = currentDate.toLocaleDateString('fr-FR',day)
    document.getElementById("Dd").innerText = currentDate.toLocaleDateString('fr-FR', dd);
    document.getElementById("Mm").innerText = currentDate.toLocaleDateString('fr-FR', mm);
    document.getElementById("Yy").innerText = currentDate.toLocaleDateString('fr-FR', yy);
}

function prevDay() {
    currentDate.setDate(currentDate.getDate() - 1);
    updateDate();
    getAdhan();
}

function nextDay() {
    currentDate.setDate(currentDate.getDate() + 1);
    updateDate();
    getAdhan();
}

function getAdhan(){

    let dd = String(currentDate.getDate()).padStart(2, '0');
    let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    let yy = currentDate.getFullYear();
    let date = `${dd}-${mm}-${yy}`;

        axios.get(`https://api.aladhan.com/v1/timingsByCity/${date}?country=DZ&city=${selectCity}`)
            .then((response) =>{
                let prayer = response.data.data.timings;
                document.getElementById("fajr-time").innerHTML = prayer.Fajr;
                document.getElementById("shorouq-time").innerHTML = prayer.Sunrise;
                document.getElementById("dhuhr-time").innerHTML = prayer.Dhuhr;
                document.getElementById("asr-time").innerHTML = prayer.Asr;
                document.getElementById("maghrib-time").innerHTML = prayer.Maghrib;
                document.getElementById("isha-time").innerHTML = prayer.Isha;
            })
            .catch(err => alert.error("Erreur API :", err));
}

document.getElementById("ville").addEventListener("change", e => {
    selectCity = e.target.value;
    getAdhan();
});

// Afficher au chargement
updateDate();
getAdhan();