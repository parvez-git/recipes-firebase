import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeaturedView from '@/views/FeaturedView'
import RecipeListView from '@/views/RecipeListView.vue'
import RecipeDetails from '@/views/RecipeDetails.vue'
import EditRecipe from '@/views/EditRecipe.vue'
import ProfileView from '@/views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'
import { auth } from '@/firebase'

const requiredAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/featured',
    name: 'featured',
    component: FeaturedView
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: RecipeListView
  },
  {
    path: '/recipe/:id',
    name: 'recipe-details',
    component: RecipeDetails,
    props: true
  },
  {
    path: '/edit-recipe/:id',
    name: 'recipe-edit',
    component: EditRecipe,
    props: true,
    beforeEnter: requiredAuth
  },
  {
    path: '/user-profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: requiredAuth
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
