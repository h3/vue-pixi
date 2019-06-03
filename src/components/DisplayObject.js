import { DisplayObject } from "pixi.js";

export default {
  props: {
    alpha: Number,
    buttonMode: Boolean,
    // cacheAsBitmap: Number,
    cursor: String,
    // filterArea: Number,
    // filters: Number,
    // hitArea: Number,
    interactive: Boolean,
    // localTransform: Number,
    // mask: Number,
    // name: Number,
    // parent: Number,
    pivotX: Number,
    pivotY: Number,
    // renderable: Number,
    rotation: Number,
    scaleX: Number,
    scaleY: Number,
    skewX: Number,
    skewY: Number,
    visible: Boolean,
    x: Number,
    y: Number
  },
  computed: {
    instance: () => new DisplayObject()
  },
  inject: ["pixiObjects"],
  provide() {
    const vm = this;
    return {
      pixiObject: {
        get inst() {
          return vm.instance;
        }
      }
    };
  },
  // created () { this.vglNamespace.update() },
  // beforeUpdate () { this.vglNamespace.update() },
  beforeDestroy() {
    [
      "added",
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
      "removed",
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

    const { pixiObjects, instance, name } = this;
    if (instance.parent) instance.parent.removeChild(instance);
    if (pixiObjects[name] === instance) delete pixiObjects[name];
    // vglNamespace.update();
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
  watch: {
    instance: {
      handler(newInstance, oldInstance) {
        if (oldInstance && oldInstance.parent)
          oldInstance.parent.removeChild(oldInstance);
        if (this.$parent.instance) this.$parent.instance.addChild(newInstance);
        if (this.x) newInstance.x = this.x;
        if (this.y) newInstance.y = this.y;
        if (this.alpha) newInstance.alpha = this.alpha;
        if (this.buttonMode) newInstance.buttonMode = this.buttonMode;
        if (this.cursor) newInstance.cursor = this.cursor;
        if (this.interactive) newInstance.interactive = this.interactive;
        if (this.rotation) newInstance.rotation = this.rotation;
        if (this.visible) newInstance.visible = this.visible;
        if (this.skewX || this.skewY)
          newInstance.skew.set(this.skewX || 1, this.skewY || 1);
        if (this.scaleX || this.scaleY)
          newInstance.scale.set(this.scaleX || 1, this.scaleY || 1);
        if (this.pivotX || this.pivotY)
          newInstance.pivot.set(this.pivotX || 1, this.pivotY || 1);
        if (this.name !== undefined) this.pixiObjects[this.name] = newInstance;
      },
      immediate: true
    },
    "$parent.instance": function parentInstance(instance) {
      this.instance.setParent(instance);
    },
    x: function(x) {
      this.instance.x = x;
    },
    y: function(y) {
      this.instance.y = y;
    },
    alpha: function(alpha) {
      this.instance.alpha = alpha;
    },
    buttonMode: function(buttonMode) {
      this.instance.buttonMode = buttonMode;
    },
    cursor: function(cursor) {
      this.instance.cursor = cursor;
    },
    interactive: function(interactive) {
      this.instance.interactive = interactive;
    },
    rotation: function(rotation) {
      this.instance.rotation = rotation;
    },
    visible: function(visible) {
      this.instance.visible = visible;
    },
    skewX: function(skewX) {
      this.instance.skew.x = skewX;
    },
    skewY: function(skewY) {
      this.instance.skew.y = skewY;
    },
    scaleX: function(scaleX) {
      this.instance.scale.x = scaleX;
    },
    scaleY: function(scaleY) {
      this.instance.scale.y = scaleY;
    },
    pivotX: function(pivotX) {
      this.instance.pivot.x = pivotX;
    },
    pivotY: function(pivotY) {
      this.instance.pivot.y = pivotY;
    },
    name(newName, oldName) {
      const { pixiObjects, instance } = this;
      if (pixiObjects[oldName] === instance) delete pixiObjects[oldName];
      pixiObjects[newName] = instance;
    }
  }
};
