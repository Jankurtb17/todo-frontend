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
const user = auth.currentUser;

export const useUserStore = defineStore("user", {
  state: () => ({
    userDetails: {
      displayName: user?.displayName,
      email: user?.email
    }
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
      const google = signInWithPopup(getAuth(), provider)
        .then((result) => {
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error.message);
        });
      return google;
    },
  },
  getters: {
    checkAuthentication(state) {
      return state.isAuthenticated;
    },
  },
});

export default useUserStore;
