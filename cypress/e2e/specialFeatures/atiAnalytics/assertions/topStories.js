import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { TOP_STORIES } = COMPONENTS;

export const assertTopStoriesComponentView = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a view event for the Top Stories component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="top-stories"]').scrollIntoView({ duration: 1000 });

      assertATIComponentViewEvent({
        component: TOP_STORIES,
        pageIdentifier,
        contentType,
        useReverb,
      });
    });
  });
};

export const assertTopStoriesComponentClick = ({
  pageIdentifier,
  contentType,
  useReverb,
}) => {
  it('should send a click event for the Top Stories component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="top-stories"]').scrollIntoView({
        duration: 1000,
      });

      // Click on first item
      cy.get('[data-testid="top-stories"]').find('a').first().click();

      assertATIComponentClickEvent({
        component: TOP_STORIES,
        pageIdentifier,
        contentType,
        useReverb,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
