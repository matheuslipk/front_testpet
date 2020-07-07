export const isSigned = () => {
  let signed = false
  let session = sessionStorage.getItem('session')
  if(session){
    session = JSON.parse(session)
    signed = true
  }
  return signed;
}

