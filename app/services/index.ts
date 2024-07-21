export const convertBase64ToFile = (base64String: string, fileName: string) => {
  let arr = base64String.split(',');
  console.log(arr)
  let mime = arr[0]?.match(/:(.*?);/)?.[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let uint8Array = new Uint8Array(n);
  while (n--) {
    uint8Array[n] = bstr.charCodeAt(n);
  }
  let file = new File([uint8Array], fileName, { type: mime });
  return file;
}
