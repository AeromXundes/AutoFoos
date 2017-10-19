import { FoosPage } from './app.po';

describe('foos App', function() {
  let page: FoosPage;

  beforeEach(() => {
    page = new FoosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
