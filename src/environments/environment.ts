export const environment = {
  production: false,
  apiUrl: 'https://elysia.monthlyparty.com/',
  authEndpoint: {
    login: 'sign-in',
    register: 'sign-up',
    getUserInfo: 'me',
    update: 'me/update',
  },
  bucketsEndpoint:{
    getBuckets: 'buckets',
    createBucket: 'buckets',
    getBucketById: 'buckets/{id}',
    updateBucket: 'buckets/{id}',
    delete: 'buckets/{id}',
  },
  bucketitemsEndpoint:{
    createBucketItem: 'buckets/{id}/items',
    getBucketItem: 'buckets/{id}/items',
    updateBucket: 'buckets/{id}/items/{id}',
    delete: 'buckets/{id}/items/{id}',
  },
};
