module.exports = {
  title: "CSC3206 AI Assignment 1 (2020-08)",
  base: "/water-measuring-puzzle/",
  dest: "../docs",
  head: [
    ["link", { rel: "stylesheet", href: "https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css" }],
  ],
  themeConfig: {
    nav: [],
    sidebarDepth: 2,
    sidebar: [
      '/',
      'problem',
      'instructions',
      'test-environment',
      'loading-code',
      'interface-explained'
      // 'testing',
      // 'solving-maze',
      // 'maze-creator',
    ],
    lastUpdated: 'Last Updated'
  },
  markdown: {
    lineNumbers: true
  },
}