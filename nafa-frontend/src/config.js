export const host = "https://nafa-backend.herokuapp.com"
export const localHost = "http://localhost:8000"


let address

if (process.env.NODE_ENV !== 'production') {
  address = localHost
}else{
  address = host
}

export default address
