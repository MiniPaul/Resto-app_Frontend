export default function user(user = '', action) {

    if(action.type === 'saveUser') {
      return action.user
    } else {
      return user;
    }
  
  }