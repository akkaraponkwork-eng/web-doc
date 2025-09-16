import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TON Platform",
  description: "A VitePress Site",
  head: [
    // ใช้ URL ภายนอก (เช่น CDN)
    ['link', { rel: 'icon', href: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tLbxOLtmXyAbxPImJPT9LkLX6WHCXPyUFw&s' }]
  ],
  themeConfig: {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tLbxOLtmXyAbxPImJPT9LkLX6WHCXPyUFw&s',  // โลโก้ของเว็บไซต์
    // https://vitepress.dev/reference/default-theme-config
    // nav: [ //nav bar
    //   { text: 'Home', link: '/' }
    //   { text: '🚀 Getting Started', link: 'gettingstarted_page/introduction' },
    //   { text: 'Datastream', link: 'datastream_page/datastream' },
    //   { text: 'Mqtt', link: 'example/markdown-examples' },
    //   { text: 'Sigfox', link: 'example/markdown-examples' },
    // ],

    sidebar: [  //side bar page
      {
        text: '🚀 Getting Started',
          // เมนูย่อยจะถูกซ่อนไว้
        items: [
          { text: '😸 What is TON Platform ?', link: '/gettingstarted_page/what-is-ton-platform' },
          { text: '⏱️ Quick Start', link: '/gettingstarted_page/quick_start' },
          {
            text: '🧑🏻‍💻 มารู้จัก "Job" กันเถอะ',
            collapsed: true,
            items: [
              { text: '🌍 What is job ?', link: '/job_page/overview' },
              { text: '📄 Job structure', link: '/job_page/jobstructure' },
              { text: '📥 Trigger type', link: '/job_page/trigger' },
              { text: '⚙️ Plugin lists', link: '/job_page/plugin' },
              { text: '🔁 Data model', link: '/job_page/datamodel' },
              { text: '🛠️ Data job', link: '/job_page/datajob' }

            ]
          },
          {
            text: '💻 DataStream',
            collapsed: true,
            items: [
              { text: '🛠️ Overview', link: 'datastream_page/datastream' },
            ]
          },
          {
            text: '📄 Doc job & Doc API',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'docjob_page/overview' },
            ]
          },
          {
            text: '🛠️ Tools',
          },
          {
            text: '📈 Grafana',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'grafana_page/overview' },
            ]
          },
          {
            text: '🚀 Postman',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'postman_page/overview' }
            ]
          },
          {
            text: '💾 Influx DB',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'influxdb_page/overview' },
            ]
          },
          {
            text: '📡 Node-red',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'nodered_page/overview' }
            ]
          },
          {
            text: '💬 Line Messaging API',
            collapsed: true,
            items: [
              { text: 'Overview', link: 'linemessage_page/overview' }
            ]
          },
          {
            text: '🧑🏻‍💻 Tutorials',
            collapsed: true,
            items: [
              { text: 'Tutorial', link: 'tutorial_page/tutorial' }
            ]
          },
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
