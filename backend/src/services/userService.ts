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
const helloProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  helloworld: {
    Greeter: {
      service: grpc.ServiceDefinition<any>,
    },
  },
};

const sayHello = (call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) => {
  callback(null, { message: 'Hello ' + call.request.name });
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
