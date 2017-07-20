import { SuperProductivityPage } from './app.po';

describe('super-productivity App', () => {
  let page: SuperProductivityPage;

  beforeEach(() => {
    page = new SuperProductivityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
