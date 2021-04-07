# Spotted
This application was created to help connect car enthusiasts from around the world.
As a car enthusiast myself, I found it difficult to find local car meets.

## Preview
<div align="center">
  <img src="https://github.com/meekoder/spotted/blob/master/readme_assets/landing.png?raw=true" height="450">
</div>
<div align="center">
  <img src="https://github.com/meekoder/spotted/blob/master/readme_assets/signup.png?raw=true" height="200">
  <img src="https://github.com/meekoder/spotted/blob/master/readme_assets/login.png?raw=true" height="200">
  <img src="https://github.com/meekoder/spotted/blob/master/readme_assets/2FA.png?raw=true" height="200">
</div>
<div align="center">
  <img src="https://github.com/meekoder/spotted/blob/master/readme_assets/home.png?raw=true" height="450">
</div>

## Features

- New users are able to sign up for an account and existing users can login with their credentials
- After logging in, users will be greeted with a 2FA page while a security code is sent to the phone number that was used to sign up
- App includes interfaces for viewing profiles, photos of posted vehicles, locations of car meets, and listings of cars from the Marketplace
- Photos are able to be commented on or liked
- Users are able to post their own photos, car meet locations, or put a vehicle up for sale
- Users are able to livestream to their followers using their webcam
- In Account Settings, the user's information can be updated

## Tech/Frameworks Used ##
__Built with__
- React
- Node.js
- PostgreSQL
- Material UI
- Express

__Other technologies used__
- Twilio API
- Passport.js
- Amazon IVS
- Amazon S3

## Run the Project Locally ##

1. Clone the project locally
2. Run ```npm start``` in the command line
3. Navigate to the backend directory and run ```node server.js``` to start the server
4. Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view/use the application
