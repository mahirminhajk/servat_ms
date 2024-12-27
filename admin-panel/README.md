# Servat Admin Panel
This is the admin panel for the Servat project. It is built using React and Shadcn UI.

## docker build
```bash
docker build -f infra/docker/Dockerfile -t mahirminhajk/s.admin-panel .
```
## Issues

### 5173 port can't access or use in kubernetes environment
This is because vite is configured to run only on localhost. To fix this, we just need to update the dev command in package.json file. Change to `vite --host` 