
export const useStorage = () => {
  const get = () =>{
    return localStorage.getItem("_secure");
  }
  const set = (tok:string) => {
    localStorage.setItem("_secure",tok);
  }
  const remove = () => {
    localStorage.removeItem("_secure");
  }
  return {
    get,
    set,
    remove
  }
}
