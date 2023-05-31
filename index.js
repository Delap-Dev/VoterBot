const puppeteer = require('puppeteer');

const domains = ["outlook.com", "gmail.com", "yahoo.com", "live.com", "icloud.com", "hotmail.com"];

const firstNames = [
  "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia",
  "James", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Harper", "Alexander", "Evelyn",
  "Michael", "Abigail", "Daniel", "Emily", "Matthew", "Elizabeth", "Joseph", "Sofia", "David", "Avery",
  "Jackson", "Ella", "Samuel", "Scarlett", "Sebastian", "Grace", "Carter", "Chloe", "Owen", "Victoria",
  "Wyatt", "Penelope", "Jack", "Riley", "Luke", "Lily", "Gabriel", "Zoey", "Anthony", "Layla"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris", "Clark", "Lewis", "Young", "Hall", "Walker",
  "Allen", "King", "Wright", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
  "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
  "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey"
];


const randomNum = num => Math.floor(Math.random() * num);
const generateRandomName = arr => arr[randomNum(arr.length)];
const generateRandomEmail = (firstName, lastName) => firstName.charAt(0) + lastName + '@' + domains[randomNum(domains.length)];

(async () => {
  for (let i = 0; i < 155; i++) {
    // make a new random name
    const name = {first: generateRandomName(firstNames), last: generateRandomName(lastNames)};
    
    // Launch the browser
    const browser = await puppeteer.launch({
      headless: true
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the desired URL
    await page.goto('https://woobox.com/3a7r6e');

    // Target and trigger the click event on the button with data-id="33"
    await page.evaluate(() => {
      const button = document.querySelector('button[data-id="33"]');
      button.click();
    });

    // Fill in the first name field
    await page.type('#custom_2_first', String(name.first));

    // Fill in the last name field
    await page.type('#custom_2_last', name.last);

    // Fill in the email field
    await page.type('#email_id', ()=>{generateRandomEmail(name.first, name.last)});

    // Target and trigger the click event on the submit button
    await page.evaluate(() => {
      const submitButton = document.querySelector('input[type="submit"][id="actionbutton"]');
      submitButton.click();
    });

    // Wait for a moment to observe the result
    await page.waitForTimeout(2000);

    // Close the browser
    await browser.close();
  }
})();
