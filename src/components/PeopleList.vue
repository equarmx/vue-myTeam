<template>
  <div class="wrapper">
    <PeopleCard
        v-for="(person, index) in $store.state.peopleList"
        :key="index"
        :person="person"
    />
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
  padding: 10px 0;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  column-gap: 52px;
  row-gap: 41px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
