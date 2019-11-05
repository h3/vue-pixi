import Sprite from "./Sprite.js"
import { Text } from "pixi.js"

export default {
  mixins: [Sprite],
  props: {
    text: String,
    textStyle: Object
  },
  computed: {
    instance: () => new Text()
  },
  watch: {
    "instance": {
      handler (newInstance, oldInstance) {
        if (this.text) newInstance.text = this.text
        if (this.textStyle) newInstance.style = this.textStyle
      },
      immediate: true
    },
    "text": function (text) { this.instance.text = text },
    "textStyle": function (textStyle) { this.instance.style = textStyle}
  }
}
