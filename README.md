# Hacker News Search SDK

An unofficial TypeScript SDK for searching Hacker News stories and comments, loading item details, and reading user profiles through Algolia's public Hacker News Search API.

Generated with [Voxgig SDK Generator](https://github.com/voxgig/sdkgen) from the OpenAPI definition in [`.sdk/def/openapi.yaml`](.sdk/def/openapi.yaml). The upstream service does not require an API key for these endpoints.

## Quickstart

```bash
cd ts
npm install
```

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

Search options include `query`, `tag`, `page`, `hits_per_page`, and `numeric_filter`. The SDK maps these to the API's query parameter names.

Item details can include a full nested comment tree, so the response may be large. Search hits also vary by type; fields such as `title`, `points`, and `comment_text` are optional.

## Build and verify

```bash
npm test
```

This builds the TypeScript SDK and runs its offline test suite. A live smoke check against the public API was also run while preparing this project.

## Regenerate

The `.sdk/` directory contains the OpenAPI model, templates, and generator configuration. From `.sdk/`, install its dependencies once and regenerate with:

```bash
npm install
npm run generate
```

## Project notes

See [OBSERVATIONS.md](OBSERVATIONS.md) for the API selection, scope, and findings from using the generator.

This community SDK is not affiliated with or endorsed by Hacker News or Algolia. Licensed under MIT; see [LICENSE](LICENSE).
