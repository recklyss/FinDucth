# API Design Document for FinDucth

## Base URL
```
https://api.splitsmart.com/v1
```

## Authentication
- All API endpoints require authentication using JWT tokens
- Token must be included in the Authorization header: `Authorization: Bearer <token>`
- Tokens expire after 24 hours

## Endpoints

### Authentication

#### POST /auth/register
Creates a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "preferredCurrency": "USD"
}
```

**Response: (201 Created)**
```json
{
  "userId": "u123456",
  "name": "John Doe",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "preferredCurrency": "USD"
}
```

#### POST /auth/login
Authenticates a user and returns a JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response: (200 OK)**
```json
{
  "userId": "u123456",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "preferredCurrency": "USD"
}
```

#### POST /auth/refresh
Refreshes an existing JWT token

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response: (200 OK)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Command Processing

#### POST /commands/process
Processes a command from the chat interface

**Request Body:**
```json
{
  "command": "/record I paid 2000 JPY for dinner with @Alice and @Bob in #TokyoTrip",
  "timezone": "Asia/Tokyo"
}
```

**Response: (200 OK)**
```json
{
  "responseType": "EXPENSE_RECORDED",
  "message": "Expense recorded! Each person owes you 666.67 JPY.",
  "expenseId": "e789012",
  "expenseDetails": {
    "amount": 2000,
    "currency": "JPY",
    "description": "dinner",
    "paidBy": "u123456",
    "group": "g345678",
    "groupName": "TokyoTrip",
    "splitMethod": "EQUAL",
    "participants": [
      {"userId": "u123456", "username": "You", "amount": 666.67},
      {"userId": "u234567", "username": "Alice", "amount": 666.67},
      {"userId": "u345678", "username": "Bob", "amount": 666.67}
    ],
    "date": "2025-03-03T10:21:00Z"
  }
}
```

#### POST /commands/suggest
Gets suggestions based on partial command input

**Request Body:**
```json
{
  "partialCommand": "/rec"
}
```

**Response: (200 OK)**
```json
{
  "suggestions": [
    {
      "command": "/record",
      "description": "Record a new expense"
    }
  ]
}
```

### Friends

#### POST /friends/add
Sends a friend request

**Request Body:**
```json
{
  "username": "Alice"
}
```

**Response: (200 OK)**
```json
{
  "requestId": "fr123456",
  "status": "PENDING",
  "recipient": {
    "userId": "u234567",
    "username": "Alice"
  }
}
```

#### GET /friends
Gets a list of friends

**Response: (200 OK)**
```json
{
  "friends": [
    {
      "userId": "u234567",
      "username": "Alice",
      "email": "alice@example.com"
    },
    {
      "userId": "u345678",
      "username": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

#### GET /friends/requests
Gets a list of pending friend requests

**Response: (200 OK)**
```json
{
  "incomingRequests": [
    {
      "requestId": "fr234567",
      "from": {
        "userId": "u456789",
        "username": "Charlie"
      },
      "timestamp": "2025-03-02T15:30:00Z"
    }
  ],
  "outgoingRequests": [
    {
      "requestId": "fr345678",
      "to": {
        "userId": "u567890",
        "username": "David"
      },
      "timestamp": "2025-03-03T09:15:00Z"
    }
  ]
}
```

#### PUT /friends/requests/{requestId}
Accepts or rejects a friend request

**Request Body:**
```json
{
  "action": "ACCEPT" // or "REJECT"
}
```

**Response: (200 OK)**
```json
{
  "requestId": "fr234567",
  "status": "ACCEPTED",
  "friend": {
    "userId": "u456789",
    "username": "Charlie"
  }
}
```

### Groups

#### POST /groups
Creates a new group

**Request Body:**
```json
{
  "name": "TokyoTrip",
  "defaultCurrency": "JPY"
}
```

**Response: (201 Created)**
```json
{
  "groupId": "g345678",
  "name": "TokyoTrip",
  "defaultCurrency": "JPY",
  "createdBy": "u123456",
  "createdAt": "2025-03-03T10:16:00Z",
  "members": [
    {
      "userId": "u123456",
      "username": "John Doe",
      "role": "ADMIN"
    }
  ]
}
```

#### GET /groups
Gets a list of groups

**Response: (200 OK)**
```json
{
  "groups": [
    {
      "groupId": "g345678",
      "name": "TokyoTrip",
      "defaultCurrency": "JPY",
      "memberCount": 3,
      "totalExpenses": 32000,
      "yourBalance": -8666.67
    },
    {
      "groupId": "g456789",
      "name": "Apartment",
      "defaultCurrency": "USD",
      "memberCount": 2,
      "totalExpenses": 1500,
      "yourBalance": 750
    }
  ]
}
```

#### GET /groups/{groupId}
Gets details of a specific group

**Response: (200 OK)**
```json
{
  "groupId": "g345678",
  "name": "TokyoTrip",
  "defaultCurrency": "JPY",
  "createdBy": "u123456",
  "createdAt": "2025-03-03T10:16:00Z",
  "members": [
    {
      "userId": "u123456",
      "username": "John Doe",
      "role": "ADMIN"
    },
    {
      "userId": "u234567",
      "username": "Alice",
      "role": "MEMBER"
    },
    {
      "userId": "u345678",
      "username": "Bob",
      "role": "MEMBER"
    }
  ],
  "expenses": [
    {
      "expenseId": "e789012",
      "description": "Dinner",
      "amount": 2000,
      "currency": "JPY",
      "paidBy": "u123456",
      "date": "2025-03-03T10:21:00Z"
    },
    {
      "expenseId": "e890123",
      "description": "Hotel",
      "amount": 30000,
      "currency": "JPY",
      "paidBy": "u234567",
      "date": "2025-03-03T10:25:00Z"
    }
  ],
  "balances": [
    {
      "userId": "u123456",
      "username": "John Doe",
      "netBalance": -8666.67
    },
    {
      "userId": "u234567",
      "username": "Alice",
      "netBalance": 19333.33
    },
    {
      "userId": "u345678",
      "username": "Bob",
      "netBalance": -10666.67
    }
  ]
}
```

#### DELETE /groups/{groupId}
Deletes a group

**Response: (204 No Content)**

#### POST /groups/{groupId}/members
Adds members to a group

**Request Body:**
```json
{
  "userIds": ["u234567", "u345678"]
}
```

**Response: (200 OK)**
```json
{
  "groupId": "g345678",
  "name": "TokyoTrip",
  "members": [
    {
      "userId": "u123456",
      "username": "John Doe",
      "role": "ADMIN"
    },
    {
      "userId": "u234567",
      "username": "Alice",
      "role": "MEMBER"
    },
    {
      "userId": "u345678",
      "username": "Bob",
      "role": "MEMBER"
    }
  ]
}
```

#### DELETE /groups/{groupId}/members/{userId}
Removes a member from a group

**Response: (204 No Content)**

### Expenses

#### POST /expenses
Creates a new expense

**Request Body:**
```json
{
  "amount": 2000,
  "currency": "JPY",
  "description": "Dinner",
  "paidBy": "u123456",
  "groupId": "g345678",
  "splitMethod": "EQUAL",
  "participants": ["u123456", "u234567", "u345678"],
  "date": "2025-03-03T10:21:00Z"
}
```

**Response: (201 Created)**
```json
{
  "expenseId": "e789012",
  "amount": 2000,
  "currency": "JPY",
  "description": "Dinner",
  "paidBy": "u123456",
  "paidByName": "John Doe",
  "groupId": "g345678",
  "groupName": "TokyoTrip",
  "splitMethod": "EQUAL",
  "participants": [
    {"userId": "u123456", "username": "John Doe", "amount": 666.67},
    {"userId": "u234567", "username": "Alice", "amount": 666.67},
    {"userId": "u345678", "username": "Bob", "amount": 666.67}
  ],
  "date": "2025-03-03T10:21:00Z"
}
```

#### GET /expenses
Gets a list of all expenses

**Query Parameters:**
- `groupId` (optional): Filter by group
- `limit` (optional): Limit number of results
- `offset` (optional): Pagination offset

**Response: (200 OK)**
```json
{
  "expenses": [
    {
      "expenseId": "e789012",
      "description": "Dinner",
      "amount": 2000,
      "currency": "JPY",
      "paidBy": "u123456",
      "paidByName": "John Doe",
      "groupId": "g345678",
      "groupName": "TokyoTrip",
      "date": "2025-03-03T10:21:00Z"
    },
    {
      "expenseId": "e890123",
      "description": "Hotel",
      "amount": 30000,
      "currency": "JPY",
      "paidBy": "u234567",
      "paidByName": "Alice",
      "groupId": "g345678",
      "groupName": "TokyoTrip",
      "date": "2025-03-03T10:25:00Z"
    }
  ],
  "total": 2,
  "limit": 10,
  "offset": 0
}
```

#### GET /expenses/{expenseId}
Gets details of a specific expense

**Response: (200 OK)**
```json
{
  "expenseId": "e789012",
  "amount": 2000,
  "currency": "JPY",
  "description": "Dinner",
  "paidBy": "u123456",
  "paidByName": "John Doe",
  "groupId": "g345678",
  "groupName": "TokyoTrip",
  "splitMethod": "EQUAL",
  "participants": [
    {"userId": "u123456", "username": "John Doe", "amount": 666.67},
    {"userId": "u234567", "username": "Alice", "amount": 666.67},
    {"userId": "u345678", "username": "Bob", "amount": 666.67}
  ],
  "date": "2025-03-03T10:21:00Z",
  "createdAt": "2025-03-03T10:21:30Z",
  "updatedAt": "2025-03-03T10:21:30Z"
}
```

#### PUT /expenses/{expenseId}
Updates an expense

**Request Body:**
```json
{
  "amount": 2500,
  "description": "Fancy Dinner",
  "participants": ["u123456", "u234567", "u345678"]
}
```

**Response: (200 OK)**
```json
{
  "expenseId": "e789012",
  "amount": 2500,
  "currency": "JPY",
  "description": "Fancy Dinner",
  "paidBy": "u123456",
  "paidByName": "John Doe",
  "groupId": "g345678",
  "groupName": "TokyoTrip",
  "splitMethod": "EQUAL",
  "participants": [
    {"userId": "u123456", "username": "John Doe", "amount": 833.33},
    {"userId": "u234567", "username": "Alice", "amount": 833.33},
    {"userId": "u345678", "username": "Bob", "amount": 833.33}
  ],
  "date": "2025-03-03T10:21:00Z",
  "updatedAt": "2025-03-03T11:15:30Z"
}
```

#### DELETE /expenses/{expenseId}
Deletes an expense

**Response: (204 No Content)**

### Balances

#### GET /balances
Gets balances for all groups and friends

**Response: (200 OK)**
```json
{
  "totalBalance": -7916.67,
  "preferredCurrency": "USD",
  "groups": [
    {
      "groupId": "g345678",
      "name": "TokyoTrip",
      "currency": "JPY",
      "balance": -8666.67,
      "balanceInPreferredCurrency": -57.78,
      "owedTo": [
        {
          "userId": "u234567",
          "username": "Alice",
          "amount": 9333.33,
          "amountInPreferredCurrency": 62.22
        }
      ],
      "owedFrom": [
        {
          "userId": "u345678",
          "username": "Bob",
          "amount": 666.67,
          "amountInPreferredCurrency": 4.44
        }
      ]
    },
    {
      "groupId": "g456789",
      "name": "Apartment",
      "currency": "USD",
      "balance": 750,