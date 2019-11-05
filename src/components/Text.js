import Sprite from "./Sprite.js"
import { Text } from "pixi.js"

export default {
  mixins: [Sprite],
  props: {
    text: String,
    style: object
  },
  computed: {
    instance: () => new Text()
  },
  watch: {
    "instance": {
      handler (newInstance, oldInstance) {
        if (this.text) newInstance.text = this.text
        if (this.style) newInstance.style = this.style
      },
      immediate: true
    },
    "text": function (text) { this.instance.text = text },
    "style": function (style) { this.instance.style = style}
  }
}
