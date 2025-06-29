let scrapeEmails = document.getElementById('scrapeEmails');
let list = document.getElementById('emailList');


chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    let emails = request.emails;
    if(!emails || emails.length == 0){
        let li = document.createElement('li');
        li.innerText = 'No mails found';
        list.appendChild(li)
    }
    else {
        emails.forEach(email => {
            let li = document.createElement('li');
            li.innerText = email;
            list.appendChild(li)
        });
    }

    // alert(emails);
})


//buttons click event listener
scrapeEmails.addEventListener('click', async() => {
    //get current active tab
    let [tab] = await chrome.tabs.query({active:true,currentWindow:true});

    chrome.scripting.executeScript({
        target: {tabId:tab.id},
        func: scrapeEmailsFromPage,
    })
})

function scrapeEmailsFromPage() {
    const regExp = /[\w-\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
    let emails = document.body.innerHTML.match(regExp);
    chrome.runtime.sendMessage({emails});
    // alert(emails)
}