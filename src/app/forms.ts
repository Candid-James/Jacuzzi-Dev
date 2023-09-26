const salesForceURL: string =
  'https://jacuzzibrands--uat.sandbox.my.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
// const oldURL: string = 'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

// const form = document.getElementById('salesforceForm') as HTMLFormElement;

const button = document.getElementById('submitButton') as HTMLButtonElement;

button?.addEventListener('click', function (e: MouseEvent) {
  e.preventDefault();
  // Prepare the datas
  const formData: { [key: string]: string | boolean } = {
    firstName: (document.getElementById('FirstName') as HTMLInputElement)?.value ?? 'James',
    lastName: (document.getElementById('LastName') as HTMLInputElement)?.value ?? 'Battye',
    email: (document.getElementById('Email') as HTMLInputElement)?.value ?? 'test@test.com',
    tel: (document.getElementById('Phone') as HTMLInputElement)?.value ?? '07932615051',
    zipCode: (document.getElementById('PostalCode') as HTMLInputElement)?.value ?? '79120',
    country: (document.getElementById('CountryCode') as HTMLInputElement)?.value ?? 'US',
    reasonIntendedUse: (document.getElementById('Usage__c') as HTMLInputElement)?.value ?? 'Yes',
    comments:
      (document.getElementById('Trade_In_Comments__c') as HTMLInputElement)?.value ?? 'A Value',
    salesAlerts: (document.getElementById('Sale_Alert__c') as HTMLInputElement)?.checked ?? false,
    productInterest:
      (document.getElementById('Product_Name__c') as HTMLInputElement)?.value ?? 'A Value',
    contactPreference:
      (document.getElementById('Contact_Preference__c') as HTMLInputElement)?.value ?? 'A Value',
    brand_interest:
      (document.getElementById('Brand_Interest__c') as HTMLInputElement)?.value ?? 'A Value',
    Product_Family__c:
      (document.getElementById('Product_Family__c') as HTMLInputElement)?.value ?? 'A Value',
    Is_PPC: (document.getElementById('Is_PPC_Campaign__c') as HTMLInputElement)?.value ?? 'A Value',
    Language__c: (document.getElementById('Language__c') as HTMLInputElement)?.value ?? 'A Value',
    Lead_Category__c:
      (document.getElementById('Lead_Category__c') as HTMLInputElement)?.value ?? 'A Value',
    Lead_Source: (document.getElementById('LeadSource') as HTMLInputElement)?.value ?? 'A Value',
    Lead_Type__c: (document.getElementById('Lead_Type__c') as HTMLInputElement)?.value ?? 'A Value',
    Product_Type__c:
      (document.getElementById('Product_Type__c') as HTMLInputElement)?.value ?? 'A Value',
  };

  // Convert formData values to strings
  const stringifiedFormData: { [key: string]: string } = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, String(value)])
  );

  // Send the data to Salesforce
  fetch(salesForceURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(stringifiedFormData),
  })
    .then(function (response: Response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function (data: string) {
      // console.log(data);
      data;
    })
    .catch(function (error: Error) {
      console.error(error);
    });

  console.log(formData);
});
