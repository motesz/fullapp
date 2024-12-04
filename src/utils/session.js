import { CommonActions } from '@react-navigation/native';
import localDB from "./localdb";

const get = async (key) => {
  let result = await localDB.get(key)
  return result
}

const set = async (key, data) => {
  let result = await localDB.store(key, data)
  return result
}

const get_current_user = async (key, navigation) => {
  let user = await localDB.get(key)
  if(user){
    return user
  }else{
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Login' }
        ],
      })
    );
  }
}

const get_current_user_id = async (key) => {
  let user = await localDB.get(key)
  if(user){
    return user
  }
  return null
}

const logout = async (key, navigation) => {
  await localDB.remove(key)
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Login' }
      ],
    })
  )
}

const SESSION = {
  get,
  set,
  get_current_user,
  get_current_user_id,
  logout
}

export default SESSION;