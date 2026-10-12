
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HackerNewsSearchSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HackerNewsSearchSDK.test()
    equal(testsdk instanceof HackerNewsSearchSDK, true,
      'HackerNewsSearchSDK.test() must return a client synchronously')
  })

})
