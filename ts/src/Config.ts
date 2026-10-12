
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'HackerNewsSearch',
        slug: "hacker-news-search",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://hn.algolia.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        item: {
        },
  
        search: {
        },
  
        user: {
        },
  
    }
  }


  entity = {
    "item": {
      "fields": [
        {
          "name": "author",
          "title": "Author",
          "type": "`$STRING`"
        },
        {
          "name": "children",
          "title": "Children",
          "type": "`$ARRAY`"
        },
        {
          "name": "comment_text",
          "title": "Comment Text",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "created_at_i",
          "title": "Created At I",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "num_comments",
          "title": "Num Comments",
          "type": "`$INTEGER`"
        },
        {
          "name": "objectID",
          "title": "Object Id",
          "type": "`$STRING`"
        },
        {
          "name": "points",
          "title": "Points",
          "type": "`$INTEGER`"
        },
        {
          "name": "story_id",
          "title": "Story Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "tags",
          "title": "Tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "item",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/items/{id}",
              "segments": [
                {
                  "lit": "items"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "items",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "author",
          "title": "Author",
          "type": "`$STRING`"
        },
        {
          "name": "children",
          "title": "Children",
          "type": "`$ARRAY`"
        },
        {
          "name": "comment_text",
          "title": "Comment Text",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "created_at_i",
          "title": "Created At I",
          "type": "`$INTEGER`"
        },
        {
          "name": "num_comments",
          "title": "Num Comments",
          "type": "`$INTEGER`"
        },
        {
          "name": "objectID",
          "title": "Object Id",
          "type": "`$STRING`"
        },
        {
          "name": "points",
          "title": "Points",
          "type": "`$INTEGER`"
        },
        {
          "name": "story_id",
          "title": "Story Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "tags",
          "title": "Tags",
          "type": "`$ARRAY`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "format": "uri"
        }
      ],
      "name": "search",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.hits`"
              },
              "args": {
                "query": [
                  {
                    "name": "hits_per_page",
                    "orig": "hitsPerPage",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "numeric_filter",
                    "orig": "numericFilters",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "tag",
                    "orig": "tags",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "query"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "user": {
      "fields": [
        {
          "name": "about",
          "title": "About",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "title": "Created At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "karma",
          "title": "Karma",
          "type": "`$INTEGER`"
        },
        {
          "name": "submitted",
          "title": "Submitted",
          "type": "`$ARRAY`"
        },
        {
          "name": "username",
          "title": "Username",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "user",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/users/{username}",
              "segments": [
                {
                  "lit": "users"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "users",
                "{id}"
              ],
              "rename": {
                "param": {
                  "username": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "username",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

