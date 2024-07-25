import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import HelloService from '../services/helloService';
import { userService } from '../services/userService';

const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto');
const USER_PROTO_PATH = path.join(__dirname, '../protos/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userPackageDefinition = protoLoader.loadSync(USER_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const helloProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  helloworld: {
    Greeter: {
      service: grpc.ServiceDefinition<any>,
    },
  },
};
const userProto = grpc.loadPackageDefinition(userPackageDefinition) as unknown as {
  user: {
    Authenticate: {
      service: grpc.ServiceDefinition<any>,
    },
  },
};

const sayHello = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const message = HelloService.sayHello(call.request.name)
  callback(null, { message: message });
};

const authenticateUser = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const isAuthenticated = userService.authenticate(call.request.username, call.request.password);
  callback(null, { isAuthenticated: isAuthenticated });
}

export const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(helloProto.helloworld.Greeter.service, { sayHello: sayHello });
  server.addService(userProto.user.Authenticate.service, { authenticateUser: authenticateUser });
  const port = '127.0.0.1:50051';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at ${port}`);
    // server.start();
  });
};
