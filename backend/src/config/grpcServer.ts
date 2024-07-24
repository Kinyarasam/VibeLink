import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import HelloService from '../services/helloService';

const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
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

const sayHello = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  const message = HelloService.sayHello(call.request.name)
  callback(null, { message: message });
};

export const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(helloProto.helloworld.Greeter.service, { sayHello: sayHello });
  const port = '127.0.0.1:50051';
  server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at ${port}`);
    // server.start();
  });
};
