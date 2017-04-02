import { DownloadOnePage } from './app.po';

describe('download-one App', () => {
  let page: DownloadOnePage;

  beforeEach(() => {
    page = new DownloadOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('do works!');
  });
});
