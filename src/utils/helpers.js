import { GetApiCall, PostApiCall } from "./api"
import SESSION from "./session"
import {webBaseUrl} from '../../app.json'

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

const getTutorsExceptHired = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
    let result = await GetApiCall('/tutor.php?except=1&learner_id=' + user.id)
    if(result?.status == 200){
      setData(result?.data)
    }
  }
}

const getLearnerConnections = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
    let result = await GetApiCall('/connections.php?learner_id=' + user?.id)
    if(result?.status == 200){
      setData(result?.data)
    }
  }
}

const getTutorConnections = async (setData) => {
  let user = await SESSION.get_current_user_id("user")
  if(user){
    let result = await GetApiCall('/connections.php?tutor_id=' + user?.id)
    if(result?.status == 200){
      setData(result?.data)
    }
  }
}

const getUploadedFile = (input) => {
  return `${webBaseUrl}${input.replace("../", "")}`
}

const HELPERS = {
  getAccountStatus,
  getAccountData,
  getListOfTutors,
  getTutors,
  getTutorsExceptHired,
  getLearnerAccountData,
  getLearnerConnections,
  getTutorConnections,
  getUploadedFile
}

export default HELPERS;