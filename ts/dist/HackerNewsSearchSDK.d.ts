import { ItemEntity } from './entity/ItemEntity';
import { SearchEntity } from './entity/SearchEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './HackerNewsSearchTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HackerNewsSearchEntityBase } from './HackerNewsSearchEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class HackerNewsSearchSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Item(entopts?: Record<string, any>): ItemEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HackerNewsSearchSDK;
    tester(testopts?: any, sdkopts?: any): HackerNewsSearchSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HackerNewsSearchSDK;
export { stdutil, config, BaseFeature, HackerNewsSearchEntityBase, HackerNewsSearchSDK, SDK, };
export type { DirectResult };
