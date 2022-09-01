<template>
  <div class="stepper-box component-container">
    <div class="top">
      <div class="divider-line" :style="{ width: `${(100 / steps.length) * (steps.length - 1) - 10}%` }" />
      <div class="steps-wrapper">
        <template v-if="topButtons">
          <div v-if="currentStep.index > 0" class="stepper-button-top previous" @click="backStep()">
            <i class="pi pi-arrow-left" />
          </div>
        </template>
        <template v-for="(step, index) in steps" :key="index">
          <div :class="['step', isStepActive(index)]" :style="{ width: `${100 / steps.length}%` }" v-if="step.visible">
            <div class="circle">
              <i :class="step.icon" />
            </div>
            <div class="step-title">
              <h4>{{ step.title }}</h4>
              <h5 class="step-subtitle">{{ step.subTitle }}</h5>
            </div>
          </div>
        </template>
        <div v-if="topButtons" :class="['stepper-button-top next', !canContinue ? 'deactivated' : '']" @click="nextStep()">
          <i class="pi pi-arrow-right" />
        </div>
      </div>
    </div>
    <div class="content">
      <transition :enter-active-class="enterAnimation" :leave-active-class="leaveAnimation" mode="out-in">
        <keep-alive v-if="keepAliveData">
          <component ref="comp" :is="stepComponent" v-model="modelValue" :clickedNext="nextButton[currentStep.name]" @can-continue="proceed" @change-next="changeNextBtnValue" @visible-change="changeVisible" :current-step="currentStep" :key="componentKey" />
        </keep-alive>
        <component v-else ref="comp" :is="stepComponent" v-model="modelValue" :clickedNext="nextButton[currentStep.name]" @can-continue="proceed" @change-next="changeNextBtnValue" @visible-change="changeVisible" :current-step="currentStep" :key="componentKey" />
      </transition>
    </div>
    <div :class="['bottom', currentStep.index > 0 ? '' : 'only-next']">
      <div v-if="currentStep.index > 0" class="stepper-button previous" @click="backStep()">
        <i class="pi pi-arrow-left" />
        <span class="ml-2">이전</span>
      </div>
      <div :class="['stepper-button next', !canContinue ? 'deactivated' : '']" @click="nextStep()">
        <span class="mr-2">{{ finalStep ? "클라우드 생성" : "저장 후 이동" }}</span>
        <i class="pi pi-arrow-right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: null },
  steps: { type: Array<any>, default: null },
  topButtons: { type: Boolean, default: false },
  keepAlive: { type: Boolean, default: true },
  reset: { type: Boolean, default: false }
})
const emits = defineEmits(['active-step', 'completed-step', 'stepper-finished', 'clicking-back', 'visible-change'])

const comp = ref(undefined)
const currentStep = ref({ name: '', index: 0 })
const previousStep = ref({ name: '', index: -1 })
const nextButton = ref({})
const canContinue = ref(false)
const finalStep = ref(false)
const keepAliveData = ref(props.keepAlive)

// 내부 사용 Steps 참조 구성
const steps = ref(props.steps)

const stepComponent = computed(() => props.steps[currentStep.value.index].component)
const enterAnimation = computed(() => {
  if (currentStep.value.index < previousStep.value.index) {
    return "animated quick fadeInLeft";
  } else {
    return "animated quick fadeInRight";
  }
})
const leaveAnimation = computed(() => {
  if (currentStep.value.index > previousStep.value.index) {
    return "animated quick fadeOutLeft";
  } else {
    return "animated quick fadeOutRight";
  }
})
const componentKey = computed(() => {
  return `${currentStep.value.name}_${steps.value[currentStep.value.index].index}`
})

const isStepActive = (index) => currentStep.value.index === index ? 'activated' : 'deactivated'
const activateStep = (index, back = false) => {
  if (props.steps[index]) {
    previousStep.value = currentStep.value
    currentStep.value = { name: props.steps[index].name, index }
    finalStep.value = (index + 1 === props.steps.length)
    if (!back) {
      emits('completed-step', previousStep)
    }
  }
  emits('active-step', currentStep)
}
const nextStepAction = () => {
  nextButton[currentStep.value.name] = true
  if (canContinue.value) {
    if (finalStep.value) {
      emits('stepper-finished', currentStep)
    } else {
      const nextItem = steps.value.find((item, index) => index > currentStep.value.index && item.visible)
      const currentIndex = steps.value.findIndex(item => item.name === nextItem.name)
      activateStep(currentIndex)
    }
  }
}
const nextStep = () => {
  if (comp.value && canContinue.value) {
    const next = (comp.value as any).beforeNextStep()
    if (next) {
      nextStepAction()
    } else {
      alert('잘 해라!! -_-')
    }
  }
}
const backStep = () => {
  emits('clicking-back')
  //let currentIndex = currentStep.value.index - 1
  let currentIndex = -1
  for (let i = currentStep.value.index - 1; i >= 0; i--) {
    if (steps.value[i].visible) {
      currentIndex = i
      break;
    }
  }
  if (currentIndex >= 0) activateStep(currentIndex, true)
}
const proceed = (payload) => canContinue.value = payload.value;
const changeNextBtnValue = (payload) => {
  nextButton[currentStep.value.name] = payload.nextBtnValue
  getCurrentInstance()?.proxy?.$forceUpdate()
}
const changeVisible = (val) => {
  const item = steps.value.find(item => item.name === val.name)
  if (item) {
    item.visible = val.visible
  }
}

watch(() => props.modelValue, () => {
  steps.value[currentStep.value.index].index++
})

// initialize
const init = () => {
  activateStep(0)
  props.steps.forEach(s => {
    nextButton[s.name] = false
    s.index = 0               // 갱신 초기화
  })
}

onMounted(() => { })
</script>

<style scoped lang="scss">
@mixin shadow($level: 1) {
  @if $level==1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  } @else if $level==2 {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  } @else if $level==3 {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  } @else if $level==4 {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  } @else if $level==5 {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
}

@mixin breakpoint($class) {
  @if $class==xs {
    @media (max-width: 767px) {
      @content;
    }
  } @else if $class==sm {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $class==md {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $class==lg {
    @media (min-width: 1200px) {
      @content;
    }
  } @else {
    @warn "Breakpoint mixin supports: xs, sm, md, lg";
  }
}

.stepper-box {
  background-color: white;
  @include shadow(1);
  min-height: 200px;
  font-size: 1rem;

  .top {
    .stepper-button-top {
      z-index: 20;
      padding: 0.4rem;
      border-radius: 100rem;
      cursor: pointer;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.next {
        border: 2px solid #3383c8;
        color: #3383c8;
        right: 1%;

        &.deactivated {
          border: 2px solid #cccccc !important;
          color: #cccccc;
          cursor: not-allowed !important;
        }
      }

      &.previous {
        color: #333333;
        left: 1%;
      }
    }

    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;

    .divider-line {
      border-bottom: 1px solid #cccccc;
      height: 2px;
      position: absolute;

      @include breakpoint(xs) {
        width: 90%;
      }
    }

    .steps-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      width: 95%;
      left: 0;
      padding: 2% 4%;

      @include breakpoint(xs) {
        width: 90%;
        justify-content: center;
      }

      .step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        @include breakpoint(xs) {
          width: 100% !important;
        }

        &.deactivated {
          @include breakpoint(xs) {
            display: none;
          }

          .circle {
            i {
              background-color: #bbbbbb !important;
            }
          }

          .step-title {
            opacity: 0.35;
          }
        }

        .circle {
          margin-bottom: 1rem;
          padding: 0 1rem;
          background-color: white;

          i {
            background-color: #3383c8;
            color: #fff;
            border-radius: 100rem;
            padding: 1rem;
          }
        }

        .step-title {
          position: absolute;
          top: 90%;
          width: 100%;

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-size: 1.15rem;
            margin: 0 0 0.2rem 0;
            color: #333333;
            font-weight: bold;
          }

          .step-subtitle {
            font-weight: lighter;
            font-size: 1rem;
            margin: 0;
            color: blueviolet;
          }
        }
      }
    }
  }

  .content {
    overflow: hidden;
    //margin: 1.5rem 0;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid darkgrey;
    background-color: whitesmoke;
  }

  .bottom {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-top: 1px solid #cccccc;

    &.only-next {
      justify-content: flex-end;
    }

    .stepper-button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &.next {
        background-color: #3383c8;
        color: white;
        @include shadow(1);

        &.deactivated {
          background-color: #cccccc !important;
          cursor: not-allowed !important;
        }
      }

      &.previous {
        color: #333333;
      }
    }
  }
}
</style>
