import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "item",
    "accessor": "Item",
    "op": "load",
    "method": "GET",
    "path": "/items/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "objectID": "x",
      "story_id": 1,
      "author": "x",
      "title": "x",
      "url": "x",
      "comment_text": "x",
      "created_at": "2026-01-01T00:00:00Z",
      "created_at_i": 1,
      "points": 1,
      "num_comments": 1,
      "children": [
        1
      ],
      "_tags": [
        "x"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "search",
    "accessor": "Search",
    "op": "list",
    "method": "GET",
    "path": "/search",
    "args": [],
    "select": {
      "query": "v1",
      "hits_per_page": "v1",
      "numeric_filter": "v1",
      "page": "v1",
      "tag": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "query",
      "tags",
      "page",
      "hitsPerPage",
      "numericFilters"
    ],
    "queryArgs": [
      {
        "name": "hits_per_page",
        "wire": "hitsPerPage"
      },
      {
        "name": "numeric_filter",
        "wire": "numericFilters"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "query",
        "wire": "query"
      },
      {
        "name": "tag",
        "wire": "tags"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "hits": [
        {
          "objectID": "x",
          "story_id": 1,
          "author": "x",
          "title": "x",
          "url": "x",
          "comment_text": "x",
          "created_at": "2026-01-01T00:00:00Z",
          "created_at_i": 1,
          "points": 1,
          "num_comments": 1,
          "children": [
            1
          ],
          "_tags": [
            "x"
          ]
        }
      ],
      "nbHits": 1,
      "page": 1,
      "nbPages": 1,
      "hitsPerPage": 1,
      "query": "x",
      "processingTimeMS": 1
    },
    "idField": "id"
  },
  {
    "entity": "user",
    "accessor": "User",
    "op": "load",
    "method": "GET",
    "path": "/users/{username}",
    "args": [
      {
        "name": "id",
        "wire": "username",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "username": "x",
      "about": "x",
      "karma": 1,
      "created_at": "2026-01-01T00:00:00Z",
      "submitted": [
        1
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
