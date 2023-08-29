const salesForceURL: string =
  'https://jacuzzibrands--uat.sandbox.my.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
// const oldURL: string = 'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

// const form = document.getElementById('salesforceForm') as HTMLFormElement;

const button = document.getElementById('submitButton') as HTMLButtonElement;

button?.addEventListener('click', function (e: MouseEvent) {
  e.preventDefault();
  // Prepare the datas
  const formData: { [key: string]: string | boolean } = {
    firstName: (document.getElementById('FirstName') as HTMLInputElement)?.value ?? 'null',
    lastName: (document.getElementById('LastName') as HTMLInputElement)?.value ?? 'null',
    email: (document.getElementById('Email') as HTMLInputElement)?.value ?? 'null',
    tel: (document.getElementById('Phone') as HTMLInputElement)?.value ?? 'null',
    zipCode: (document.getElementById('PostalCode') as HTMLInputElement)?.value ?? 'null',
    country: (document.getElementById('CountryCode') as HTMLInputElement)?.value ?? 'null',
    reasonIntendedUse: (document.getElementById('Usage__c') as HTMLInputElement)?.value ?? 'null',
    comments:
      (document.getElementById('Trade_In_Comments__c') as HTMLInputElement)?.value ?? 'null',
    salesAlerts: (document.getElementById('Sale_Alert__c') as HTMLInputElement)?.checked ?? false,
    productInterest:
      (document.getElementById('Product_Name__c') as HTMLInputElement)?.value ?? 'null',
    contactPreference:
      (document.getElementById('Contact_Preference__c') as HTMLInputElement)?.value ?? 'null',
    brand_interest:
      (document.getElementById('Brand_Interest__c') as HTMLInputElement)?.value ?? 'null',
    Product_Family__c:
      (document.getElementById('Product_Family__c') as HTMLInputElement)?.value ?? 'null',
    Is_PPC: (document.getElementById('Is_PPC_Campaign__c') as HTMLInputElement)?.value ?? 'null',
    Language__c: (document.getElementById('Language__c') as HTMLInputElement)?.value ?? 'null',
    Lead_Category__c:
      (document.getElementById('Lead_Category__c') as HTMLInputElement)?.value ?? 'null',
    Lead_Source: (document.getElementById('LeadSource') as HTMLInputElement)?.value ?? 'null',
    Lead_Type__c: (document.getElementById('Lead_Type__c') as HTMLInputElement)?.value ?? 'null',
    Product_Type__c:
      (document.getElementById('Product_Type__c') as HTMLInputElement)?.value ?? 'null',
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
      data
    })
    .catch(function (error: Error) {
      console.error(error);
    });

  // console.log(formData);
});
