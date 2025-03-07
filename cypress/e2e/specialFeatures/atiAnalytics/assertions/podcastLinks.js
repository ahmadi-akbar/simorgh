import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { PODCAST_LINKS } = COMPONENTS;

export const assertPodcastLinksComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Podcast Links component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="podcast-links"]').scrollIntoView({
        duration: 1000,
      });

      assertATIComponentViewEvent({
        component: PODCAST_LINKS,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertPodcastLinksComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Podcast Links component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-e2e="podcast-links"]').scrollIntoView({
        duration: 1000,
      });

      // Click on the RSS link
      cy.get('[data-e2e="podcast-links"]')
        .contains('RSS')
        .click({ force: true });

      assertATIComponentClickEvent({
        component: PODCAST_LINKS,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
