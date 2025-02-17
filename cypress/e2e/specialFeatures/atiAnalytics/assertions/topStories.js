import {
  awaitATIComponentView,
  interceptATIAnalyticsBeacons,
  COMPONENTS,
  awaitATIComponentClick,
} from '../helpers';

const { TOP_STORIES } = COMPONENTS;

export const assertTopStoriesComponentView = () => {
  it('should send a view beacon for the Top Stories component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="top-stories"]').scrollIntoView({ duration: 1000 });
      awaitATIComponentView(TOP_STORIES);
    });
  });
};

export const assertTopStoriesComponentClick = () => {
  it('should send a click beacon for the Top Stories component', () => {
    cy.url().then(url => {
      interceptATIAnalyticsBeacons();
      cy.visit(url);

      cy.get('[data-testid="top-stories"]').scrollIntoView({ duration: 1000 });

      // Click on first item
      cy.get('[data-testid="top-stories"]').find('a').first().click();

      awaitATIComponentClick(TOP_STORIES);

      // return to previous page
      cy.visit(url);
    });
  });
};
