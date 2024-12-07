# API Documentation

## Getting Started

### Authentication

#### 1. Obtain Access Token
```typescript
// Using axios
import axios from 'axios';

const login = async (email: string, password: string) => {
  const response = await axios.post('/api/auth/login', {
    email,
    password
  });
  return response.data.token;
};
```

#### 2. Use Token in Requests
```typescript
// Set up axios instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Attendance Management

#### Get Attendance Records
```http
GET /api/attendance/records
Authorization: Bearer <token>
```

Response:
```json
{
  "records": [
    {
      "id": "1",
      "userId": "123",
      "date": "2023-05-20",
      "checkIn": "09:00:00",
      "checkOut": "17:00:00",
      "status": "present"
    }
  ]
}
```

#### Check In
```http
POST /api/attendance/check-in
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

Response:
```json
{
  "id": "1",
  "userId": "123",
  "checkIn": "09:00:00",
  "status": "present"
}
```

### Employee Management

#### Get Employee List
```http
GET /api/employees
Authorization: Bearer <token>
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `search`: Search term
- `department`: Filter by department

Response:
```json
{
  "employees": [
    {
      "id": "123",
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "position": "Developer"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

## Using the API with React Query

### Example: Fetch Attendance Records
```typescript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAttendanceRecords = (page: number) => {
  return useQuery(['attendance', page], async () => {
    const { data } = await axios.get('/api/attendance/records', {
      params: { page }
    });
    return data;
  });
};

// In component:
const AttendanceList = () => {
  const { data, isLoading, error } = useAttendanceRecords(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading records</div>;

  return (
    <ul>
      {data.records.map(record => (
        <li key={record.id}>
          {record.date}: {record.status}
        </li>
      ))}
    </ul>
  );
};
```

### Example: Check In
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (location: { latitude: number; longitude: number }) => {
      const { data } = await axios.post('/api/attendance/check-in', location);
      return data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch attendance records
        queryClient.invalidateQueries(['attendance']);
      }
    }
  );
};

// In component:
const CheckInButton = () => {
  const { mutate, isLoading } = useCheckIn();

  const handleCheckIn = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  return (
    <button 
      onClick={handleCheckIn}
      disabled={isLoading}
    >
      {isLoading ? 'Checking in...' : 'Check In'}
    </button>
  );
};
```

## Error Handling

### Error Response Format
```typescript
interface ErrorResponse {
  status: 'error';
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

### Common Error Codes
- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `PERMISSION_DENIED`: User lacks required permissions
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `VALIDATION_ERROR`: Invalid input data
- `SERVER_ERROR`: Internal server error

### Handling Errors
```typescript
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

// Global error handler
api.interceptors.response.use(
  response => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.data.code) {
        case 'AUTH_REQUIRED':
          // Redirect to login
          break;
        case 'PERMISSION_DENIED':
          // Show permission error
          break;
        default:
          // Handle other errors
      }
    }
    return Promise.reject(error);
  }
);
```

## Rate Limiting

- Rate limit: 100 requests per minute
- Headers:
  - `X-RateLimit-Limit`: Maximum requests per window
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time until limit resets

### Handling Rate Limits
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      const resetTime = error.response.headers['x-ratelimit-reset'];
      console.log(`Rate limit exceeded. Reset at: ${new Date(resetTime * 1000)}`);
    }
    return Promise.reject(error);
  }
);
```