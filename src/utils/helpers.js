import { GetApiCall, PostApiCall } from "./api"
import SESSION from "./session"

const getAccountStatus = async (setStatus) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
      let result = await GetApiCall('/tutor.php?account_status=1&id=' + user?.id)
      if(result?.status == 200){
          if(parseInt(result?.is_verified) == 0){
            setStatus('pending')
          }else if(parseInt(result?.is_verified) == 1){
            setStatus('active')
          }
      }
  }
}

const getAccountData = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
      let result = await GetApiCall('/tutor.php?account=1&id=' + user?.id)
      if(result?.status == 200){
        setData(result?.data)
      }
  }
}

const getLearnerAccountData = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
      let result = await GetApiCall('/learner.php?account=1&id=' + user?.id)
      if(result?.status == 200){
        setData(result?.data)
      }
  }
}

const getListOfTutors = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
      let result = await GetApiCall('/tutor.php?self=' + user?.id)
      if(result?.status == 200){
        setData(result?.data)
      }
  }
}

const getTutors = async (setData) => {
  let result = await GetApiCall('/tutor.php')
  if(result?.status == 200){
    setData(result?.data)
  }
}

const HELPERS = {
  getAccountStatus,
  getAccountData,
  getListOfTutors,
  getTutors,
  getLearnerAccountData
}

export default HELPERS;