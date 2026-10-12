# Hacker News Search SDK for TypeScript

Use this package to search Hacker News stories, comments, and other records, then load an item or user profile. The client was generated from OpenAPI with [Voxgig SDK Generator](https://github.com/voxgig/sdkgen).

## Install

From a clone of this repository:

```bash
npm install
```

The package is not published to npm yet. After a release, install it with:

```bash
npm install hacker-news-search-sdk
```

## Search

```ts
import { HackerNewsSearchSDK } from 'hacker-news-search-sdk'

const client = new HackerNewsSearchSDK()
const stories = await client.Search().list({
  query: 'typescript',
  tag: 'story',
  hits_per_page: 5,
})

for (const story of stories) {
  const data = story.data()
  console.log(data.title, data.points)
}

const first = stories[0]?.data()

if (first?.story_id) {
  const item = await client.Item().load({ id: first.story_id })
  console.log(item.data().title)
}

if (first?.author) {
  const user = await client.User().load({ id: first.author })
  console.log(user.data().karma)
}
```

The search match fields are `query`, `tag`, `page`, `hits_per_page`, and `numeric_filter`. Use `tag: 'comment'` to search comments. Story and comment records have different fields, so response fields are optional.

Item details can include nested comments. A popular discussion may return a large tree.

## Build and test

```bash
npm test
```

The default suite uses the SDK's offline test mode. No API key is required for the covered public API endpoints.
