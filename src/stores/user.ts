import { defineStore } from 'pinia'
import { getAuth } from "firebase/auth";
import { ref, computed } from "vue";
const auth = getAuth()
const user = auth.currentUser

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: {
      displayName: user?.displayName,
      email: user?.email
    }
  }),
});

export default useUserStore;