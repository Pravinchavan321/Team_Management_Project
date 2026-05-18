minikube start --driver=docker
kubectl config use-context minikube
kubectl get nodes
minikube docker-env | Invoke-Expression
cd backend
docker build -t teamflow-backend:latest .
cd ..
cd frontend
docker build --build-arg VITE_API_URL=/api -t teamflow-frontend:latest .
cd ..
kubectl apply -f k8s/
kubectl get pods
