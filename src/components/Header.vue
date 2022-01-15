<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/">
        <img src="../assets/logo.png" alt="">
      </router-link>
    </div>
    <div class="header-center">
      <div class="header-center-views">
        <div class="icon header-center-views__vertical"></div>
        <div class="icon header-center-views__horizontal"></div>
        <div class="icon header-center-views__apps"></div>
      </div>
      <input class="header-center__search">
      <div class="header-center-controls">
        <img class="icon" src="../assets/svg/filter_alt.svg" alt="">
        <img class="icon" src="../assets/svg/swap_vert.svg" alt="">
      </div>
    </div>
    <div class="header-right">
      <img class="header-right__user" src="../assets/user.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 11px 14px 11px 24px;
  .header-center {
    display: flex;
    align-items: center;
    column-gap: 39px;
    &__search {
      border: 1px solid black;
      border-radius: 7px;
      height: 20px;
      outline: none;
      text-indent: 5px;
      max-width: 189px;
    }
    .icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    .header-center-controls {
      display: flex;
      column-gap: 12px;
    }
    .header-center-views {
      display: flex;
      column-gap: 12px;
      &__vertical {
        background: url(../assets/svg/crop_vertical.svg) no-repeat center / contain;
        &:hover {
          background: url(../assets/svg/crop_vertical_hover.svg) no-repeat center / contain;
        }
      }
      &__horizontal {
        background: url(../assets/svg/crop_horizontal.svg) no-repeat center / contain;
        &:hover {
          background: url(../assets/svg/crop_horizontal_hover.svg) no-repeat center / contain;
        }
      }
      &__apps {
        background: url(../assets/svg/apps.svg) no-repeat center / contain;
        &:hover {
          background: url(../assets/svg/apps_hover.svg) no-repeat center / contain;
        }
      }
    }
  }
  .header-right {
    &__user {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
