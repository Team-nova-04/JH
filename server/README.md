# CivicSense Backend API

**AI-Powered Public Complaint Management Platform**

A complete Node.js + Express backend with MongoDB (Mongoose) for managing public complaints with AI-powered classification, urgency scoring, and authority routing.

## 🚀 Features

- **Citizen Portal**: Registration, login, and complaint submission
- **Anonymous Complaints**: Submit complaints without registration
- **Authority Dashboards**: Role-based access for different authorities
- **Admin Management**: Full administrative control
- **AI/NLP Processing**: HuggingFace integration for sentiment analysis and classification
- **CSV Ingestion**: Bulk import complaints from CSV files
- **Urgency Scoring**: Intelligent urgency detection engine
- **Authority Routing**: Automatic complaint assignment
- **RESTful API**: Fully documented endpoints
- **Security**: JWT authentication, rate limiting, helmet

## 📋 Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas account (or any online MongoDB service)
- HuggingFace API key (for NLP features)

## 🛠️ Installation

1. **Clone the repository and navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)
   - `JWT_SECRET`: A secure random string for JWT signing
   - `HUGGINGFACE_API_KEY`: Your HuggingFace API key
   - `PORT`: Server port (default: 5000)
   - `CLIENT_URL`: Frontend URL for CORS

   **Getting MongoDB Atlas Connection String:**
   1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   2. Create a new cluster
   3. Go to Database Access and create a database user
   4. Go to Network Access and add your IP (or 0.0.0.0/0 for all IPs in development)
   5. Click "Connect" on your cluster and copy the connection string
   6. Replace `<password>` with your database user password and `<dbname>` with `civicsense`

4. **Run the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify installation**
   Visit `http://localhost:5000/health` to check if the server is running.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Citizen Endpoints

- `POST /api/citizens/register` - Register a new citizen
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }
  ```

- `POST /api/citizens/login` - Login citizen
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/citizens/me` - Get current citizen profile (auth required)

#### Complaint Endpoints

- `POST /api/complaints` - Submit complaint (supports anonymous)
  ```json
  {
    "description": "Water leak in main street",
    "location": "Main Street, City",
    "category": "water issue"
  }
  ```
  - Supports image upload via `multipart/form-data` with field name `image`
  - Works with or without authentication (anonymous mode)

- `GET /api/complaints/my-complaints` - Get citizen's complaints (auth required)

- `GET /api/complaints/:id` - Get complaint by ID (auth required)

#### Authority Endpoints (Auth Required)

- `GET /api/authority/complaints` - Get assigned complaints
  - Query params: `status`, `urgency`, `page`, `limit`

- `GET /api/authority/complaints/:id` - Get complaint details

- `PATCH /api/authority/complaints/:id/status` - Update status
  ```json
  {
    "status": "in_progress"
  }
  ```

- `POST /api/authority/complaints/:id/notes` - Add note
  ```json
  {
    "content": "Inspected the site, work in progress"
  }
  ```

- `POST /api/authority/complaints/:id/request-contact` - Request citizen contact

#### Admin Endpoints

- `POST /api/admin/login` - Admin login

- `POST /api/admin/authority-users` - Create authority user (auth required)
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@waterboard.gov",
    "password": "password123",
    "role": "water_board",
    "department": "Water Department"
  }
  ```

- `GET /api/admin/complaints` - Get all complaints (auth required)

- `POST /api/admin/upload-csv` - Upload CSV file (auth required)
  - Upload CSV with fields: `text`, `location`, `timestamp`

#### Statistics Endpoints (Auth Required)

- `GET /api/stats/overview` - Overview statistics
- `GET /api/stats/category` - Category breakdown
- `GET /api/stats/urgent` - Urgent complaints
- `GET /api/stats/location` - Location statistics
- `GET /api/stats/trends` - Trends over time

## 🏗️ Architecture

```
/src
  /config          - Database and constants configuration
  /controllers     - Request handlers
  /routes          - API route definitions
  /models          - Mongoose models
  /middleware      - Auth, roles, file upload
  /services        - Business logic (NLP, CSV, urgency, authority)
  /utils           - Helper functions
  /uploads         - Uploaded files (images, CSV)
```

## 🔐 User Roles

1. **Citizen**: Can register, login, submit complaints (anonymous or logged-in)
2. **Authority**: Role-based access (municipal_council, water_board, ceb, rda, police_safety, disaster_management)
3. **Admin**: Full system access

## 🤖 AI/NLP Features

- **Sentiment Analysis**: Uses `distilbert-base-uncased-finetuned-sst-2-english`
- **Zero-Shot Classification**: Uses `facebook/bart-large-mnli`
- **Automatic Categories**: water issue, electricity issue, road issue, garbage issue, safety hazard, environmental issue
- **Urgency Scoring**: Calculated from sentiment, category confidence, hazard keywords, and trust score

## 📊 Urgency Scoring Formula

```
urgencyScore = (sentimentScore * 0.4) + 
               (categoryConfidence * 0.3) + 
               (hazardKeywordScore * 0.2) + 
               (trustScore * 0.1)
```

- **≥ 0.9**: Critical
- **≥ 0.7**: Urgent
- **< 0.7**: Normal

## 🗂️ CSV Format

CSV files should have the following columns:
- `text` or `description` or `complaint`: Complaint description
- `location`: Complaint location
- `timestamp`: Submission timestamp (optional, defaults to current time)

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

Example:
```bash
# Health check
curl http://localhost:5000/health

# Register citizen
curl -X POST http://localhost:5000/api/citizens/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation

## 📝 Notes

- Anonymous complaints have lower trust scores (0.3 vs 0.8)
- Personal premises complaints require login
- Safety hazard complaints require location
- All timestamps are in UTC

## 🐛 Troubleshooting

1. **MongoDB connection error**: 
   - Verify your MongoDB Atlas connection string is correct
   - Check that your IP address is whitelisted in MongoDB Atlas Network Access
   - Ensure your database user has proper permissions
   - Verify the database name in the connection string matches your cluster
2. **HuggingFace API errors**: Verify your API key and check rate limits
3. **File upload errors**: Ensure `uploads/` directories exist and have write permissions
4. **JWT errors**: Verify `JWT_SECRET` is set in `.env`

## 📄 License

ISC

## 👥 Support

For issues and questions, please refer to the project documentation or contact the development team.

