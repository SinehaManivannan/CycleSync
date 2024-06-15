<template>
  <div>
    <h1>Menstrual Cycle Tracker</h1>
    <form @submit.prevent="addUser">
      <input v-model="newUser.name" placeholder="Name">
      <input type="number" v-model="newUser.age" placeholder="Age">
      <button type="submit">Add User</button>
    </form>
    <button @click="fetchUsers">Show All Users</button>
    <p v-if="apiMessage">{{ apiMessage }}</p>
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }} - {{ user.age }}</li>
    </ul>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CycleTracker',
  data() {
    return {
      newUser: {
        name: '',
        age: null
      },
      users: [],
      apiMessage: '',
      error: ''
    };
  },
  methods: {
    addUser() {
      const apiUrl = process.env.VUE_APP_BACKEND_URL + '/user';
      axios.post(apiUrl, this.newUser)
        .then(response => {
          this.users.push(response.data);
          this.newUser = { name: '', age: null };
          this.error = '';
        })
        .catch(error => this.handleError(error));
    },
    fetchUsers() {
      const apiUrl = process.env.VUE_APP_BACKEND_URL + '/users';
      console.log(apiUrl)
      axios.get(apiUrl)
        .then(response => {
          this.users = response.data;
          this.error = '';
        })
        .catch(error => this.handleError(error));
    },
    handleError(error) {
      console.error('There was an error!', error);
      this.error = 'Failed to fetch data. Please try again later.';
      if (error.response) {
        this.error = `Error: ${error.response.data.message || 'Unknown error'}`;
      } else if (error.request) {
        this.error = 'No response from server. Check your network connection.';
      } else {
        this.error = 'Error setting up request.';
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
