<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <RouterLink class="navbar-brand active" :to="{name: 'home'}">BotSys</RouterLink>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'pk_index'}">对战</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'record_index'}">对局列表</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'ranklist_index'}">排行榜</RouterLink>
        </li>
      </ul>

      <ul class="navbar-nav" v-if="$store.state.user.is_login">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ $store.state.user.username }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><RouterLink class="dropdown-item" :to="{name: 'user_bot_index'}">MyBot</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#" @click="logout">logout</a></li>
            </ul>
          </li>
      </ul>

      <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
        <li class="nav-item">
            <RouterLink :class="route_name == 'user_account_login_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'user_account_login_index'}" role="button">
              登录
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :class="route_name == 'user_account_register_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'user_account_register_index'}" role="button">
              注册
            </RouterLink>
          </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore();
    const route = useRoute;
    let route_name = computed(() => route.name)

    const logout = () =>{
        store.dispatch("logout");
    }

    return {
      route_name,
      logout
    }
  }
}

</script>

<style scoped>

</style>