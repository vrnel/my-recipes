<template>
  <div class="card mb-3">
    <h5 class="card-header">{{ info.name }}</h5>
    <div class="row g-0">
      <div class="col-md-5 d-flex justify-content-center align-items-center">
        <img class="card-img-top" :src="info.url" />
      </div>
      <div class="col-md-7 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-text">Ingredients:</h5>
          <ul>
            <li v-for="(ingredient, index) in info.ingredients" :key="index">{{ ingredient }}</li>
          </ul>
        </div>
        <div class="card-body flex-grow-1">
          <h5 class="card-text">Description: </h5>
          <p>{{ info.description }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer mt-auto">
      {{ postedFromNow }}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: 'card',
  props: ['info'],
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>

<style scoped>
.card-header {
  background-color: white;
  width: 100%;
  text-align: center;
}

.card-body {
  word-break: break-word;
}

.card-footer {
  background-color: white;
  width: 100%;
  text-align: center;
}

.card {
  width: 100%;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0; 
}

.col-md-5 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto; 
  padding: 15px; 
}

.col-md-5 img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; 
}

.col-md-7 {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}

.flex-grow-1 {
  flex-grow: 1;
}

.mt-auto {
  margin-top: auto;
}

h5 {
  color: rgb(240, 163, 29);
}
p {
  text-align: left;
}
li {
  text-align: left;
}
</style>

