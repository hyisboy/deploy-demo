/*
 * @Descripttion: 
 * @version: 
 * @Author: david
 * @Date: 2020-07-06 19:41:05
 * @LastEditors: david
 * @LastEditTime: 2020-07-06 21:59:35
 */ 
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
