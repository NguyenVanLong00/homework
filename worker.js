const extensions = 'https://elearning.thanglong.edu.vn/'

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: state.ON,
    });
});

const state = {
    ON: "ON",
    OFF: "OFF"
}

chrome.action.onClicked.addListener(async (tab) => {
    if (!tab.url.startsWith(extensions)) {
        return;
    }

    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === state.ON ? state.OFF : state.ON

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
    });

    await chrome.scripting.insertCSS({
        files: ["cheating-mode.css"],
        target: { tabId: tab.id },
    });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["homework.js"],
    })
        .then(() => console.log("injected script file"));

})