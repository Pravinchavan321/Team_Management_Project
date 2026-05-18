# Kubernetes Local Setup Guide

Follow these exact steps to run the TeamFlow project locally using Minikube on Windows PowerShell.

Ensure you are running these commands in a normal PowerShell window from the project root:
`D:\Desktop\PEP PROJECT\teamflow-devops-mern`

### 1. Start Docker Desktop manually
Ensure Docker Desktop is open and running in the background.

### 2. Verify Docker
```powershell
docker info
```

### 3. Start Minikube
```powershell
minikube start --driver=docker
```

### 4. Verify cluster
```powershell
minikube status
kubectl config use-context minikube
kubectl get nodes
```
*Expected: node status should be Ready.*

### 5. Point current PowerShell to Minikube Docker daemon
```powershell
minikube docker-env | Invoke-Expression
```
**Important:** This command only affects the current PowerShell window. So image build and kubectl apply should be run in the exact same PowerShell window.

### 6. Build backend image
```powershell
cd "D:\Desktop\PEP PROJECT\teamflow-devops-mern\backend"
docker build -t teamflow-backend:latest .
```

### 7. Build frontend image
```powershell
cd "D:\Desktop\PEP PROJECT\teamflow-devops-mern\frontend"
docker build --build-arg VITE_API_URL=/api -t teamflow-frontend:latest .
```

### 8. Confirm images exist inside Minikube
```powershell
docker images | findstr teamflow
```

### 9. Apply Kubernetes files
```powershell
cd "D:\Desktop\PEP PROJECT\teamflow-devops-mern"
kubectl apply -f k8s/
```

### 10. Check all resources
```powershell
kubectl get pods
kubectl get svc
kubectl get deployments
kubectl get pvc
```

### 11. Wait until pods are ready
```powershell
kubectl get pods -w
```
*(Press `Ctrl+C` to exit the watch mode once all pods are "Running")*

### 12. Open frontend
```powershell
minikube service frontend-service
```

---

## Debugging and Operations

### Debug commands:
```powershell
kubectl describe pod <pod-name>
kubectl logs <backend-pod-name>
kubectl logs <frontend-pod-name>
kubectl logs <mongo-pod-name>
```

### Restart deployment after rebuilding image:
If you change code and rebuild the image, force Kubernetes to restart the pods:
```powershell
kubectl rollout restart deployment/backend-deployment
kubectl rollout restart deployment/frontend-deployment
```

### Delete everything and redeploy:
```powershell
kubectl delete -f k8s/
kubectl apply -f k8s/
```

### Troubleshooting: `localhost:8080 refused`
If you run a `kubectl` command and see `Unable to connect to the server: dial tcp [::1]:8080: No connection could be made because the target machine actively refused it`, it means Minikube is not running, or your kubectl context is wrong.
**Fix with:**
```powershell
minikube start --driver=docker
kubectl config use-context minikube
kubectl get nodes
```
*(Do not use `--validate=false` to try and bypass this. It will not fix the connection issue).*
