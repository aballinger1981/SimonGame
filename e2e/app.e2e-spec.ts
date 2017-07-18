import { SimonGamePage } from './app.po';

describe('simon-game App', () => {
  let page: SimonGamePage;

  beforeEach(() => {
    page = new SimonGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
