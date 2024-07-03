// stores/authStore.ts
import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { get, post } from '~/services/api-services'

export interface ParameterLogin {
  nip: string
  password: string
}

export interface DataLoginResponse {
  token: string
  userId: number
  name: string
  nip : string
  expired: string
}

interface Area {
  lokasi: string
  longitude: string
  latitude: string
}

export interface DataUserResponse {  
  photo: string
  name: string
  position: string
  email: string
  phone: string
  jam_datang: string
  jam_pulang: string
  validation: string
  radius: string
  area: Area[]
}

interface State {
  dataLogin : DataLoginResponse | null
  parameterLogin: ParameterLogin | null
  dataUser : DataUserResponse | null
}

export const useAuthStore = defineStore('auth', () => {

  // const route = useRoute()
 
  // const isRouteLogin = route.fullPath === '/login'

  const state = reactive<State>({
    dataLogin: null,
    parameterLogin: null,
    dataUser : null
  })

  const setParameterLogin = (parameterLogin: ParameterLogin) => {
    state.parameterLogin = parameterLogin
  }

  const fetchUserData = async (userId: number) => {
    console.log('fetchUserData', userId)

    const response = await get('/data_user.php', { id_pegawai: userId });
    if (response.status === 200 && response.data.is_correct) {
      state.dataUser = response.data.data;
    } else {
      // useAppStateStore().setError(response.data.message);
    }
  }


  const login = async (parameterLogin: ParameterLogin) => {
    
    state.parameterLogin = parameterLogin

    try {
      const loginResponse = await post('/login.php', generateFormData(parameterLogin))

      if (loginResponse.status === 200 && loginResponse.data.is_correct) {

        // set state
        state.dataLogin = loginResponse.data.data
        // fetch user data
        await fetchUserData(loginResponse.data.data.userId)
        // navigate to home
        navigateTo('/home')
      } else {
        // useAppStateStore().setError(loginResponse.data.message)
      }

    } catch (error: any) {
      // useAppStateStore().setError(error.message)
    }
  }

  const getTokens = () => state.dataLogin?.token;
  
  const getUser = () => state.dataLogin;

  const userId = () => state.dataLogin?.userId;

  const dataUser = () => state.dataUser;

  const isLoggedIn : boolean = state.dataLogin?.token !== null;


  // Watch for changes in state and save to localStorage
  watch(
    () => state,
    (newState) => {
      // useAppLocalStore().setUserLogin(JSON.stringify(newState))
    },
    { deep: true }
  )


  return {
    state,
    login,
    setParameterLogin,
    getTokens,
    getUser,
    dataUser,
    userId,
    fetchUserData,
    isLoggedIn
  }
},
{
  // Persist state in localStorage
  persist: true,
}
)
