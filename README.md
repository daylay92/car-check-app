# car-check-app
A backend app that facilitates an e-commerce car shop, a consisting of micro-services built with NestJs and GRPC.

## Features

- Users can sign up.
- User can sign in.
- Admin can add a car.
- A car typically has a make, model, features, price, location and vin.
- A User can topup his/her wallet.
- User with a sufficient wallet balance can purchase a car.
- User gets notified via email 5 minutes after a successful car purchase.


## Getting Started

To get a copy of this project up and running on your local machine for testing and development, you would need to have **docker** installed.

### Prerequisites

You must have

1. Docker
2. GIT bash

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```
$ git clone -b develop https://github.com/daylay92/car-check-app.git
$ cd car-check-app
```

Create a `.env` file in the root directory and add the environment variables described in the .env.sample file. Below are the most relevant environment variables:

- `SENDGRID_API_KEY` - Sendgrid API key for sending dynamic email notification.
- `SENDGRID_EMAIL` - Sendgrid email (single sender verification).

## Starting the application
To start the all the microservices and the gateway service, run the following:

```bash
docker-compose up --build
```


## Technologies

- Node JS
- NestJs
- MongoDB
- Typescript
- Docker

## API

The API is currently in version 1 (v1) and can be found at [Base URL](http://localhost:3000). Please note that the app must be running on your local machine before you can interact with the APIs.

## API Documentation

Once the applications are running, You can find the documentation here [API DOCS](http://localhost:3000/api)
For best results, I recommend testing via the API DOCS


## Handy Credential
Since only admins can create a car and view all purchases, I have added an admin credential below for testing:

```
email : admin@carcheck.com
password : admin01
```

*N.B* : The credential has been seeded into the user's db so that you can interact with Admin specific features out of the box.

## Author

- **Ayodele Akinbohun**
