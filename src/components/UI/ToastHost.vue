<template>
  <div class="toast-host">
    <transition-group name="toast">
      <div v-for="t in items" :key="t.id" :class="['toast', t.type]" @click="dismiss(t.id)">
        {{ t.text }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import { computed } from 'vue'
import { toastState, dismissToast } from '../../toast.js'

export default {
  name: 'ToastHost',
  setup() {
    const items = computed(() => toastState.items)
    return { items, dismiss: dismissToast }
  }
}
</script>

<style scoped lang="scss">
@import "../../variables";
.toast-host {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 360px;
}
.toast {
  padding: 14px 18px;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .18);
  cursor: pointer;
  background: $c_blue;
}
.toast.error { background: #d64545; }
.toast.success { background: #2e9e5b; }
.toast-enter-active, .toast-leave-active { transition: all .25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(24px); }
</style>
