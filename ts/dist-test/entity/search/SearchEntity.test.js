"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SearchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HACKER_NEWS_SEARCH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HACKER_NEWS_SEARCH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HackerNewsSearchSDK.test();
        const ent = testsdk.Search();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('search hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.HackerNewsSearchSDK.test(offline).Search().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.HackerNewsSearchSDK.test(offline).Search()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.HackerNewsSearchSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Search().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.HackerNewsSearchSDK.test().Search().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.HackerNewsSearchSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Search().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Search().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HackerNewsSearchSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Search().list({ "hits_per_page": "x", "query": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HACKER_NEWS_SEARCH_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'search.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "author": { "a": true, "h": "Author", "n": "author", "r": false, "t": "`$STRING`", "key$": "author", "index$": 0 }, "children": { "a": true, "h": "Children", "n": "children", "r": false, "t": "`$ARRAY`", "key$": "children", "index$": 1 }, "comment_text": { "a": true, "h": "Comment Text", "n": "comment_text", "r": false, "t": "`$STRING`", "key$": "comment_text", "index$": 2 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 3 }, "created_at_i": { "a": true, "h": "Created At I", "n": "created_at_i", "r": false, "t": "`$INTEGER`", "key$": "created_at_i", "index$": 4 }, "num_comments": { "a": true, "h": "Num Comments", "n": "num_comments", "r": false, "t": "`$INTEGER`", "key$": "num_comments", "index$": 5 }, "objectID": { "a": true, "h": "Object Id", "n": "objectID", "r": false, "t": "`$STRING`", "key$": "objectID", "index$": 6 }, "points": { "a": true, "h": "Points", "n": "points", "r": false, "t": "`$INTEGER`", "key$": "points", "index$": 7 }, "story_id": { "a": true, "h": "Story Id", "n": "story_id", "r": false, "t": "`$INTEGER`", "key$": "story_id", "index$": 8 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": false, "t": "`$ARRAY`", "key$": "tags", "index$": 9 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 10 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 11 } }, "name": "search", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "hits_per_page", "or": "hitsPerPage", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "numeric_filter", "or": "numericFilters", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "query", "or": "query", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "tag", "or": "tags", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/search", "q": { "exist": ["query"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body.hits`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "search", "name__orig": "search", "Name": "Search", "name_": "search", "name-": "search", "NAME": "SEARCH", "index$": 1 }, { "active": true, "entity": "search", "key$": "BasicSearchFlow", "kind": "basic", "name": "BasicSearchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "search_ref01" } }] }] }, 'Search', { "GET /search": { "protocol": "http", "parameters": [{ "name": "query", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Full-text search term.", "index$": 0 }, { "name": "tags", "in": "query", "required": false, "schema": { "type": "string" }, "description": "Comma-separated record tags, such as story, comment, ask_hn, or show_hn. The API defaults to story.", "index$": 1 }, { "name": "page", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 0 }, "description": "Zero-based result page.", "index$": 2 }, { "name": "hitsPerPage", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "maximum": 100 }, "description": "Number of records returned per page.", "index$": 3 }, { "name": "numericFilters", "in": "query", "required": false, "schema": { "type": "string" }, "description": "Algolia numeric filters, for example points>100 or created_at_i>1700000000.", "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let search_ref01_data = Object.values(setup.data.existing.search)[0];
        // LIST
        const search_ref01_ent = client.Search();
        const search_ref01_match = {};
        const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/search/SearchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HackerNewsSearchSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['search01', 'search02', 'search03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HACKER_NEWS_SEARCH_TEST_SEARCH_ENTID': idmap,
        'HACKER_NEWS_SEARCH_TEST_LIVE': 'FALSE',
        'HACKER_NEWS_SEARCH_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HACKER_NEWS_SEARCH_TEST_SEARCH_ENTID'];
    const live = 'TRUE' === env.HACKER_NEWS_SEARCH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HACKER_NEWS_SEARCH_TEST_SEARCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HackerNewsSearchSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HACKER_NEWS_SEARCH_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SearchEntity.test.js.map