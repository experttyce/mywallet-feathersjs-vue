<template>
  <v-container fluid>
    <category-form
      :creating="creating"
      :createCategory="createCategory"
    ></category-form>
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <v-layout column v-if="!loading">
        <v-card>
          <v-card-title class="title">List of Categories</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="category"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.description.toUpperCase() }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                    edit
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteItem(props.item)"
                  >
                    delete
                  </v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-layout>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Edit Category</v-card-title>
          <v-card-text>
            <v-flex>
              <v-text-field v-model="editCategory.description" ></v-text-field>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="primary" flat @click.native="saveChanges">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import categoryForm from '@/components/categoryForm'
export default {
  name: 'category',
  components: {
    'category-form': categoryForm
  },
  data: () => ({
    editCategory: { description: '' },
    dialog: false,
    headers: [
      {
        text: 'Description',
        align: 'left',
        sortable: true,
        value: 'description'
      }]
  }),
  mounted () {
    this.findCategory({ query: {} })
  },
  methods: {
    ...mapActions('category', { findCategory: 'find' }),
    async createCategory (category) {
      const { Category } = this.$FeathersVuex
      const newCategory = new Category(category)
      await newCategory.save()
    },
    editItem (item) {
      this.dialog = true
      this.editCategory = item
    },
    async saveChanges () {
      const { Category } = this.$FeathersVuex
      const updateCategory = new Category(this.editCategory)
      await updateCategory.update()
      this.dialog = false
    }
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    ...mapState('category', { loading: 'isFindPending', creating: 'isCreatePending' }),
    ...mapGetters('category', { findCategoryInStore: 'find' }),
    category () {
      return this.user ? this.findCategoryInStore({
        query: {
          userId: this.user.userId
        }
      }).data : []
    }
  }
}
</script>
