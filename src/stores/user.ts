import { defineStore } from "pinia";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
} from "firebase/auth";
const auth = getAuth();
const user = auth;

const useUserStore = defineStore("user", {
  state: () => ({
    userDetails: user,
    creds: "" as any,
  }),
  actions: {
    loginUser(email: string, password: string) {
      const login = setPersistence(auth, browserSessionPersistence).then(
        () => {
          return signInWithEmailAndPassword(auth, email, password)
          .then((response: any) => {
            localStorage.setItem("creds", JSON.stringify(response.user))
          })
          .catch(
            (error) => {
              let err = "";
              switch (error.code) {
                case "auth/invalid-email":
                  err = "Please enter a valid email address";
                  break;
                case "auth/user-not-found":
                  err = "No account with that email was found";
                  break;
                case "auth/wrong-password":
                  err = "Password is incorrect";
                  break;
                default:
                  err = "Email or password is incorrect";
                  break;
              }
              throw err;
            }
          );
        }
      );
      return login;
    },
    registerUser(email: string, password: string) {
      const register = setPersistence(auth, browserSessionPersistence).then(
        () => {
          this.setUser(auth);
          return createUserWithEmailAndPassword(auth, email, password)
          .then((response: any) => {
            localStorage.setItem("creds", JSON.stringify(response.user))
          })
          .catch(
            (error) => {
              let err = "";
              switch (error.code) {
                case "auth/email-already-in-use":
                  err = "Email already exists";
                  break;
                case "auth/invalid-email":
                  err = "Please enter a valid email address";
                  break;
                default:
                  break;
              }
              throw err;
            }
          );
        }
      );
      return register;
    },
    async logout() {
      this.setUser(null);
      localStorage.removeItem("creds")
      await signOut(auth);
    },
    googleLogin() {
      const provider = new GoogleAuthProvider();
      const google = setPersistence(auth, inMemoryPersistence).then(
        () => {
          return signInWithPopup(auth, provider)
          .then((response: any) => {
            localStorage.setItem("creds", JSON.stringify(response.user))
            this.setUser(response.user)
          });
        }
      );
      return google;
    },
    setUser(user: any) {
      this.creds = user;
    },
  },
  getters: {
    getEmail(state) {
      return state.userDetails.currentUser?.email;
    },
    displayName(state) {
      return state.userDetails.currentUser?.displayName;
    },
  },
});

export default useUserStore;
