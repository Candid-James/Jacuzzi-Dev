function initMap() {
  const dealerSearchInputs = document.querySelectorAll('input[cl-dealer-search]');
  const dealerLocations = document.querySelectorAll('[cl-dealer-location]');

  dealerSearchInputs.forEach(function (input) {
    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'us' },
      fields: ['geometry.location'],
    });

    autocomplete.addListener('place_changed', function () {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      const userLat = place.geometry.location.lat();
      const userLng = place.geometry.location.lng();
      let closestDealer = null;
      let closestDistance = Infinity;
      let url = '';

      dealerLocations.forEach(function (dealer) {
        const dealerLat = parseFloat(dealer.getAttribute('cl-dealer-latitude'));
        const dealerLng = parseFloat(dealer.getAttribute('cl-dealer-longitude'));
        const distance = getDistance(userLat, userLng, dealerLat, dealerLng);

        if (distance < closestDistance) {
          console.log('this has run');
          closestDistance = distance;
          closestDealer = dealer;
        }
        url = closestDealer.querySelector('[data-url]').getAttribute('data-url');
        window.location.href = url;
      });
    });
  });
}

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

google.maps.event.addDomListener(window, 'load', initMap);

const faqLinks = document.querySelectorAll('.split-section_item');

for (let i = 0; i < faqLinks.length; i++) {
  faqLinks[i].addEventListener('click', (e) => {
    const elementTarget = e.currentTarget;
    elementTarget.classList.toggle('is-open');
  });
}
