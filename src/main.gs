/** Original: hoyolab-auto-sign **/
/** https://github.com/canaria3406/hoyolab-auto-sign **/

const token = ""

const genshin = false
const honkai_3 = false
const honkai_star_rail = false

const discordWebhook = ""
const myDiscordID = ""
const myDiscordName = ""

/** The above is the config. **/
/** Please refer to the instructions on https://github.com/canaria3406/hoyolab-auto-sign for configuration. **/
/** The following is the script code. Please DO NOT modify. **/


function main() {

  const response = dailyCheckIn();

  if(discordWebhook) {
    postWebhook(response);
  }

}


function dailyCheckIn() {

  const signurl_gs = "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=zh-cn&act_id=e202102251931481"
  const signurl_bh3 = "https://sg-public-api.hoyolab.com/event/mani/sign?lang=zh-cn&act_id=e202110291205111"
  const signurl_hsr = "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=zh-cn&act_id=e202303301540311"

  const header = {
    Cookie: token
  };

  const options = {
    method: "POST",
    headers: header,
    muteHttpExceptions: true
  };

  let response = "";

  if(myDiscordID) {
    response += "<@" + myDiscordID + ">, ";
  }
  else if(myDiscordName) {
    response += myDiscordName + ", ";
  }

  if(genshin === true) {
    const hoyolabResponse = UrlFetchApp.fetch(signurl_gs, options);
    const retcode = JSON.parse(hoyolabResponse).retcode;
    response += "\n" + (retcode ? JSON.parse(hoyolabResponse).message : "恭喜旅行者，今日签到成功");
    console.log(JSON.parse(hoyolabResponse));
  }

  if(honkai_3 === true) {
    const hoyolabResponse = UrlFetchApp.fetch(signurl_bh3, options);
    const retcode = JSON.parse(hoyolabResponse).retcode;
    response += "\n" + (retcode ? JSON.parse(hoyolabResponse).message : "恭喜舰长，今日签到成功");
    console.log(JSON.parse(hoyolabResponse));
  }

  if(honkai_star_rail === true) {
    const hoyolabResponse = UrlFetchApp.fetch(signurl_hsr, options);
    const retcode = JSON.parse(hoyolabResponse).retcode;
    response += "\n" + (retcode ? JSON.parse(hoyolabResponse).message : "恭喜开拓者，今日签到成功");
    console.log(JSON.parse(hoyolabResponse));
  }

  response += "\n" + Utilities.formatDate(new Date(), "Asia/Shanghai", "(yyyy/MM/dd HH:mm:ss)"); 

  return response;

}


function postWebhook(message) {

  const payload = JSON.stringify({
    "username": "hoyolab-auto-sign",
    "avatar_url": "https://i.imgur.com/LI1D4hP.png",
    "content": message
  });

  const options = {
    method: "POST",
    contentType: "application/json",
    payload: payload,
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(discordWebhook, options);
  
}
