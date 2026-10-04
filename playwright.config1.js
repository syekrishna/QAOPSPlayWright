// @ts-check
const { devices } = require('@playwright/test');
const { trace } = require('node:console');
const config = {
  testDir: './tests',
  retries:1,
  timeout: 40 *1000,
  expect: {
    timeout: 40 *1000
  },
reporter: 'html',
projects: [
    {
         name:'chrome',
   use: {
    
    browserName: 'chromium',
    headless : false,
    screenshot : 'on',
    trace : 'retain-on-failure',
     // Emulates `'prefers-colors-scheme'` media feature.
    colorScheme: 'dark',

    // Context geolocation.
    geolocation: { longitude: 12.492507, latitude: 41.889938 },

    // Emulates the user locale.
    locale: 'en-GB',

    // Grants specified permissions to the browser context.
    permissions: ['geolocation'],

    // Emulates the user timezone.
    timezoneId: 'Europe/Paris',

    
     ...devices['Desktop Chrome'],
        // It is important to define the `viewport` property after destructuring `devices`,
        // since devices also define the `viewport` for that device.
        viewport: { width: 1280, height: 720 },
        video:'retain-on-failure',

}
},
{
         name:'safari',
   use: {
    
    browserName: 'webkit',
    headless : false,
    screenshot : 'off',
    trace : 'off',
    //  ...devices['iPhone 13'],
     // video:'retain-on-failure',
    
}
},
]
};
module.exports = config