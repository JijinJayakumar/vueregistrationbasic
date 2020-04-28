<template>
  <v-app>
    <v-app-bar color="deep-purple accent-4" :dense="true" dark max-height="50">
      <v-toolbar-title>Demo </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-container>
      <v-row justify="space-between">
        <v-col cols="12" md="4">

          <RegistrationForm v-on:formSuccess="response => {dataId=response}" />

        </v-col>

        <v-col cols="12" md="6" v-if="dataId!=0">

          <DataView :url="`user/${this.dataId}`" />

        </v-col>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
  import DataView from "./components/DataView.vue"
  import RegistrationForm from "./components/RegistrationForm.vue"
  export default {
    components: {
      RegistrationForm,
      DataView
    },
    data: () => ({
      dataId: 0,
    }),



  }
</script>