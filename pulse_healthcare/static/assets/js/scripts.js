
function filterProducts() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const productGrid = document.getElementById('productGrid');
  const products = productGrid.getElementsByClassName('col');

  Array.from(products).forEach(product => {
    const productName = product.querySelector('.inner p').innerText.toLowerCase();
    if (productName.includes(searchInput)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
        function initMap() {
          const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 14,
          });
    
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
    
                map.setCenter(pos);
    
                const userMarker = new google.maps.Marker({
                  position: pos,
                  map: map,
                  title: "You are here",
                });
    
                const infoWindow = new google.maps.InfoWindow({
                  content: "<p>You are here</p>",
                });
    
                userMarker.addListener("click", () => {
                  infoWindow.open(map, userMarker);
                });
    
                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch(
                  {
                    location: pos,
                    radius: 5000,
                    type: ["pharmacy"],
                  },
                  (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                      displayPharmacies(results);
                    }
                  }
                );
    
                function createMarker(place) {
                  new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                  });
                }
    
                function displayPharmacies(places) {
                  const list = document.getElementById("pharmacy-list");
                  const notFound = document.getElementById("not-found");
                  list.innerHTML = '';
                  notFound.style.display = 'none';
    
                  places.forEach(place => {
                    createMarker(place);
                    getPlaceDetails(place);
                  });
    
                  function getPlaceDetails(place) {
                    const service = new google.maps.places.PlacesService(map);
                    service.getDetails({ placeId: place.place_id }, (details, status) => {
                      if (status === google.maps.places.PlacesServiceStatus.OK) {
                        const pharmacy = document.createElement("div");
                        pharmacy.className = "col";
                        pharmacy.ontouchstart = function () {
                          this.classList.toggle('hover');
                        };
    
                        const container = document.createElement("div");
                        container.className = "container";
    
                        const front = document.createElement("div");
                        front.className = "front";
                        front.onclick = function() {
                          window.location.href = `https://www.google.com/maps?q=${details.geometry.location.lat()},${details.geometry.location.lng()}`;
                        };
    
                        const innerFront = document.createElement("div");
                        innerFront.className = "inner";
    
                        const frontP = document.createElement("p");
                        frontP.textContent = details.name;
    
                        if (details.photos && details.photos.length > 0) {
                          front.style.backgroundImage = `url(${details.photos[0].getUrl()})`;
                        } else {
                          front.style.backgroundColor = 'black';
                          frontP.style.color = 'white';
                        }
    
                        innerFront.appendChild(frontP);
                        front.appendChild(innerFront);
    
                        const back = document.createElement("div");
                        back.className = "back";
    
                        const innerBack = document.createElement("div");
                        innerBack.className = "inner";
    
                        const backP = document.createElement("p");
                        backP.textContent = details.name;
    
                        const backSpan = document.createElement("span");
                        backSpan.textContent = details.formatted_address;
    
                        const phoneP = document.createElement("p");
                        phoneP.textContent = details.formatted_phone_number || "No contact available";
    
                        const mapLink = document.createElement("a");
                        mapLink.href = `https://www.google.com/maps?q=${details.geometry.location.lat()},${details.geometry.location.lng()}`;
                        mapLink.textContent = "View on Google Maps";
                        mapLink.target = "_blank";
    
                        innerBack.appendChild(backP);
                        innerBack.appendChild(backSpan);
                        innerBack.appendChild(phoneP);
                        innerBack.appendChild(mapLink);
                        back.appendChild(innerBack);
    
                        container.appendChild(front);
                        container.appendChild(back);
                        pharmacy.appendChild(container);
                        list.appendChild(pharmacy);
                      }
                    });
                  }
                }
              },
              () => {
                handleLocationError(true, map.getCenter());
              }
            );
          } else {
            handleLocationError(false, map.getCenter());
          }
    
          function handleLocationError(browserHasGeolocation, pos) {
            console.log(
              browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
            );
          }
    
          document.getElementById("search-button").addEventListener("click", () => {
            const query = document.getElementById("search-input").value.toLowerCase();
            const pharmacyCards = document.querySelectorAll("#pharmacy-list .col");
            let found = false;
    
            pharmacyCards.forEach(card => {
              const name = card.querySelector(".front .inner p").textContent.toLowerCase();
              if (name.includes(query)) {
                card.style.display = "block";
                found = true;
              } else {
                card.style.display = "none";
              }
            });
    
            const notFound = document.getElementById("not-found");
            if (found) {
              notFound.style.display = "none";
            } else {
              notFound.style.display = "block";
            }
          });
        }
    
        window.onload = initMap;
  