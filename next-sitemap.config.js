/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zencount.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404'],
};
