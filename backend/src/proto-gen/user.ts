import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthenticateClient as _user_AuthenticateClient, AuthenticateDefinition as _user_AuthenticateDefinition } from './user/Authenticate';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    AuthReply: MessageTypeDefinition
    AuthRequest: MessageTypeDefinition
    Authenticate: SubtypeConstructor<typeof grpc.Client, _user_AuthenticateClient> & { service: _user_AuthenticateDefinition }
  }
}

