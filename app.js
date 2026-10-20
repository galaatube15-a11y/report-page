async function loadAACACEAMap() {
    const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";

    const ready = new Promise((resolve, reject) => {
        window.initAACACEAMap = resolve;

        const script = document.createElement("script");
        script.src =
            "https://maps.googleapis.com/maps/api/js?key=" +
            encodeURIComponent(apiKey) +
            "&callback=initAACACEAMap&loading=async";

        script.onerror = reject;
        document.head.appendChild(script);
    });

    await ready;

    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    const map = new google.maps.Map(mapElement, {
        center: { lat: 8.9806, lng: 38.7578 },
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: false
    });

    let marker = null;

    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        if (marker) {
            marker.setPosition(event.latLng);
        } else {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
        }

        document.getElementById("latitude").value = lat;
        document.getElementById("longitude").value = lng;

        document.getElementById("mapMessage").textContent =
            `Location marked: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    });
}

loadAACACEAMap().catch((error) => {
    console.error("Google Maps error:", error);
    const message = document.getElementById("mapMessage");
    if (message) {
        message.textContent =
            "Map hin banamne. API key fi Maps JavaScript API ilaali.";
    }
});