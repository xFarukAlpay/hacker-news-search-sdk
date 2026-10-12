import { HackerNewsSearchEntityBase } from '../HackerNewsSearchEntityBase';
import type { HackerNewsSearchSDK } from '../HackerNewsSearchSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch } from '../HackerNewsSearchTypes';
declare class UserEntity extends HackerNewsSearchEntityBase<User> {
    constructor(client: HackerNewsSearchSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
