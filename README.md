# Express API - AWS Automated Deployment Pipeline

## Overview
This project demonstrates a fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline. It takes a lightweight Express API from a GitHub repository and deploys it to a live AWS EC2 instance running inside a Docker container. The pipeline utilizes GitHub Actions to automatically build, push, and deploy the containerized application upon every code push to the `main` branch.

Additionally, the infrastructure includes an **Nginx reverse proxy** to route external traffic cleanly over standard HTTP (port 80) to the internal container, ensuring a clean, production-ready URL structure without exposed port numbers.

## Architecture & Core Technologies
* **Cloud Infrastructure:** AWS EC2 (Amazon Linux 2023)
* **Containerization:** Docker
* **CI/CD Pipeline:** GitHub Actions
* **Web Server / Proxy:** Nginx
* **Application:** Node.js, Express.js (Health-check API)

## Key Features
* **Zero-Touch Deployments:** GitHub Actions automatically handles the build, registry push, and deployment lifecycle to the live remote server.
* **Production-Grade Routing:** Nginx acts as a secure gateway, listening on port 80 and proxying external traffic to the internal Docker container running on port 3000.
* **Automated Health Checks:** The application includes dedicated health-check endpoints to verify pipeline success and monitor container uptime.

## CI/CD Pipeline Workflow
1. **Trigger:** Developer pushes new code to the `main` branch.
2. **Build:** The GitHub Actions runner provisions an environment, checks out the code, and builds a new Docker container image using the repository's `Dockerfile`.
3. **Push:** The freshly built image is pushed to the designated container registry.
4. **Deploy:** The workflow securely connects to the live EC2 instance via SSH, pulls the latest image, stops the running container, and spins up the new one.
5. **Serve:** Nginx dynamically routes incoming web traffic to the newly deployed API.

## Cloud Infrastructure Highlights
* **Security Groups:** Inbound network rules strictly limit SSH access (Port 22) exclusively to the authorized local IP, while opening Port 80 to allow global HTTP traffic.
* **Permissions Management:** The `ec2-user` is added to the `docker` group to enable native, seamless container execution without requiring `sudo` privileges—a critical requirement for automated CI/CD deployment scripts.
