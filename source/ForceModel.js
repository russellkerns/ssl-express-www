export default class ForceModel {
  constructor(request, response, next, options) {
    this.request = request;
    this.response = response;
    this.next = next;
    this.local = request.url;
    this.removeSlash = site => site.replace(/\/$/, '');

    this.forceSsl = (options && typeof options.forceSsl !== 'undefined' && !options.forceSsl) ? options.forceSsl : true;
    this.removeWww = (options && typeof options.removeWww !== 'undefined' && !options.removeWww) ? options.removeWww : true;
  }
}
