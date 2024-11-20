
# KwikSend - Digital Remittance Service

KwikSend is a digital remittance platform that allows users to send money from PayPal to local mobile operators like EcoCash and MoMo in Zimbabwe. This repository contains the complete system, including the frontend (built with Flutter) and backend (built with NestJS).

## Table of Contents
- [Project Overview](#project-overview)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
  - [API Documentation](#api-documentation)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Automated Testing](#automated-testing)
- [License](#license)

## Project Overview

KwikSend enables users to:
- Send money from PayPal to local mobile wallets (EcoCash, MoMo).
- Track transfers in real-time.
- Manage user accounts, balances, and transfer history.

### Components

1. **Frontend**: Built with **Flutter** for mobile apps.
2. **Backend**: Built with **NestJS**, handling authentication, user management, and transaction services.
3. **Database**: MongoDB (or your chosen database).
4. **Payment Integration**: Integrates PayPal API for payments.

---

## Frontend Setup (Flutter)

### Prerequisites

- **Flutter**: v3.0 or higher.
- **Android Studio** / **VS Code** with Flutter and Dart plugins installed.

### Installation

Clone the repository:

```bash
git clone [Kwiksend](https://github.com/anesu398/kwiksend.git)
cd kwiksend
```

Install dependencies:

```bash
flutter pub get
```

### Configuration

Create a `.env` file in the root of the Flutter project and add your environment variables (e.g., API URLs, credentials).

Example:

```
API_URL=http://localhost:3000/api/v1
```

### Running the Frontend

To run the Flutter app:

```bash
flutter run
```

---

## Backend Setup (NestJS)

### Prerequisites

- **Node.js**: v16+ or higher.
- **npm**: v7+.
- **MongoDB** (or preferred database).

### Installation

Clone the repository:

```bash
git clone https://github.com/anesu398/kwiksend-api.git
cd kwiksend-api
```

Install dependencies:

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory of the NestJS project and configure environment variables:

```
PORT=3000
DB_URI=mongodb://localhost:27017/kwiksend
JWT_SECRET=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Running the Backend

To run the backend server:

```bash
npm run start
```

The backend API will be available at `http://localhost:3000`.

---

## API Documentation

### POST /api/v1/transfer

**Description**: Create a new transfer request.

- **Request Body**:
  ```json
  {
    "amount": 100,
    "paymentMethod": "bank",
    "deliveryMethod": "mobile-wallet"
  }
  ```
- **Response**:
  ```json
  {
    "id": "unique_transfer_id",
    "amount": 100,
    "paymentMethod": "bank",
    "deliveryMethod": "mobile-wallet",
    "status": "pending"
  }
  ```

### GET /api/v1/transfer/{id}

**Description**: Retrieve a transfer by its ID.

- **URL Params**: 
  - `id` (required): The unique transfer ID.
  
- **Response**:
  ```json
  {
    "id": "unique_transfer_id",
    "amount": 100,
    "paymentMethod": "bank",
    "deliveryMethod": "mobile-wallet",
    "status": "pending"
  }
  ```

### PUT /api/v1/transfer/{id}

**Description**: Update a transfer by its ID.

- **URL Params**: 
  - `id` (required): The unique transfer ID.

- **Request Body**:
  ```json
  {
    "amount": 150,
    "paymentMethod": "mobile-wallet",
    "deliveryMethod": "bank"
  }
  ```

- **Response**:
  ```json
  {
    "id": "unique_transfer_id",
    "amount": 150,
    "paymentMethod": "mobile-wallet",
    "deliveryMethod": "bank",
    "status": "updated"
  }
  ```

### DELETE /api/v1/transfer/{id}

**Description**: Delete a transfer by its ID.

- **URL Params**: 
  - `id` (required): The unique transfer ID.

- **Response**:
  ```json
  {
    "message": "Transfer deleted successfully"
  }
  ```

---

## Testing

### Manual Testing

You can test the API manually using tools like **Postman** or **Insomnia**.

#### POST Request (Create Transfer)

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/v1/transfer`
- **Body**:
  ```json
  {
    "amount": 100,
    "paymentMethod": "bank",
    "deliveryMethod": "mobile-wallet"
  }
  ```

#### GET Request (Retrieve Transfer by ID)

- **Method**: `GET`
- **URL**: `http://localhost:3000/api/v1/transfer/{id}`

#### PUT Request (Update Transfer)

- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/v1/transfer/{id}`
- **Body**:
  ```json
  {
    "amount": 150,
    "paymentMethod": "mobile-wallet",
    "deliveryMethod": "bank"
  }
  ```

#### DELETE Request (Delete Transfer by ID)

- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/v1/transfer/{id}`

### Automated Testing

To run automated tests, we recommend using **Supertest** and **Jest**.

1. **Install Testing Dependencies**:
   ```bash
   npm install --save-dev jest supertest
   ```

2. **Run Tests**:
   ```bash
   npx jest
   ```

Test examples are defined in `transfer.test.js`.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
