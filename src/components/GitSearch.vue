<template>
  <div>
    <input :value="searchText" @input="handleSearch" placeholder="Search...">
    <ul>
      <li v-for="item in filteredItems" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GitSearch',
  props: {
    // items: Array, // An array of items to search within
  },
  data() {
    return {
      searchText: '',
			items:['1', '2', '3'],
    };
  },
  computed: {
    filteredItems(): string[] {
      const query = this.searchText.toLowerCase();
			return query ? this.items.filter((item) => item.toLowerCase().includes(query)) : [];
    },
  },
  methods: {
    handleSearch(event: Event) {
			this.searchText = (event.target as HTMLInputElement).value;
      this.$emit('search', this.searchText);
    },

  },

	mounted() {
    this.filteredItems
  }
});
</script>
