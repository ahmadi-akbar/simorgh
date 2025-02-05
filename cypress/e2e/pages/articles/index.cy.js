/* eslint-disable import/no-relative-packages */
import runTestsForPage from '#nextjs/cypress/support/helpers/runTestsForPage';
import { testsThatAlwaysRunForAllPages } from '../testsForAllPages';
import crossPlatformTests from './tests';
import ampTests from './testsForAMPOnly';
import canonicalTests from './testsForCanonicalOnly';
import liteTests from './testsForLiteOnly';

const testsForAllPagesCrossPlatform = [
  testsThatAlwaysRunForAllPages,
  crossPlatformTests,
];

const smokeCanonicalTestSuites = [
  {
    path: '/gahuza/articles/c5y51yxeg53o',
    runforEnv: ['local'],
    service: 'gahuza',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/mundo/articles/ce42wzqr2mko',
    runforEnv: ['local', 'test'],
    service: 'mundo',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/mundo/articles/ce7p1pw7165o',
    runforEnv: ['live'],
    service: 'mundo',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/news/articles/cn7k01xp8kxo',
    runforEnv: ['local'],
    service: 'news',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/persian/articles/cej3lzd5e0go',
    runforEnv: ['local', 'test'],
    service: 'persian',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/persian/articles/cld9872jgyjo',
    runforEnv: ['live'],
    service: 'persian',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/persian/articles/crgxnrdl1xvo',
    runforEnv: ['live'],
    service: 'persian',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/pidgin/articles/cgwk9w4zlg8o',
    runforEnv: ['live'],
    service: 'pidgin',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/pidgin/articles/crrrkxz2k0ko',
    runforEnv: ['test'],
    service: 'pidgin',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/pidgin/articles/cwl08rd38l6o',
    runforEnv: ['local', 'test'],
    service: 'pidgin',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/pidgin/articles/cw8qv1d11l9o',
    runforEnv: ['live'],
    service: 'pidgin',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/scotland/articles/czwj5l0n210o',
    runforEnv: ['local'],
    service: 'scotland',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/serbian/articles/c805k05kr73o/cyr',
    runforEnv: ['local'],
    service: 'serbian',
    variant: 'cyr',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/serbian/articles/c805k05kr73o/lat',
    runforEnv: ['local'],
    service: 'serbian',
    variant: 'lat',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/zhongwen/articles/c3xd4x9prgyo/simp',
    runforEnv: ['local'],
    service: 'zhongwen',
    variant: 'simp',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/zhongwen/articles/c3xd4x9prgyo/trad',
    runforEnv: ['local'],
    service: 'zhongwen',
    variant: 'trad',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
];

const nonSmokeCanonicalTestSuites = [
  {
    path: '/afaanoromoo/articles/c4g19kgl85ko',
    runforEnv: ['test'],
    service: 'afaanoromoo',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/afrique/articles/cz216x22106o',
    runforEnv: ['test'],
    service: 'afrique',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/azeri/articles/cv0lm08kngmo',
    runforEnv: ['live'],
    service: 'azeri',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/japanese/articles/cdd6p3r9g7jo',
    runforEnv: ['test'],
    service: 'japanese',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/japanese/articles/cj4m7n5nrd8o',
    runforEnv: ['live'],
    service: 'japanese',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/kyrgyz/articles/c414v42gy75o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/kyrgyz/articles/c41knv20gk7o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/kyrgyz/articles/cpgx4k72wv4o',
    runforEnv: ['live'],
    service: 'kyrgyz',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/mundo/articles/ce7p1pw7165o',
    runforEnv: ['live'],
    service: 'mundo',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },

  {
    path: '/nepali/articles/c16ljg1v008o',
    runforEnv: ['live'],
    service: 'nepali',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
  {
    path: '/ukrainian/articles/c8zv0eed9gko',
    runforEnv: ['live'],
    service: 'ukrainian',
    tests: [...testsForAllPagesCrossPlatform, canonicalTests],
  },
];

/**
 * TODO: Determine whether when running scheduled E2Es, should we run the smoke URLs too?
 * Or should we only run the non-smoke tests - and leave the smoke tests for the Simorgh CD pipeline
 */
let canonicalTestSuites = [
  ...nonSmokeCanonicalTestSuites,
  smokeCanonicalTestSuites,
];

if (Cypress.env.SMOKE) {
  canonicalTestSuites = smokeCanonicalTestSuites;
}

const ampTestSuites = canonicalTestSuites
  .map(testSuite => {
    return {
      ...testSuite,
      path: `${testSuite.path}.amp`,
      tests: [...testsForAllPagesCrossPlatform, ampTests],
    };
  })
  // Additional scenarios for news on higher environments
  .push(
    ...[
      {
        path: '/news/articles/cn7k01xp8kxo.amp',
        runforEnv: ['test', 'live'],
        service: 'news',
        tests: [...testsForAllPagesCrossPlatform, canonicalTests],
      },
      {
        path: '/news/articles/cj7xrxz0e8zo.amp',
        runforEnv: ['live'],
        service: 'news',
        tests: [...testsForAllPagesCrossPlatform, canonicalTests],
      },
    ],
  );

// eslint-disable-next-line array-callback-return, consistent-return
const liteTestSuites = canonicalTestSuites.map(testSuite => {
  if (testSuite.service !== 'news') {
    return {
      ...testSuite,
      path: `${testSuite.path}.lite`,
      tests: [liteTests],
    };
  }
});

runTestsForPage({
  pageType: 'articles',
  testSuites: [...canonicalTestSuites, ...ampTestSuites, ...liteTestSuites],
});
