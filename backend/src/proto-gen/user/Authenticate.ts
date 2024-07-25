// Original file: src/protos/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthReply as _user_AuthReply, AuthReply__Output as _user_AuthReply__Output } from '../user/AuthReply';
import type { AuthRequest as _user_AuthRequest, AuthRequest__Output as _user_AuthRequest__Output } from '../user/AuthRequest';

export interface AuthenticateClient extends grpc.Client {
  AuthenticateUser(argument: _user_AuthRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  AuthenticateUser(argument: _user_AuthRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  AuthenticateUser(argument: _user_AuthRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  AuthenticateUser(argument: _user_AuthRequest, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  authenticateUser(argument: _user_AuthRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  authenticateUser(argument: _user_AuthRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  authenticateUser(argument: _user_AuthRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  authenticateUser(argument: _user_AuthRequest, callback: grpc.requestCallback<_user_AuthReply__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthenticateHandlers extends grpc.UntypedServiceImplementation {
  AuthenticateUser: grpc.handleUnaryCall<_user_AuthRequest__Output, _user_AuthReply>;
  
}

export interface AuthenticateDefinition extends grpc.ServiceDefinition {
  AuthenticateUser: MethodDefinition<_user_AuthRequest, _user_AuthReply, _user_AuthRequest__Output, _user_AuthReply__Output>
}
