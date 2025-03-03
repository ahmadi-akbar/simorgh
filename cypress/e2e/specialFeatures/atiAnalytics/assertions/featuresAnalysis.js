import { interceptATIAnalyticsBeacons, COMPONENTS } from '../helpers';
import { assertATIComponentClickEvent, assertATIComponentViewEvent } from '.';

const { FEATURES } = COMPONENTS;

export const assertFeaturesAnalysisComponentView = ({
  pageIdentifier,
  contentType,
}) => {
  it('should send a view event for the Features & Analysis component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="features"]').scrollIntoView({ duration: 1000 });

      assertATIComponentViewEvent({
        component: FEATURES,
        pageIdentifier,
        contentType,
      });
    });
  });
};

export const assertFeaturesAnalysisComponentClick = ({
  pageIdentifier,
  contentType,
}) => {
  it.skip('should send a click event for the Features & Analysis component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="features"]').scrollIntoView({ duration: 1000 });

      // Click on first item
      cy.get('[data-testid="features"]')
        .find('a')
        .first()
        .click({ force: true });

      assertATIComponentClickEvent({
        component: FEATURES,
        pageIdentifier,
        contentType,
      });

      // return to previous page
      cy.visit(url);
    });
  });
};
