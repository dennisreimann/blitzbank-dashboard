<template>
  <div class="loading">
    <div /><div /><div /><div />
    <div
      aria-live="assertive"
      role="alert"
      class="visually-hidden"
    >
      Loading data.
    </div>
  </div>
</template>

<style scoped>
.loading {
  --animation-duration: var(--animation-duration-slow);
  --height: calc(var(--dot-size) * 1.5);
  display: inline-block;
  position: relative;
  width: calc(var(--dot-size) * 5);
  min-height: var(--height);
}

.loading div {
  position: absolute;
  top: calc(var(--height) / 2 - var(--dot-size) / 2);
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background: var(--color-neutral-40);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loading div:nth-child(1) {
  left: calc(var(--dot-size) / 2);
  animation: loading1 var(--animation-duration) infinite;
}

.loading div:nth-child(2) {
  left: calc(var(--dot-size) / 2);
  animation: loading2 var(--animation-duration) infinite;
}

.loading div:nth-child(3) {
  left: calc(var(--dot-size) * 2);
  animation: loading2 var(--animation-duration) infinite;
}

.loading div:nth-child(4) {
  left: calc(var(--dot-size) * 3.5);
  animation: loading3 var(--animation-duration) infinite;
}

@keyframes loading1 {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes loading2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(var(--dot-size) * 1.5), 0);
  }
}
@keyframes loading3 {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
