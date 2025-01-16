/* eslint-disable no-console */
import { useContext, useCallback, useState } from 'react';

import { EventTrackingContext } from '../../contexts/EventTrackingContext';
import useTrackingToggle from '../useTrackingToggle';
import OPTIMIZELY_CONFIG from '../../lib/config/optimizely';
import { sendEventBeacon } from '../../components/ATIAnalytics/beacon/index';
import { ServiceContext } from '../../contexts/ServiceContext';
import { isValidClick } from './clickTypes';

const EVENT_TYPE = 'click';

const useClickTrackerHandler = (props = {}) => {
  const preventNavigation = props?.preventNavigation;
  const componentName = props?.componentName;
  const url = props?.url;
  const advertiserID = props?.advertiserID;
  const format = props?.format;
  const optimizely = props?.optimizely;
  const optimizelyMetricNameOverride = props?.optimizelyMetricNameOverride;
  const detailedPlacement = props?.detailedPlacement;

  const { trackingIsEnabled } = useTrackingToggle(componentName);
  const [clicked, setClicked] = useState(false);
  const eventTrackingContext = useContext(EventTrackingContext);

  const { pageIdentifier, platform, producerId, statsDestination } =
    eventTrackingContext;
  const campaignID = props?.campaignID || eventTrackingContext?.campaignID;

  const { service } = useContext(ServiceContext);

  return useCallback(
    async event => {
      const shouldRegisterClick = [
        trackingIsEnabled,
        !clicked,
        isValidClick(event),
      ].every(Boolean);
      if (shouldRegisterClick) {
        setClicked(true);

        const shouldSendEvent = [
          campaignID,
          componentName,
          pageIdentifier,
          platform,
          producerId,
          service,
          statsDestination,
        ].every(Boolean);
        if (shouldSendEvent) {
          const nextPageUrl = event?.currentTarget?.href;

          event.stopPropagation();
          event.preventDefault();

          if (optimizely) {
            const eventName = OPTIMIZELY_CONFIG.viewClickAttributeId;

            const overrideAttributes = {
              ...optimizely.user.attributes,
              [`clicked_${eventName}`]: true,
            };

            optimizely.track(
              optimizelyMetricNameOverride
                ? `${optimizelyMetricNameOverride}_clicks`
                : 'component_clicks',
              optimizely.user.id,
              overrideAttributes,
            );
          }

          const optimizelyVariation =
            optimizely?.getVariation(OPTIMIZELY_CONFIG.ruleKey) || null;

          try {
            await sendEventBeacon({
              type: EVENT_TYPE,
              campaignID,
              componentName,
              format,
              pageIdentifier,
              platform,
              producerId,
              service,
              advertiserID,
              statsDestination,
              url,
              detailedPlacement,
              ...(optimizelyVariation &&
                optimizelyVariation !== 'off' && {
                  experimentVariant: optimizelyVariation,
                }),
            });
          } finally {
            if (nextPageUrl && !preventNavigation) {
              if (optimizely) {
                optimizely.close();
              }
              window.location.assign(nextPageUrl);
            }
          }
        }
      }
    },
    [
      trackingIsEnabled,
      clicked,
      campaignID,
      componentName,
      pageIdentifier,
      platform,
      preventNavigation,
      producerId,
      service,
      statsDestination,
      url,
      advertiserID,
      format,
      optimizely,
      optimizelyMetricNameOverride,
      detailedPlacement,
    ],
  );
};

export default useClickTrackerHandler;
