import { HackerNewsSearchEntityBase } from '../HackerNewsSearchEntityBase';
import type { HackerNewsSearchSDK } from '../HackerNewsSearchSDK';
import type { Control } from '../types';
import type { Item, ItemLoadMatch } from '../HackerNewsSearchTypes';
declare class ItemEntity extends HackerNewsSearchEntityBase<Item> {
    constructor(client: HackerNewsSearchSDK, entopts: any);
    make(this: ItemEntity): ItemEntity;
    load(this: any, reqmatch?: ItemLoadMatch, ctrl?: Control): Promise<ItemEntity>;
}
export { ItemEntity };
