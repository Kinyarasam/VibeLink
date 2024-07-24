import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Define the path to the proto file
const PROTO_PATH = 'src/protos/helloworld.proto';

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Define the gRPC package
const helloProto = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  helloworld: {
    Greeter: {
      service: grpc.ServiceDefinition<any>,
    },
  },
};

// Implement the sayHello function
function sayHello(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
  callback(null, { message: 'Hello ' + call.request.name });
}

// Define the main function to start the server
function main() {
  const server = new grpc.Server();
  server.addService(helloProto.helloworld.Greeter.service, { sayHello: sayHello });
  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  });
}

main();
