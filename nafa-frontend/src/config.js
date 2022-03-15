export const host = "https://nafa-backend.herokuapp.com"
export const localHost = "http://localhost:8000"

export const hostFrontEnd = "https://nafa-frontend.herokuapp.com"
export const localHostFrontEnd = "http://localhost:3000"



 let address
 let frontEndAddress

if (process.env.NODE_ENV !== 'production') {
  address = localHost
  frontEndAddress = localHostFrontEnd
}else{
  address = host
  frontEndAddress = hostFrontEnd
}

export {address, frontEndAddress}
