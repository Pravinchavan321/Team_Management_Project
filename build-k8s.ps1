Write-Host "Starting Minikube..."
minikube start

Write-Host "Configuring Docker to use Minikube's daemon..."
minikube docker-env | Invoke-Expression

Write-Host "Building backend image inside Minikube..."
docker build --no-cache -t teamflow-backend:latest ./backend

Write-Host "Building frontend image inside Minikube..."
docker build --no-cache --build-arg VITE_API_URL=http://localhost:5002/api -t teamflow-frontend:latest ./frontend

Write-Host "Applying Kubernetes configurations..."
kubectl apply -f k8s/

Write-Host "Current Pods:"
kubectl get pods
