// import Vue from "vue"
const version = process.env.VERSION || require("../package.json").version
const componentFiles = require.context("./components", false, /\.(js|vue)$/)

// const components = {};
const VuePixi = {
  install: function (Vue, options) {
    componentFiles.keys().forEach(key => {
      let name = "Pixi" + key.replace(/(\.\/|\.(js|vue))/g, "")
      let component = componentFiles(key).default || componentFiles(key)
      // components[name] =
      Vue.component(name, component)
    })
  },
  version: version
}

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VuePixi)
}

export default VuePixi
