/**
 * Created by kanglin on 2016/11/11.
 */

export const url = __ENV__ =="production" ? "index.php/" : "http://localhost:3000/index.php/";
console.group(  "env" );
console.log(url);
console.groupEnd();
