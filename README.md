# Inventory Order Tracking API

A comprehensive backend API for managing kakanin (Filipino Rice Cakes) inventory and customer orders. Built with Express.js, TypeScript, and Firebase.

## Features

- **Product Management**: Create, read, update, and delete kakanin products with inventory tracking
- **Order Management**: Process customer orders with real-time inventory updates
- **Role-Based Access Control**: Manager, Employee, and Customer roles with granular permissions
- **Order Status Tracking**: Track orders through multiple lifecycle stages (Pending, Confirmed, Ready for Pickup, Completed, Cancelled)
- **Authentication**: Firebase-based JWT authentication
- **API Documentation**: Comprehensive Swagger/OpenAPI documentation

## Technologies

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Authentication**: Firebase Admin SDK
- **Database**: Firebase Firestore (configured)
- **API Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet, CORS

## Project Structure

```
src/
├── api/v1/
│   ├── controllers/          # Business logic for routes
│   ├── middleware/           # Authentication, authorization, validation, logging
│   ├── models/               # TypeScript interfaces and types
│   ├── repositories/         # Data access layer
│   ├── routes/               # API endpoint definitions
│   ├── services/             # Business service logic
│   ├── utils/                # Utility functions
│   └── validation/           # Request validation schemas
├── config/                   # Configuration files
│   ├── corsConfig.ts
│   ├── firebaseConfig.ts
│   ├── helmetConfig.ts
│   ├── scheduler.ts
│   ├── swagger.ts
│   └── swaggerOptions.ts
├── constants/                # Application constants
├── logs/                     # Log files
├── app.ts                    # Express app initialization
└── server.ts                 # Server entry point
```

## API Endpoints

### Products (`/api/v1/kakanin`)

- `GET /` - Get all products
- `GET /:id` - Get product by ID
- `POST /` - Create new product (Manager/Employee)
- `PUT /:id` - Update product (Manager/Employee)
- `DELETE /:id` - Delete product (Manager)

### Orders (`/api/v1/orders`)

- `GET /` - Get all orders
- `GET /:orderNumber` - Get order by order number
- `POST /` - Create new order (Manager/Employee/Customer)
- `PUT /:orderNumber` - Update order (Manager/Employee)
- `DELETE /:orderNumber` - Delete order

### Manager (`/api/v1/orders/manager`)

- `POST /setClaims` - Set user custom claims/roles (Manager)

### Health Check

- `GET /api/v1/health` - Server health status

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm
- Firebase project credentials

### Setup Steps

1. **Clone the repository**

```bash
git clone <repository-url>
cd BED-Final-Project-Inventory-Order-Tracking-API
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

4. **Add Firebase service key**
   Place your Firebase service account key at `src/config/serviceKey.json`

## Running the Application

### Development

```bash
npm start
```

## API Documentation

Once the server is running, access the Swagger UI:

```
http://localhost:3000/api-docs
```

The documentation includes:

- All endpoint specifications
- Request/response schemas
- Authentication requirements
- Example requests and responses

## Authentication

The API uses Firebase Authentication with JWT tokens:

1. **Obtain a token**: Authenticate with Firebase
2. **Send token**: Include in Authorization header

```
Authorization: Bearer <firebase-jwt-token>
```

## User Roles

- **Manager**: Full access to all endpoints
- **Employee**: Can create/update products and orders
- **Customer**: Can create and view their own orders

## Data Models

### Product

```typescript
{
  productId: string;
  name: string;
  currentStock: number;
  lowStockThreshold: number;
  isActive: boolean;
}
```

### Order

```typescript
{
  orderNumber: string;
  customerName: string;
  customerPhoneNumber: string;
  platterSize: 12 | 36 | 50 | 75 | 100;
  items: OrderItem[];
  pickupDate: string;
  pickupTime: string;
  status: "Pending" | "Confirmed" | "Ready for Pickup" | "Completed" | "Cancelled";
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Validation

All requests are validated using schema validation. Validation errors return a 400 Bad Request with detailed error messages.

## Error Handling

All API errors follow a standard response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

**Last Updated**: April 19, 2026
