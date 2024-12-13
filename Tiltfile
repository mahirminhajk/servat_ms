k8s_yaml([
    'infra/k8s/ingress-svc.yaml',   # Ingress service
    'infra/k8s/namespaces.yaml',    # Namespaces
    'infra/k8s/rabbitmq-depl.yaml', # RabbitMQ deployment
    'infra/k8s/secrets.yaml',       # Secrets

    'user-service/infra/k8s/user-depl.yaml',                # User service deployment
    'user-service/infra/k8s/user-pgsql-depl.yaml',          # PostgreSQL deployment

    'catalog-service/infra/k8s/catalog-depl.yaml',          # catalog service deployment
    'catalog-service/infra/k8s/catalog-mongo-depl.yaml',    # PostgreSQL deployment

])

# Define Docker builds for each service
docker_build(
   'mahirminhajk/s.user',
   context='./user-service',
   dockerfile='./user-service/infra/docker/Dockerfile',
   ignore=['node_modules'],
   live_update=[
       sync('./user-service/src', '/app/src'),
       run('npm install', trigger=['./user-service/package.json']),
   ],
   target='dev'
)
docker_build(
   'mahirminhajk/s.catalog',
   context='./catalog-service',
   dockerfile='./catalog-service/infra/docker/Dockerfile',
   ignore=['node_modules'],
   live_update=[
       sync('./catalog-service/src', '/app/src'),
       run('npm install', trigger=['./catalog-service/package.json']),
   ],
   target='dev'
)

# define dependencies for services
k8s_resource('user-depl', resource_deps=['rabbitmq-depl', 'user-pgsql-depl'])
k8s_resource('catalog-depl', resource_deps=['rabbitmq-depl', 'catalog-mongo-depl'])

# Port forwarding rabbitmq service
k8s_resource(
   workload='rabbitmq-depl',
   port_forwards='15672:15672'
)