
<template>
  <div class="unos">
    <div class="modal fade" id="unos" tabindex="-1" aria-labelledby="unosTitle" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Recipe</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipe-name" class="col-form-label">Recipe title:</label>
                <input type="text" v-model="title" class="form-control" id="recipe-name">
              </div>
              <div class="mb-3">
                <croppa :width="400" :height="400" placeholder="Add image" v-model="imageReference"></croppa>
              </div>
              <div class="mb-3">
                <label for="description-text" class="col-form-label">Description:</label>
                <textarea v-model="description" class="form-control" id="description-text"></textarea>
              </div>
              <div class="mb-3">
                <label for="ingredient-input" class="col-form-label">Add Ingredient:</label>
                <div class="input-group">
                  <input type="text" v-model="newIngredient" class="form-control" id="ingredient-input">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addIngredient">Add</button>
                  </div>
                </div>
              </div>
              <ul class="list-group mb-3">
                <li v-for="(ingredient, index) in ingredients" :key="index" class="list-group-item">
                  {{ ingredient }}
                  <button type="button" class="close" aria-label="Close" @click="removeIngredient(index)">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </li>
              </ul>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button class="btn btn-primary" @click="newRecipe()">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, firebase, storage } from "@/firebase";

export default {
  name: 'unos',
  data() {
    return {
      title: "",
      description: "",
      imageReference: null,
      newIngredient: "",
      ingredients: [],
    };
  },
  methods: {
    addIngredient() {
      if (this.newIngredient.trim()) {
        this.ingredients.push(this.newIngredient.trim());
        this.newIngredient = "";
      }
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    newRecipe() {
      this.imageReference.generateBlob((blobData) => {
        console.log(blobData);
      const userEmail = firebase.auth().currentUser.email;
      let imageName = `${userEmail}/${Date.now()}.png`;
         
        storage.ref(imageName).put(blobData).then(result => {
          result.ref.getDownloadURL().then(url => {
            console.log("javni link", url);

            const recipeTitle = this.title;
            const recipeDescription = this.description;
            const user = firebase.auth().currentUser;

            if (user) {
              db.collection("posts").add({
                name: recipeTitle,
                howto: recipeDescription,
                uid: user.uid, 
                posted_at: Date.now(),
                url, 
                ingredients: this.ingredients,
              })
              .then((doc) => {
                $('#unos').modal('hide');
                console.log("spremljeno", doc);
                this.title = '';
                this.description = '';
                this.ingredients = [];
                this.imageReference.remove();
              })
              .catch((e) => {
                console.error(e);
              });
            } else {
              console.error(e);
            }
          }).catch(e => {
            console.error(e);
          })
        }).catch(e => {
          console.error(e);
        });
      });
    }
  }
};
</script>

