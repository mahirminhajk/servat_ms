# servat-ms

Servat is a modern, scalable, and user-friendly service marketplace platform designed to connect service providers and consumers in a seamless digital experience. The platform allows service providers (such as freelancers, professionals, or businesses) to create detailed service listings, manage their availability, and communicate with potential clients. On the other side, consumers can search, filter, and book services based on their needs, location, and other preferences.

## NOTE

### CHROME: Your connection is not private: ISSUE(SOLVED)
If you are using browser like chrome and you get the error `Your connection is not private`, you can bypass it by typing `thisisunsafe` on the page. This will bypass the error and you can access the page.

### PVC(Persistent Volume Claim): ISSUE(SOLVED)
When using tilt up for development, i found out that it will restart the pvc(persistent volume claim) and the data will be lost. To avoid this, i does not include the `pvc.yaml` file in the `tilt up` command. 

? Why i use pvc?
- I use pvc to store the data of the database and redis. This is to avoid data loss when the pod is restarted.

? why i does not include the `pvc.yaml` file in the `tilt up` command?
- I does not include the `pvc.yaml` file in the `tilt up` command because the pvc will be created every time the `tilt up` command is run. This will cause the data to be lost and it will slow down the development process.

? is pvc necessary?
- No, pvc is not necessary. You can remove the `pvc.yaml` file and the data will be stored in the pod. But when the pod is restarted, the data will be lost.

To create the pvc, run(one time):
```bash
kubectl apply -f infra/k8s/pvc.yaml
```

To delete the pvc, run:
```bash
kubectl delete -f infra/k8s/pvc.yaml
```
### Check ingress-nginx of any route error
```bash
kubectl describe ingress ingress-service
```

## Project Status
`On going`


## Tech Stack
- Backend: Node.js, Expressjs, TypeScript.
- Frontend: Reactjs, Nextjs.
- Databases: Mongodb(mongoose), postgresql(sequelize).
- Authentication: JWT (JSON Web Tokens).
- Cache: Redis.
- Message Queue: Rabbitmq.
- Testing: Jest, Supertest.
- Containerization: Docker.
- Orchestration: Kubernetes.
- CI/CD: GitHub Actions.

Detailed Documention can find in [docs](/docs) folder
