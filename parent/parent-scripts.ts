import {CHATBOT_MINIMIZE_EVENT_NAME} from "../src/Constants"


function initChatbot() {
  const chatbotIframe = document.getElementById("epson-chatbot-iframe")

  window.addEventListener("message", (event) => {
    if (event.data?.type === CHATBOT_MINIMIZE_EVENT_NAME && chatbotIframe) {
      if (!!event.data.state) {
        chatbotIframe.style.width = "155px"
        chatbotIframe.style.height = "42px"
      } else {
        chatbotIframe.style.width = "500px"
        chatbotIframe.style.height = "384px"
      }
    }
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChatbot)
} else {
  initChatbot()
}

