const { execSync } = require('child_process');
const path = require('path');

// Define paths
const protoPath = path.resolve(__dirname, 'protos/helloworld.proto');
const outDir = path.resolve(__dirname, 'proto-gen');

// Generate code from .proto file
execSync(`npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=${outDir} ${protoPath}`);
console.log('Protobuf files generated.');
