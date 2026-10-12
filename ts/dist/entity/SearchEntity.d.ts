import { HackerNewsSearchEntityBase } from '../HackerNewsSearchEntityBase';
import type { HackerNewsSearchSDK } from '../HackerNewsSearchSDK';
import type { Control } from '../types';
import type { Search, SearchListMatch } from '../HackerNewsSearchTypes';
declare class SearchEntity extends HackerNewsSearchEntityBase<Search> {
    constructor(client: HackerNewsSearchSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    list(this: any, reqmatch?: SearchListMatch, ctrl?: Control): Promise<SearchEntity[]>;
}
export { SearchEntity };
