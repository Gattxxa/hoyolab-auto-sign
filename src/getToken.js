/** 進入hoyolab簽到頁面，按F12進入console，貼上以下程式碼後執行即可取得token **/
/** https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481 **/

function getCookie(param) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${param}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
console.log('ltoken='+getCookie('ltoken')+'; ltuid='+getCookie('ltuid')+';');
