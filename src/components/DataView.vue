<template>
  <v-container>
    <v-card
      :loading="loading"
        class="mx-auto"
        max-width="344"
        outlined
      >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{formData.name}}</v-list-item-title>
        <v-list-item-subtitle>{{formData.email}} </v-list-item-subtitle>
        <v-list-item-subtitle>{{formData.age}} </v-list-item-subtitle>
        <v-list-item-subtitle>{{formData.dob}} </v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar>
      <img
        :src="formData.image"
        alt="John"
      >
    </v-avatar>
    </v-list-item>
  </v-card>

  </v-container>
</template>

<script>  
import {HTTP} from '../plugins/http';
  export default {
    name: 'DataView',
      props: {
        url:String,
      },
    data: () => ({
      formData:{},
      loading:false,
    }),

    created() {
      this.loading = true;
       HTTP
      .get(this.url)
      .then(response => (this.formData = response.data,  this.loading = false))
    },
  }
</script>
