k8s_yaml([
    'infra/k8s/ingress-srv.yaml',   # Ingress service
    'infra/k8s/namespaces.yaml',    # Namespaces
    'infra/k8s/rabbitmq-depl.yaml', # RabbitMQ deployment

    'user-service/infra/k8s/user-depl.yaml', # User service deployment

])

# Define Docker builds for each service
docker_build(
   'mahirminhajk/s.user',
   context='./user-service',
   dockerfile='./user-service/infra/docker/Dockerfile',
   ignore=['node_modules'],
   live_update=[
       sync('./user-service/src', '/app/src'),
       run('npm install', trigger=['user-service/package.json']),
   ],
   target='dev'
)

# Port forwarding rabbitmq service
k8s_resource(
   workload='rabbitmq-depl',
   port_forwards='15672:15672'
)

