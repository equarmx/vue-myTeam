<template>
  <div class="wrapper">
    <PeopleCard/>
  </div>
</template>

<script>
import PeopleCard from "./PeopleCard";
export default {
  name: "PeopleList",
  components: {PeopleCard}
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
