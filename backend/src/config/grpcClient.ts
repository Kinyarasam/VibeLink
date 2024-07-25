// src/config/grpcClient.ts

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld as any;

const USER_PROTO_PATH = path.join(__dirname, '../protos/user.proto');

const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const userProto = grpc.loadPackageDefinition(userPackageDefinition).user as any;

export const getGrpcClient = () => {
  return new helloProto.Greeter('127.0.0.1:50051', grpc.credentials.createInsecure());
};

export const authGrpcClient = () => {
  return new userProto.Authenticate('127.0.0.1:50051', grpc.credentials.createInsecure());
}
