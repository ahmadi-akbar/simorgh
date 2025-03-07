import { Environments, Services } from '#app/models/types/global';
import getStatsDestination from '.';

describe('getStatsDestination', () => {
  const testScenarios = [
    {
      isUK: true,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'news',
      expected: 'NEWS_GNL',
      summary: 'should return for News live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'news',
      expected: 'NEWS_GNL_TEST',
      summary: 'should return for News test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'news',
      expected: 'NEWS_PS_TEST',
      summary: 'should return for News test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'news',
      expected: 'NEWS_PS',
      summary: 'should return for News live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES_TEST',
      summary: 'should return for WS test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'persian',
      expected: 'WS_NEWS_LANGUAGES',
      summary: 'should return for WS live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Wales live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Wales test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Wales live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Wales test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Wales live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Wales live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Wales test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Wales test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'cymrufyw',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Wales test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Naidheachdan live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Naidheachdan test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Naidheachdan live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Naidheachdan test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Naidheachdan live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS',
      summary: 'should return for Naidheachdan live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Naidheachdan test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Naidheachdan test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'naidheachdan',
      expected: 'NEWS_LANGUAGES_PS_TEST',
      summary: 'should return for Naidheachdan test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL',
      summary: 'should return for Japanese live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'japanese',
      expected: 'NEWS_LANGUAGES_GNL_TEST',
      summary: 'should return for Japanese test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'scotland',
      expected: 'PS_HOMEPAGE',
      summary: 'should return for Scotland live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'scotland',
      expected: 'PS_HOMEPAGE_TEST',
      summary: 'should return for Scotland test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'scotland',
      expected: 'PS_HOMEPAGE',
      summary: 'should return for Scotland live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'scotland',
      expected: 'PS_HOMEPAGE_TEST',
      summary: 'should return for Scotland test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'scotland',
      expected: 'PS_HOMEPAGE',
      summary: 'should return for Scotland live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'scotland',
      expected: 'PS_HOMEPAGE',
      summary: 'should return for Scotland live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'scotland',
      expected: 'PS_HOMEPAGE_TEST',
      summary: 'should return for Scotland test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'scotland',
      expected: 'PS_HOMEPAGE_TEST',
      summary: 'should return for Scotland test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'scotland',
      expected: 'PS_HOMEPAGE_TEST',
      summary: 'should return for Scotland test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS',
      summary: 'should return for Archive live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS_TEST',
      summary: 'should return for Archive test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS',
      summary: 'should return for Archive live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS_TEST',
      summary: 'should return for Archive test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS',
      summary: 'should return for Archive live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS',
      summary: 'should return for Archive live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS_TEST',
      summary: 'should return for Archive test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS_TEST',
      summary: 'should return for Archive test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'archive',
      expected: 'BBC_ARCHIVE_PS_TEST',
      summary: 'should return for Archive test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'newsround',
      expected: 'NEWSROUND',
      summary: 'should return for Newsround live UK',
    },
    {
      isUK: true,
      env: 'test',
      service: 'newsround',
      expected: 'NEWSROUND_TEST',
      summary: 'should return for Newsround test UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'newsround',
      expected: 'NEWSROUND',
      summary: 'should return for Newsround live international',
    },
    {
      isUK: false,
      env: 'test',
      service: 'newsround',
      expected: 'NEWSROUND_TEST',
      summary: 'should return for Newsround test international',
    },
    {
      isUK: null,
      env: 'live',
      service: 'newsround',
      expected: 'NEWSROUND',
      summary: 'should return for Newsround live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'newsround',
      expected: 'NEWSROUND',
      summary: 'should return for Newsround live UK when isUK is undefined',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'newsround',
      expected: 'NEWSROUND_TEST',
      summary: 'should return for Newsround test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'newsround',
      expected: 'NEWSROUND_TEST',
      summary: 'should return for Newsround test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'newsround',
      expected: 'NEWSROUND_TEST',
      summary: 'should return for Newsround test UK when env undefined',
    },
    {
      isUK: true,
      env: 'live',
      service: 'sport',
      expected: 'SPORT_PS',
      summary: 'should return for Sport live UK',
    },
    {
      isUK: false,
      env: 'live',
      service: 'sport',
      expected: 'SPORT_GNL',
      summary: 'should return for Sport live international',
    },
    {
      isUK: true,
      env: 'test',
      service: 'sport',
      expected: 'SPORT_PS_TEST',
      summary: 'should return for Sport test UK',
    },
    {
      isUK: false,
      env: 'test',
      service: 'sport',
      expected: 'SPORT_GNL_TEST',
      summary: 'should return for Sport test international',
    },
    {
      isUK: true,
      env: 'foobar',
      service: 'sport',
      expected: 'SPORT_PS_TEST',
      summary: 'should return for Sport test UK when env unknown',
    },
    {
      isUK: true,
      env: null,
      service: 'sport',
      expected: 'SPORT_PS_TEST',
      summary: 'should return for Sport test UK when env null',
    },
    {
      isUK: true,
      env: undefined,
      service: 'sport',
      expected: 'SPORT_PS_TEST',
      summary: 'should return for Sport test UK when env undefined',
    },
    {
      isUK: null,
      env: 'live',
      service: 'sport',
      expected: 'SPORT_PS',
      summary: 'should return for Sport live UK when isUK is null',
    },
    {
      isUK: undefined,
      env: 'live',
      service: 'sport',
      expected: 'SPORT_PS',
      summary: 'should return for Sport live UK when isUK is undefined',
    },
  ];

  testScenarios.forEach(({ isUK, env, service, expected, summary }) => {
    it(summary, () => {
      const statsDestination = getStatsDestination({
        isUK,
        env: env as Environments,
        service: service as Services,
      });
      expect(statsDestination).toEqual(expected);
    });
  });
});
