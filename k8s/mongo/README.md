Run the following commands with helm to deploy Mongodb Operator:
```bash
helm repo add mongodb https://mongodb.github.io/helm-charts
```
```bash
helm install atlas-operator mongodb/mongodb-atlas-operator --namespace=test
```
Run the following commands with helm to deploy mongodb

from https://github.com/bitnami/charts/tree/master/bitnami/mongodb/#installing-the-chart
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install mongo-release bitnami/mongodb --namespace=test
```
```bash
** Please be patient while the chart is being deployed **

MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

    mongo-release-mongodb.test.svc.cluster.local

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace test mongo-release-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)

To connect to your database, create a MongoDB&reg; client container:

    kubectl run --namespace test mongo-release-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:4.4.12-debian-10-r35 --command -- bash

Then, run the following command:
    mongo admin --host "mongo-release-mongodb" --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD
```