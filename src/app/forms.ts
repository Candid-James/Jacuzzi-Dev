const salesForceURL: string =
  'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

console.log(salesForceURL);

// const form = document.getElementById('salesforceForm') as HTMLFormElement;

const button = document.getElementById('submitButton') as HTMLButtonElement;

button?.addEventListener('click', function (e: MouseEvent) {
  e.preventDefault();
  // Prepare the datas
  const formData: { [key: string]: string | boolean } = {
    oid: (document.getElementById('oid') as HTMLInputElement)?.value ?? '00DDJ000000HOIC',
    first_name: (document.getElementById('FirstName') as HTMLInputElement)?.value ?? 'James',
    last_name: (document.getElementById('LastName') as HTMLInputElement)?.value ?? 'Battye',
    email: (document.getElementById('Email') as HTMLInputElement)?.value ?? 'test@test.com',
    tel: (document.getElementById('Phone') as HTMLInputElement)?.value ?? '07932615051',
    zip: (document.getElementById('PostalCode') as HTMLInputElement)?.value ?? '79120',
    country_code: (document.getElementById('CountryCode') as HTMLInputElement)?.value ?? 'US',
    '00NG000000EnwqP':
      (document.getElementById('Usage__c') as HTMLInputElement)?.value ?? 'Pain Relief/Therapy',
    '00NG000000FKq1w':
      (document.getElementById('Trade_In_Comments__c') as HTMLInputElement)?.value ??
      'This is a comment',
    '00NG000000FKq1q':
      (document.getElementById('Sale_Alert__c') as HTMLInputElement)?.checked ?? '1',
    '00NG000000Enwmc':
      (document.getElementById('Product_Name__c') as HTMLInputElement)?.value ?? 'Tacoma',
    '00N0f00000Fca4T':
      (document.getElementById('Contact_Preference__c') as HTMLInputElement)?.value ?? 'Phone',
    '00NG000000FKq1D':
      (document.getElementById('Brand_Interest__c') as HTMLInputElement)?.value ?? 'Sundance',
    '00N6f00000Fh7aL':
      (document.getElementById('Product_Family__c') as HTMLInputElement)?.value ?? 'BATH',
    '00NG000000FKq1d':
      (document.getElementById('Is_PPC_Campaign__c') as HTMLInputElement)?.value ?? '1',
    '00N0f00000FcUee':
      (document.getElementById('Language__c') as HTMLInputElement)?.value ?? 'Spanish',
    '00NG000000Enwmh':
      (document.getElementById('Lead_Category__c') as HTMLInputElement)?.value ?? 'Buyerzone',
    lead_source: (document.getElementById('LeadSource') as HTMLInputElement)?.value ?? 'Affiliate',
    '00NG000000EnwqK':
      (document.getElementById('Lead_Type__c') as HTMLInputElement)?.value ?? 'Campaign',
    '00NG000000FKq1o':
      (document.getElementById('Product_Type__c') as HTMLInputElement)?.value ?? 'retail-bathroom',
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

  // eslint-disable-next-line no-console
  console.log(formData);
});
