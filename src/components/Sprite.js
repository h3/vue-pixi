import Container from "./Container.js";
import { Sprite, Texture } from "pixi.js";

export default {
  mixins: [Container],
  props: {
    anchorX: Number,
    anchorY: Number,
    blendMode: Number,
    buttonMode: Boolean,
    interactive: Boolean,
    // pluginName
    // shader
    texture: String,
    tint: Number,
    src: String
  },
  computed: {
    instance() {
      return this.src && this.src !== ""
        ? new Sprite.fromImage(this.src)
        : this.texture && this.texture !== ""
        ? new Sprite(Texture.from(this.texture))
        : new Sprite();
    }
  },
  watch: {
    instance: {
      handler(instance) {
        if (this.tint) instance.text = this.tint;
        if (this.blendMode) instance.blendMode = this.blendMode;
        if (this.anchorX || this.anchorY)
          instance.anchor.set(this.anchorX || 0, this.anchorY || 0);
      },
      immediate: true
    },
    tint: function(tint) {
      this.instance.tint = tint;
    },
    blendMode: function(blendMode) {
      this.instance.blendMode = blendMode;
    },
    buttonMode: function(buttonMode) {
      this.instance.buttonMode = buttonMode;
    },
    anchorX: function(anchorX) {
      this.instance.anchor.x = anchorX;
    },
    anchorY: function(anchorY) {
      this.instance.anchor.y = anchorY;
    },
    interactive: function(interactive) {
      this.instance.interactive = interactive;
    }
  },
  mounted() {
    [
      "click",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseover",
      "mouseup",
      "mouseupoutside",
      "pointercancel",
      "pointerdown",
      "pointermove",
      "pointerout",
      "pointerover",
      "pointertap",
      "pointerup",
      "pointerupoutside",
      "rightclick",
      "rightdown",
      "rightup",
      "rightupoutside",
      "tap",
      "touchcancel",
      "touchend",
      "touchendoutside",
      "touchmove",
      "touchstart"
    ].forEach(eventName => {
      this.instance.on(eventName, e => this.$emit(eventName, e));
    });
  },
  beforeDestroy() {
    [
      "click",
      "mousedown",
      "mousemove",
      "mouseout",
      "mouseover",
      "mouseup",
      "mouseupoutside",
      "pointercancel",
      "pointerdown",
      "pointermove",
      "pointerout",
      "pointerover",
      "pointertap",
      "pointerup",
      "pointerupoutside",
      "rightclick",
      "rightdown",
      "rightup",
      "rightupoutside",
      "tap",
      "touchcancel",
      "touchend",
      "touchendoutside",
      "touchmove",
      "touchstart"
    ].forEach(eventName => {
      this.instance.off(eventName, () => this.$emit(eventName, this.instance));
    });
  }
};
