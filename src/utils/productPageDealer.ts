const salesforceAPIKey = '';

fetch('https://api.ipapi.com/check?access_key=YOUR_API_KEY')
  .then((response) => response.json())
  .then((data) => {
    const { latitude } = data;
    const { longitude } = data;

    // Call the function to get dealer info
    getDealerInfo(latitude, longitude);
  })
  .catch((error) => console.log(error));

function getDealerInfo(latitude: number, longitude: number) {
  fetch(
    `https://jacuzzi.salesforce.com/services/data/vXX.X/sobjects/Dealer__c?latitude=${latitude}&longitude=${longitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + salesforceAPIKey,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // Display the dealer data on the page
      displayDealerInfo(data);
    })
    .catch((error) => console.log(error));
}

interface DealerData {
  Name: string;
  Address__c: string;
  Phone__c: string;
  Email__c: string;
}

function displayDealerInfo(dealerData: DealerData) {
  const dealerName = dealerData.Name;
  const dealerAddress = dealerData.Address__c;
  const dealerPhone = dealerData.Phone__c;
  const dealerEmail = dealerData.Email__c;

  console.log({ dealerAddress, dealerEmail, dealerName, dealerPhone });
}
