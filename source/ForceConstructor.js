import ForceModel from './ForceModel';

export default class ForceConstructor extends ForceModel {
  render() {
    const schema = (this.request.headers['x-forwarded-proto'] || '').toLowerCase();
    const www = this.removeWww ? this.request.headers.host.replace(/www\./gi, '') : this.request.headers.host;
    const fullUrl = `${this.forceSsl ? 'https' : schema}://${www}${this.local}`;
    const notLocalHost = () => www.indexOf('localhost') < 0;

    if (notLocalHost() && schema !== 'https') {
      return this.response.redirect(this.removeSlash(fullUrl));
    } else if (notLocalHost() && /^www\./i.test(this.request.headers.host) && schema === 'https') {
      return this.response.redirect(this.removeSlash(fullUrl));
    } else if (notLocalHost() && /\/$/.test(fullUrl) && fullUrl !== `https://${www}/`) {
      return this.response.redirect(this.removeSlash(fullUrl));
    }

    return this.next();
  }
}
