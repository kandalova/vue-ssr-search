<template>
  <div class="search">
      <input
        class="gradient-border"
        v-model="searchText" 
        placeholder="Search..."
        @blur="hideDropdown"
    />
    <img @click="toggleDropdown" :src="('/public/arrow.svg')" :class="{ rotated: showList }" />   
    <div class="dropdown gradient-border" v-if="showList">
      <ul>
        <li @click="setUser(item.login)" v-for="item in items" :key="item.id">{{ item.login }}</li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import searchRepository, { IUser, userSearchRequestPayload } from '../repository/searchRepository';
import debounce from "lodash.debounce";


export default defineComponent({
  name: 'GitSearch',
  data() {
    return {
      searchText: '',
			items: [] as IUser[],
      showList: false,
    };
  },
  watch: {
    searchText(newVal){
      this.fetch(this, newVal);
    }
  },
  computed: {
    filteredItems() {
      return this.items;
    },
  },
  
  methods: {
    fetch: debounce(async (self, value: string)=>{
      self.items = await searchRepository.getUsers(self.getSearchParams(value));
      // to-do: more accurate dropdown's logic
      self.showDropdown();
    }, 500),

    getSearchParams(value:string): userSearchRequestPayload {
      return {
        q: value,
        per_page: 10
      }
    },
    hideDropdown(){
      this.showList = false;
    },
    showDropdown() {
      this.showList = true;
    },
    toggleDropdown(){
      this.showList = !this.showList;
    },
    setUser(value: string){
      this.searchText = value;
      this.hideDropdown();
    }   
  },
});
</script>

<style scoped>
.search{
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: auto;
}

input{
  width: 260px;
  position: relative;
  height: 32px;  
  box-sizing: border-box;
  font: relative;
  padding: 3px, 4px;
  padding-right: 24px;
}

input:focus {
  outline: none;
}

img {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.rotated{
  transform: translateY(-50%) rotate(180deg);
}

.dropdown{
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  box-sizing: border-box;
  font: relative;
}

.dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 10px ;
  cursor: pointer;
  text-align: left;
  padding: 1px, 7px, 1px, 7px;
  margin: 0;
}

.dropdown li:hover {
  background-color: rgba(255, 201, 4, 0.17);
}

.gradient-border {
  border: 1px solid;
  border-image: linear-gradient(90.87deg, #FFC700 0%, #A5E870 100%);
  border-image-slice: 1;
  /* doesn't work - it's possible to use workaround with container background */
  border-radius: 4px;
}
</style>
