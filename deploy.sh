#!/bin/sh
set -e

IMAGE="${DOCKER_USERNAME}/${DOCKER_REPOSITORY}"
GIT_VERSION=$(git describe --always --abbrev --tags --long)

yarn build

docker build --file Dockerfile.deploy -t "${IMAGE}":"${GIT_VERSION}" .

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
docker push "${IMAGE}":"${GIT_VERSION}"

chmod 600 deploy_rsa

ssh -i deploy_rsa "${SERVER_USER}"@"${SERVER_IP}" <<"EOF"
  docker stop ${DOCKER_REPOSITORY}
  docker container rm ${DOCKER_REPOSITORY}
  docker run --restart unless-stopped -d -p 9002:9000 --name ${DOCKER_REPOSITORY} ${IMAGE}:${GIT_VERSION}
  docker system prune -f -a
EOF
