import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { PODCAST_PROMO } = COMPONENTS;

export const assertPodcastPromoComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Podcast Promo component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: PODCAST_PROMO,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertPodcastPromoComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Podcast Promo component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="podcast-promo"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-e2e="podcast-promo"]')
        .find('a')
        .last()
        .click({ force: true });

      assertATIComponentClickEvent({
        component: PODCAST_PROMO,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
