<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-md navbar-light">
      <router-link to="/overview" class="navbar-brand">
        <img src="@/assets/myrecipe.png" height="100" class="d-inline-block align-top" alt="" loading="lazy" />
      </router-link>
      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ml-auto">
          
          <li class="nav-item" v-if="isAuthenticated">
            <a class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#unos">New Recipe</a>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <form id="search" class="form-inline">
              <input
                v-model="store.searchTerm"
                class="form-control mr-sm-2"
                type="search"
                placeholder="Pretraga"
                aria-label="Search"
              />
            </form>
          </li>

          <li class="nav-item" v-if="!isAuthenticated">

            <a class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#login"><i class="fas fa-user-circle fa-2x"></i></a>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/profile" class="nav-link"><i class="fas fa-user fa-2x"></i></router-link>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <a href="#" @click.prevent="logout" class="nav-link"><i class="fas fa-power-off fa-2x"></i></a>
          </li>
        </ul>
      </div>
    </nav>

    
    <unos  />
    <login />

    <div class="container">
      <router-view />
      
    </div>
  </div>
</template>

<script>
import { db, firebase } from "@/firebase";
import store from '@/store';
import unos from '@/components/unos.vue'; 
import login from '@/components/login.vue';

export default {
  name: 'app',
  components: {
    unos,
    login, 
  },
  data() {
    return {
      isAuthenticated: false,
      store,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.isAuthenticated = !!user;
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@fortawesome/fontawesome-free/css/all.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  
  position: relative; 
}

.navbar-nav {
  align-items: center; 
}

.navbar-nav .nav-item {
  margin-left: 10px; 
}

.navbar-nav .nav-item:last-child {
  margin-left: auto; 
}

#nav {
box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); 
}
</style>
