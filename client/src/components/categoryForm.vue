<template>
  <v-layout column>
    <v-card>
      <v-card-title class="title">Create Category</v-card-title>
      <v-card-text>
        <v-form v-if="!creating" v-model="valid" @submit.prevent="onCreateCategory" @keydown.prevent.enter>
          <v-layout row wrap>
            <v-flex xs10 sm6 md4>
              <v-text-field
              v-model="category.description"
              :rules="notEmptyRules"
              label="Category"
              required
              ></v-text-field>
            </v-flex>
            <v-flex xs2 sm6 md2 pt-2>
              <v-btn type="submit" :disabled="!valid">Create</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-flex sm3 pa-2>
          <v-progress-circular
            v-if="creating"
            :size="70"
            :width="7"
            indeterminate
            color="primary">
          </v-progress-circular>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-layout>

</template>
<script>
import { notEmptyRules } from '@/validators'
export default {
  props: ['creating', 'createCategory'],
  data: () => ({
    valid: false,
    category: {
      description: ''
    },
    notEmptyRules
  }),
  methods: {
    async onCreateCategory () {
      if (this.valid) {
        await this.createCategory(this.category)
        this.category = {
          description: ''
        }
      }
    }
  }
}
</script>
