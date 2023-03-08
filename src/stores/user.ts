import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const auth = getAuth();
const router = useRouter();
const user = auth

export const useUserStore = defineStore("user", {
  state: () => ({
    userDetails: user
  }),
  actions: {
    loginUser(email: string, password: string) {
      this.currentUser = auth.currentUser;
      this.isAuthenticated = true;
      const login = signInWithEmailAndPassword(auth, email, password);
      return login;
    },
    registerUser(email: string, password: string) {
      this.currentUser = auth.currentUser;
      this.isAuthenticated = true;
      const register = createUserWithEmailAndPassword(auth, email, password);
      return register;
    },
    async logout() {
      await signOut(auth);
    },
    googleLogin() {
      const provider = new GoogleAuthProvider();
      const google = signInWithPopup(auth, provider)
      return google;
    },
  },
  getters: {
    checkAuthentication(state) {
      return state.isAuthenticated;
    },
    getEmail(state) {
      return state.userDetails.currentUser?.email
    },
    displayName(state) {
      return state.userDetails.currentUser?.displayName
    },
  },
});

export default useUserStore;
