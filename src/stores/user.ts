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
  sendPasswordResetEmail,
  updatePassword,
  inMemoryPersistence,
} from "firebase/auth";
const data = JSON.parse(localStorage.getItem("creds") as any)
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
          .then(async (response: any) => {
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
          .then(async (response: any) => {
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
      await signOut(auth);
    },
    googleLogin() {
      const provider = new GoogleAuthProvider();
      const google = setPersistence(auth, inMemoryPersistence).then(
        () => {
          return signInWithPopup(auth, provider)
          .then(async (response: any) => {
            localStorage.setItem("creds", JSON.stringify(response.user))
            this.setUser(response.user)
          });
        }
      );
      return google;
    },
    resetPassword(email: string) {
      const actionCodeSettings = {
        url: "http://localhost:5173/change-password",
        handleCodeInApp: true,
      };
      const reset = sendPasswordResetEmail(auth, email, actionCodeSettings)
        .catch((error) => {
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
        })
      return reset;
    },
    changePassword(password: string) {
      // const changePass = 
    },
    setUser(user: any) {
      this.creds = user;
    },
  },
  getters: {
    getEmail() {
      return data.email;
    },
    // displayName() {
    //   return data.displayName;
    // },
  },
});

export default useUserStore;
