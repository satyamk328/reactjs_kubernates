Build the React App:

Run npm run build in your React project directory to create a production build of your app.
Dockerize the React App:

Create a Dockerfile in the root directory of your React app.
Use the Dockerfile to build a Docker image containing your React app. You can use the command docker build -t your-docker-image:tag . where your-docker-image:tag is the name and tag you want to give to your Docker image.
Push Docker Image to a Registry (Optional): like 

If you're using a container registry (like Docker Hub, Google Container Registry, etc.), push the built Docker image to the registry using docker push your-docker-image:tag. .
Create Kubernetes Manifests:

Create Kubernetes manifests (deployment.yaml, service.yaml, etc.) specifying the deployment configuration, including environment variables, ports, replicas, etc.
Apply Kubernetes Manifests:

Apply the manifests to your Kubernetes cluster using kubectl apply -f deployment.yaml where deployment.yaml is the name of your deployment manifest file.
Check Deployment Status:

Use kubectl get pods to check the status of your pods.
Use kubectl get deployments to check the status of your deployment.