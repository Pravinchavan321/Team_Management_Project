# TeamFlow DevOps MERN

## Project Description
TeamFlow is a production-style team project management system built with the MERN stack and industry-standard DevOps practices. It demonstrates end-to-end full-stack development, containerization, orchestration, and continuous integration/continuous deployment.

## Features
- **JWT authentication**: Secure Register and Login.
- **Dashboard**: Real-time overview of tasks and project statistics.
- **Project CRUD**: Create, Read, Update, and Delete project workflows.
- **Task CRUD**: Manage tasks associated with projects.
- **Task Status and Priority**: Filter and track tasks effectively.
- **Responsive UI**: Modern, glassmorphism-inspired design.
- **Dockerized Architecture**: Independent containers for frontend, backend, and database.
- **Kubernetes Minikube Deployment**: Scalable local cluster configuration.
- **GitHub Actions CI/CD**: Automated pipeline for building and deploying.
- **Render & Vercel Deployments**: Cloud hosting for backend and frontend.
- **Docker Hub Publishing**: Automated image pushing to a container registry.

## Tech Stack
**Frontend:**
- React (with Vite)
- Axios
- React Router DOM

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password Hashing)

**DevOps:**
- Docker & Docker Compose
- Kubernetes & Minikube
- GitHub Actions
- Docker Hub
- Render
- Vercel

## Folder Structure
```text
teamflow-devops-mern/
├── backend/
├── frontend/
├── k8s/
├── .github/
│   └── workflows/
├── docker-compose.yml
└── README.md
```

## Environment Variables
Ensure you create these `.env` files based on the `.env.example` templates. **Do not commit real secrets to Git.**

**Backend `.env`:**
```env
PORT=5002
MONGO_URI=mongodb://localhost:27017/teamflow
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5002/api
```

## Local Setup Without Docker

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Access:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Health: [http://localhost:5002/api/health](http://localhost:5002/api/health)

## Docker Setup

To run the entire stack (MongoDB, Node.js Backend, React Frontend) inside Docker:

```bash
docker compose up --build
```

**Access:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: `http://localhost:5002/api`
- Health: [http://localhost:5002/api/health](http://localhost:5002/api/health)

**Stop Containers:**
```bash
docker compose down
```

## Kubernetes Minikube Setup

**Prerequisites:** Minikube must be installed, Docker Desktop must be running, and the backend port is configured as `5002`.

**Commands for Windows PowerShell:**
```powershell
minikube start --driver=docker
minikube docker-env | Invoke-Expression
docker build -t teamflow-backend:latest ./backend
docker build --build-arg VITE_API_URL=http://localhost:5002/api -t teamflow-frontend:latest ./frontend
kubectl apply -f k8s/
kubectl get pods
kubectl get svc
```

**Accessing the Application:**

1. **Backend port-forward** (Run in a separate terminal):
```powershell
kubectl port-forward svc/backend-service 5002:5002
```

2. **Open frontend**:
```powershell
minikube service frontend-service
```

**Cleanup:**
```powershell
kubectl delete -f k8s/
minikube stop
```

## GitHub Actions CI/CD

The workflow (`.github/workflows/deploy.yml`) handles the CI/CD pipeline:
- Runs on push to the `main` branch.
- Builds backend Docker image.
- Builds frontend Docker image.
- Pushes images to Docker Hub.
- Triggers Render backend deploy using a deploy hook.
- Triggers Vercel frontend deploy using Vercel CLI.

**Required GitHub Secrets:**
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `RENDER_DEPLOY_HOOK_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Deployment Instructions

**Render Backend:**
- Create a Render Web Service.
- Connect your GitHub repository or Docker image.
- Add environment variables.
- Set the root directory as `backend` if deploying from code.
- Generate a deployment hook and copy it to your GitHub secrets.

**Vercel Frontend:**
- Import the frontend project into Vercel.
- Add the `VITE_API_URL` environment variable pointing to your deployed Render backend API.
- Add your Vercel token, org, and project secrets to GitHub for CI/CD automation.

**MongoDB Atlas:**
- Create a free cluster.
- Whitelist your IP or use `0.0.0.0/0` for demo purposes.
- Create a database user and generate a password.
- Copy the connection string to your Render Environment Variables.

## API Endpoints

**Auth:**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

**Projects:**
- `POST /api/projects`
- `GET /api/projects`
- `GET /api/projects/:id`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

**Tasks:**
- `POST /api/tasks`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/tasks/project/:projectId`

**Health:**
- `GET /api/health`

## Screenshots

- **Login Page**: *(Placeholder)*
- **Register Page**: *(Placeholder)*
- **Dashboard**: *(Placeholder)*
- **Projects Page**: *(Placeholder)*
- **Tasks Page**: *(Placeholder)*
- **Docker Running**: *(Placeholder)*
- **Kubernetes Pods**: *(Placeholder)*
- **GitHub Actions Workflow**: *(Placeholder)*

## Evaluation Criteria Mapping

| Requirement | Implementation |
|-------------|----------------|
| MERN Stack | Node.js, Express, React (Vite), MongoDB Atlas |
| Authentication | JWT, bcryptjs password hashing |
| CRUD Operations | Projects and Tasks endpoints via API |
| Docker | Multi-stage Dockerfiles, docker-compose.yml |
| Kubernetes | Deployments, Services (NodePort/ClusterIP), PVC |
| CI/CD | GitHub Actions automated workflow |
| Deployment | Vercel (Frontend), Render (Backend), Docker Hub |
| Documentation | Comprehensive README with commands & architecture |

## Common Errors and Fixes

- **Port already in use**: Use `netstat -ano | findstr :5002` to find the PID, then kill it.
- **MongoDB connection failed**: Verify your Atlas IP whitelist allows your IP or `0.0.0.0/0`.
- **Docker `node_modules` / `esbuild` issue**: Ensure `.dockerignore` contains `node_modules` and run `docker build --no-cache`.
- **Minikube command not found**: Ensure Minikube executable path is added to Windows Environment Variables.
- **`kubectl` localhost:8080 error**: Minikube is not running. Run `minikube start` first.
- **ImagePullBackOff**: Ensure `minikube docker-env | Invoke-Expression` is run *before* `docker build`.
- **Frontend cannot call backend**: Ensure `VITE_API_URL` is set correctly and the backend is port-forwarded (`kubectl port-forward svc/backend-service 5002:5002`).

## Author
Pravin Chavan
