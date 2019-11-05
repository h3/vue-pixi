import Container from "./Container.js"
import { Sprite, Texture } from "pixi.js"

export default {
  mixins: [Container],
  props: {
    anchorX: Number,
    anchorY: Number,
    blendMode: Number,
    // pluginName
    // shader
    texture: String,
    tint: Number,
    src: String
  },
  computed: {
    instance () {
      const that = this;
      return that.src && that.src !== ""
        ? Sprite.fromImage(that.src)
        : that.texture && that.texture !== ""
          ? new Sprite(Texture.from(that.texture))
          : new Sprite()
    }
  },
  watch: {
    instance: {
      handler (instance) {
        if (this.tint) instance.text = this.tint;
        if (this.blendMode) instance.blendMode = this.blendMode;
        if (this.anchorX || this.anchorY) { instance.anchor.set(this.anchorX || 0, this.anchorY || 0) }
      },
      immediate: true
    },
    tint: function (tint) {
      this.instance.tint = tint
    },
    blendMode: function (blendMode) {
      this.instance.blendMode = blendMode
    },
    anchorX: function (anchorX) {
      this.instance.anchor.x = anchorX
    },
    anchorY: function (anchorY) {
      this.instance.anchor.y = anchorY
    }
  },
  mounted () {},
  beforeDestroy () {}
}
