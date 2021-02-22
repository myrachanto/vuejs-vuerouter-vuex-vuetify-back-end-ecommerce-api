<template>
<div>
 <router-view></router-view>
 <loaders />
 <snackbars />
  </div>
</template>

<script>
import loaders from './components/ui/loaders.vue';
import Snackbars from './components/ui/snackbars.vue';

export default {
  components: { loaders, Snackbars },
  name: "App",

  data: () => {
    return{

      }
  }
};
</script>
