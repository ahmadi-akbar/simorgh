import getRecommendationsUrl from '.';

describe('getRecommendationsUrl - getRecommendationsUrl', () => {
  beforeEach(() => {
    process.env.RECOMMENDATIONS_ENDPOINT = 'http://mock-recommendations-path';
  });
  afterEach(() => {
    delete process.env.RECOMMENDATIONS_ENDPOINT;
  });
  it('should return endpoint when passed assetUri', () => {
    expect(getRecommendationsUrl({ assetUri: '/mundo/123456' })).toBe(
      'http://mock-recommendations-path/recommendations/mundo/123456',
    );
  });
  it('should return endpoint when passed assetUri and engine', () => {
    expect(
      getRecommendationsUrl({
        assetUri: '/mundo/123456',
        engine: 'unirecs_datalab',
      }),
    ).toBe(
      'http://mock-recommendations-path/recommendations/mundo/123456?Engine=unirecs_datalab',
    );
  });
});
