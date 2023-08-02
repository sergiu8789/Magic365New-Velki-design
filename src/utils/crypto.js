import { enc,AES} from 'crypto-js';
const password = 'd6F3Efeq';

export const encrypt = (text) => {
  if(text){
  const result = AES.encrypt(text, password);
  return result.toString();
  }
}
 
export const decrypt = (text)=> {
  if(text){
  const result = AES.decrypt(text, password);
  return result.toString(enc.Utf8);
  }
}