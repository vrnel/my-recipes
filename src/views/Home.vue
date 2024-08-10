<template>
    <div class="hero">
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-5">
              <div class="hero-content">
                <h1 class="hero-title">
                  Saving your recipes made easy
                </h1>
                <p>
                  Click the button bellow to start
                </p>
                <div class="welcome">
                    
                    <a class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#login">Get Started</a>
                    <login />
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="graphic">
                    <img src="@/assets/cook.svg" alt="">
                </div>
                
                
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import card from '@/components/card.vue';
import login from '@/components/login.vue';
import { db, firebase } from "@/firebase";



export default {
      name: "home",
      components: {
        card,
        login,
            
      },
};
</script>

<style>

.hero {
margin-top: 70px;
}

#appstyle{
padding-top:50px;
padding-left:50px;
}



.btntxt{
color:white;
}

.hero-content {
    margin-right: 50px; 
    text-align: left;
    
}

.graphic {
    margin-left: 50px;
}
</style>
