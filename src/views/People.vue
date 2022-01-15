<template>
  <div class="container">
    <Header/>
    <PeopleList/>
  </div>
</template>

<script>
import Header from "../components/Header";
import PeopleList from "../components/PeopleList";
export default {
  name: "People",
  components: {PeopleList, Header}
}
</script>

<style lang="scss" scoped>
.container {

}
</style>
