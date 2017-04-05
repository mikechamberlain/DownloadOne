import { browser, element, by } from 'protractor';

export class DownloadOnePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dl-root h1')).getText();
  }
}
