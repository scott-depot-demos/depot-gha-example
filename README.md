# Vinyl Collection Manager 🎵

A modern web application for managing your vinyl record collection, built to showcase **Depot's** powerful GitHub Actions integration for accelerating Docker builds in CI/CD pipelines.

## ✨ Features

- **Add Records**: Easily add new vinyl records to your collection
- **Edit Records**: Update record details including artist, album, year, genre, condition, and notes
- **Delete Records**: Remove records from your collection
- **Beautiful UI**: Modern, responsive design with a dark theme
- **Collection Overview**: View all your records in an organized grid layout

## 🎯 Why This Project?

This application serves as a perfect demonstration of **Depot's** GitHub Actions acceleration capabilities:

- **Real Application**: A functional, production-ready app (not just a demo)
- **Docker Builds**: Multi-stage Dockerfile that benefits from Depot's caching
- **CI/CD Integration**: GitHub Actions workflow that showcases build performance
- **Visual Appeal**: Beautiful UI that's great for demonstrations

## 🏗️ Project Structure

```
depot-gha-example/
├── server.js              # Express backend with REST API
├── package.json           # Node.js dependencies
├── Dockerfile             # Multi-stage Docker build
├── public/
│   ├── index.html         # Main application page
│   ├── styles.css         # Modern, responsive styling
│   └── app.js             # Frontend JavaScript
└── .github/
    └── workflows/
        └── docker-build.yml  # GitHub Actions workflow
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000` to start managing your collection

### Docker Build

1. **Build the image:**
   ```bash
   docker build -t vinyl-collection .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 vinyl-collection
   ```

## 📀 Using the Application

### Adding a Record

1. Click the **"+ Add Record"** button
2. Fill in the record details:
   - **Artist** (required): The artist or band name
   - **Album** (required): The album title
   - **Year**: Release year
   - **Genre**: Music genre (e.g., Rock, Jazz, Electronic)
   - **Condition**: Physical condition of the record
   - **Notes**: Any additional information
3. Click **"Save Record"**

### Editing a Record

1. Click the **✏️** icon on any record card
2. Modify the fields as needed
3. Click **"Save Record"**

### Deleting a Record

1. Click the **🗑️** icon on any record card
2. Confirm the deletion in the modal

## 🔧 GitHub Actions Setup

### Prerequisites

1. **Get a Depot Project Token:**
   - Sign up at [depot.dev](https://depot.dev)
   - Create a new project
   - Copy your project token

2. **Add Secret to GitHub:**
   - Go to your repository settings
   - Navigate to Secrets and variables → Actions
   - Add a new secret named `DEPOT_PROJECT_TOKEN`
   - Paste your Depot project token

### Workflow Features

The included GitHub Actions workflow demonstrates:

- **Parallel Builds**: Both Depot and standard builds run simultaneously for comparison
- **Depot Integration**: Uses `depot/build-push-action` for accelerated builds
- **Standard Comparison**: Uses standard Docker buildx for baseline comparison
- **Results Comparison**: Automatically compares build times and results

### Workflow Triggers

The workflow runs on:
- Pushes to `main` or `master` branches
- Pull requests to `main` or `master` branches
- Manual workflow dispatch

## 🎨 Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript (no framework dependencies)
- **Styling**: Modern CSS with CSS Grid and Flexbox
- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions with Depot integration

## 📊 API Endpoints

The application provides a RESTful API:

- `GET /api/records` - Get all records
- `GET /api/records/:id` - Get a single record
- `POST /api/records` - Create a new record
- `PUT /api/records/:id` - Update a record
- `DELETE /api/records/:id` - Delete a record
- `GET /api/health` - Health check endpoint

## 💾 Data Storage

Currently, the application uses in-memory storage for simplicity. In a production environment, you would:

- Use a database (PostgreSQL, MongoDB, etc.)
- Implement proper data persistence
- Add authentication and user management
- Add image uploads for album artwork

## 🚀 Deployment

### Using Docker

1. Build the image:
   ```bash
   docker build -t vinyl-collection .
   ```

2. Run with Docker:
   ```bash
   docker run -d -p 3000:3000 --name vinyl-collection vinyl-collection
   ```

### Using GitHub Actions

The included workflow automatically builds and pushes images to GitHub Container Registry when you push to the repository.

## 🔍 How Depot Accelerates This Build

1. **Intelligent Caching**: Depot analyzes the Dockerfile and caches layers at the instruction level
2. **Parallel Execution**: Builds run on dedicated hardware optimized for Docker
3. **Smart Invalidation**: Only rebuilds what's necessary when files change
4. **Layer Reuse**: Maximizes cache hits across builds and branches

### Expected Performance

- **First build**: Similar to standard (no cache)
- **Subsequent builds**: 4-10x faster due to intelligent caching
- **Incremental changes**: Near-instant builds when only code changes

## 🤝 Contributing

This is a demonstration project. Feel free to fork and customize for your own needs!

## 📝 License

MIT License - feel free to use this project for demonstrations and learning.

## 🔗 Resources

- [Depot Documentation](https://docs.depot.dev)
- [Depot GitHub Action](https://github.com/depot/setup-action)
- [Depot Website](https://depot.dev)

---

**Built with ❤️ to showcase Depot's powerful CI/CD acceleration**
