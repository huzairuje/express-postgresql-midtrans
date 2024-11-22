# README

## Description
this repository basically implementing limiter rate (Token Bucket Algorithm) and cache (CQRS pattern)
on javasscript using expressjs http framework (https://expressjs.com/), postgresql and redis and add midtrans client sdk.

## Install PreRequisite
1. run `npm start` to install or up or run the postgres container and redis container.
1. make sure the docker postgres or container postgres is running and make database on the postgres container with name `test_cache_cqrs`
   and run the sql script on the directory `migrations`
2. make sure redis container is up and running
3. make sure the config on config.local.yaml is correct

## How to Run Locally
```shell
npm start
```