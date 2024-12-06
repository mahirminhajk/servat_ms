k8s_yaml([
    'infra/k8s/ingress-srv.yaml',
    'infra/k8s/namespaces.yaml',

    'user-service/infra/k8s/user-depl.yaml',

])

# Define Docker builds for each service
docker_build(
   'mahirminhajk/s.user',
   context='./user-service',
   dockerfile='./user-service/infra/k8s/Dockerfile',
   ignore=['node_modules'],
   live_update=[
       sync('./user-service/src', '/app/src'),
       run('npm install', trigger=['user-service/package.json']),
   ],
   target='dev'
)

# Port forwarding rabbitmq service
#k8s_resource(
#    workload='rabbitmq-depl',
#    port_forwards='ourPort:podPort'
#)

