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
  verifyPasswordResetCode,
  confirmPasswordReset,
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
      // const actionCode = {
      //   url: `https://localhost/change-password?code=${this.generateVerificationCode}`,
      //   handleCodeInApp: true
      // } 
      // const reset = sendPasswordResetEmail(auth, email, actionCode)
      const reset = sendPasswordResetEmail(auth, email)
        .catch((error) => {
          let err = "";
          switch (error.code) {
            case "400":
              err = "Verification code invalid";
              break;
            default:
              err = "Email or password is incorrect";
              break;
          }
          throw err;
        })
      return reset;
    },
    verifyPassword(newPassword: string) {
      const verify = verifyPasswordResetCode(auth, newPassword)
        .then((response) => {
          localStorage.setItem("creds", JSON.stringify(auth))
        })
        .catch((error) => { 
          console.log(error)
          throw error;
        })
        return verify;
    },
    changePassword(oobCode: string, password: string) {
      const changePass = confirmPasswordReset(auth, oobCode, password)
      .catch((error) => { 
        console.log(error)
        throw error;
      })
      return changePass;
    },
    setUser(user: any) {
      this.creds = user;
    },
  },
  getters: {
    getEmail() {
      return data.email;
    },
    generateVerificationCode() {
      const min = 100000
      const max = 999999
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    // displayName() {
    //   return data.displayName;
    // },
  },
});

export default useUserStore;
