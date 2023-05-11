// Login display

const myAccount = document.querySelector("#my-account");
const login = document.querySelector("#login-display");
const closeLogin = document.querySelector("#close-login");

myAccount.addEventListener("click", () => {
  login.classList.add("visible");
})

closeLogin.addEventListener("click", () => {
  login.classList.remove("visible");
});

const select = document.getElementById("locations-selector");
let map;
let marker;

select.addEventListener("change", () => {
    let newLocation;
    if(select.selectedIndex === 0) {
        newLocation = new google.maps.LatLng(40.3807649, -3.6488823);
    } else if (select.selectedIndex === 1) {
        newLocation = new google.maps.LatLng(40.3863894, -3.6694257);
    } else if (select.selectedIndex === 2) {
        newLocation = new google.maps.LatLng(40.431356, -3.627063);
    } else {
        console.log("ERROR");
    };

    map.panTo(newLocation);
    marker.setPosition(newLocation);
});

function iniciarMap() {
    let coord = {lat: 40.3807649 ,lng: -3.6488823};
    map = new google.maps.Map(document.getElementById("map"),{
        zoom: 15,
        center: coord   
    });
    marker = new google.maps.Marker({
        position: coord,
        map: map
    });
};