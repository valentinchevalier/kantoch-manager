import Vue from 'vue';

Vue.directive('long-press', {
  bind(el, binding, vnode) {
    vnode.timeout = null;

    const longPressDuration = binding.value ? binding.value : 500;

    vnode.onmouseup = () => {
      clearTimeout(vnode.timeout);
      document.removeEventListener('mouseup', vnode.onmouseup);
    };

    vnode.ontouchend = () => {
      clearTimeout(vnode.timeout);
      document.removeEventListener('touchend', vnode.ontouchend);
    };

    vnode.onmousedown = () => {
      document.addEventListener('mouseup', vnode.onmouseup);

      vnode.timeout = setTimeout(() => {
        const longPressEvent = new Event('long-press');

        el.dispatchEvent(longPressEvent);
      }, longPressDuration);
    };

    vnode.ontouchstart = () => {
      document.addEventListener('touchend', vnode.ontouchend);

      vnode.timeout = setTimeout(() => {
        const longPressEvent = new Event('long-press');

        el.dispatchEvent(longPressEvent);
      }, longPressDuration);
    };

    el.addEventListener('mousedown', vnode.onmousedown);
    el.addEventListener('touchstart', vnode.ontouchstart);
  },
  unbind(el, binding, vnode) {
    clearTimeout(vnode.timeout);
    el.removeEventListener('mousedown', vnode.onmousedown);
    document.removeEventListener('mouseup', vnode.onmouseup);
    el.removeEventListener('mousedown', vnode.ontouchstart);
    document.removeEventListener('mouseup', vnode.ontouchend);
  },
});
