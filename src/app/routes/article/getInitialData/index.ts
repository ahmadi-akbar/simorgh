/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Agent } from 'https';
import pipe from 'ramda/src/pipe';
import Url from 'url-parse';
import getRecommendationsUrl from '#app/lib/utilities/getUrlHelpers/getRecommendationsUrl';
import getAdditionalPageData from '#app/routes/cpsAsset/utils/getAdditionalPageData';
import nodeLogger from '../../../lib/logger.node';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import { BFF_FETCH_ERROR } from '../../../lib/logger.const';
import fetchPageData from '../../utils/fetchPageData';
import { Services, Variants } from '../../../models/types/global';

const logger = nodeLogger(__filename);

const removeAmp = (path: string) => path.split('.')[0];
const getOptimoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}o)/)?.[1];
const getCpsId = (path: string) => path;

const getId = (pageType: string) =>
  pipe(getUrlPath, removeAmp, pageType === 'article' ? getOptimoId : getCpsId);

const getEnvironment = (pathname: string) => {
  if (pathname.includes('renderer_env=test')) {
    return 'test';
  }
  if (pathname.includes('renderer_env=live')) {
    return 'live';
  }

  return process.env.SIMORGH_APP_ENV;
};

interface BFFError extends Error {
  status: number;
}

const handleError = (message: string, status: number) => {
  const error = new Error(message) as BFFError;
  error.status = status;

  return error;
};

type Props = {
  getAgent: () => Promise<Agent>;
  service: Services;
  path: string;
  pageType: 'article' | 'cpsAsset';
  variant?: Variants;
};

export default async ({
  getAgent,
  service,
  pageType,
  path: pathname,
  variant,
}: Props) => {
  try {
    const env = getEnvironment(pathname);
    const isLocal = !env || env === 'local';

    const agent = !isLocal ? await getAgent() : null;
    const id = getId(pageType)(pathname);

    if (!id) throw handleError('Article ID is invalid', 500);

    let fetchUrl = Url(process.env.BFF_PATH as string).set('query', {
      id,
      service,
      ...(variant && {
        variant,
      }),
      pageType,
    });

    const optHeaders = { 'ctx-service-env': env };

    if (isLocal) {
      if (pageType === 'article') {
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
      }

      if (pageType === 'cpsAsset') {
        fetchUrl = Url(id);
      }
    }

    // @ts-ignore - Ignore fetchPageData argument types
    // eslint-disable-next-line prefer-const
    let { status, json } = await fetchPageData({
      path: fetchUrl.toString(),
      ...(!isLocal && { agent, optHeaders }),
    });

    const wsojURL = getRecommendationsUrl({
      assetUri: pathname.replace(/(\.|\?).*/g, ''),
      engine: 'unirecs_datalab',
      engineVariant: '',
    });

    let wsojData = [];
    try {
      // @ts-ignore - Ignore fetchPageData argument types
      const { json: wsojJson = [] } = await fetchPageData({
        path: wsojURL,
        ...{ agent, optHeaders },
      });
      wsojData = wsojJson;
    } catch (error) {
      logger.error('Recommendations JSON malformed', error);
    }

    // Ensure all local CPS fixture and test data is in the correct format
    if (isLocal && pageType === 'cpsAsset') {
      const secondaryData = await getAdditionalPageData({
        pageData: json,
        service,
        variant,
        env,
      });

      json = {
        data: {
          article: json,
          // Checks for data mocked in tests, or data from fixture data
          secondaryData: json?.secondaryData ?? {
            topStories: secondaryData?.secondaryColumn?.topStories,
            features: secondaryData?.secondaryColumn?.features,
            mostRead: secondaryData?.mostRead,
            mostWatched: secondaryData?.mostWatched,
          },
        },
      };
    }

    if (!json?.data?.article) {
      throw handleError('Article data is malformed', 500);
    }

    const {
      data: { article, secondaryData },
    } = json;

    return {
      status,
      pageData: {
        ...article,
        secondaryColumn: secondaryData,
        recommendations: wsojData,
      },
    };
  } catch ({ message, status }) {
    logger.error(BFF_FETCH_ERROR, {
      service,
      status,
      pathname,
      message,
    });
    return { error: message, status };
  }
};
