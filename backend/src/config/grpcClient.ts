import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const protoPath = 'src/protos/helloworld.proto';
const packageDefinition = protoLoader.loadSync(protoPath);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

const client = new protoDescriptor.helloworld.Greeter('localhost:50051', grpc.credentials.createInsecure());

const request = { name: 'World' };
client.sayHello(request, (error: grpc.ServiceError | null, response: any) => {
  if (error) {
    console.error(`Error: ${error.message}`);
  } else {
    console.log(`Greeting: ${response.message}`);
  }
});
