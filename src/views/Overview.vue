<template>
  <div id="appstyle">
    <div class="container">
      <unos />
      <div v-if="cards.length === 0">
         <p>There aren't any recipes yet. Click <a href="" data-toggle="modal" data-target="#unos">here</a> to add the first recipe.</p>
      </div>
      <div v-else class="cards-container">
        <card v-for="card in filteredCards" :key="card.id" :info="card" />
      </div>
    </div>
  </div>
</template>


<script>
import card from '@/components/card.vue';
import unos from '@/components/unos.vue';
import { db, firebase } from "@/firebase";
import store from '@/store';

export default {
  name: "overview",
  data() {
    return {
      cards: [],
      store,
      imageReference: null,

    };
  },
  
  components: {
    card,
    unos,
  },
  mounted() {
    console.log("MOUNTED");
    this.getPosts();
  },
  methods: {
    getPosts() {
      console.log("firebase dohvat");
      const user = firebase.auth().currentUser;

      if (user) {
        db.collection("posts")
        .orderBy('posted_at', 'desc')
          
          .onSnapshot((querySnapshot) => {
            this.cards = [];
            querySnapshot.forEach((doc) => {
              console.log("ID", doc.id);
              console.log("podaci", doc.data());

              const data = doc.data();

              this.cards.push({
                id: doc.id,
                description: data.howto,
                name: data.name,
                time: data.posted_at,
                url: data.url,
                ingredients: data.ingredients,
              });
            });
          });
      } else {
        console.error(e);
      }
    },
  },
  computed: {
        filteredCards() {
            
            let termin = this.store.searchTerm;

            return this.cards.filter((card) => card.name.includes(termin));
        },
    },
};
</script>



  

<style>
#appstyle {
  padding-top: 50px;
  padding-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px; 
}

.cards-container {
  display: flex;
  flex-direction: column; 
  align-items: center;    
  width: 100%;            
  gap: 20px; 
}

.card {
  width: 100%; 
}
</style>



