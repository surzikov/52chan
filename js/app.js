let addMessagesButton = document.createElement('a')
addMessagesButton.innerHTML = 'Показать больше сообщений'
addMessagesButton.className = 'btn'
addMessagesButton.id = 'addMessages'

let inBaseCount
let messageCount = 10
if(location.search.split('forumUrl=')[1] != undefined){
   forumUrl = location.search.split('forumUrl=')[1] 
}else{
    forumUrl = 'test'
}
document.querySelector('#forumTitle').innerHTML = forumUrl
const firebaseConfig = {
    apiKey: "AIzaSyAs7_DPRcN9YYYQ6NFCBEy3AaMSY6ymK3U",
    authDomain: "chan-9bacd.firebaseapp.com",
    databaseURL: "https://chan-9bacd-default-rtdb.firebaseio.com",
    projectId: "chan-9bacd",
    storageBucket: "chan-9bacd.firebasestorage.app",
    messagingSenderId: "683086456555",
    appId: "1:683086456555:web:f0453b2b1f78fb51dec0ae"
};

document.querySelector('#forumUrl').addEventListener('input', (e)=>{
    document.querySelector('#toForum').href = '#'
    e.preventDefault()
    let inpValue = document.querySelector('#forumId').value
    toForumUrl = inpValue
    if(inpValue.length >= 3 & inpValue.length <= 15){
        console.log(inpValue)
    document.querySelector('#toForum').href = `${location.search.split('forumUrl=')[0]}?forumUrl=${toForumUrl}`
    }
})


document.getElementById('submitSend').addEventListener('click', ()=> {
    let mInp = document.getElementById('messageInput')
    if(mInp.value != ''){
        const message = mInp.value
        mInp.value = ''
        saveMessage(message);  
    }
});


firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function displayMessages() {
    const messagesRef = database.ref(`forums/${forumUrl}/messages`);
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messagesRef.on('value', (snapshot) => {
        inBaseCount = 0
         snapshot.forEach((childSnapshot)=>{
            inBaseCount++
        })
        let loadCount = 0
        snapshot.forEach((childSnapshot)=>{
            if(loadCount >= (inBaseCount-messageCount)){
            const messageId = childSnapshot.key
           const messageElement = document.createElement('div');
            messageElement.innerHTML = `
                <article class="message" id="${messageId}">
                    <div>
                        <div>
                            <span>Аноним</span>
                            <span>${childSnapshot.val().time}</span>
                        </div>
                        <span class="spanId">${messageId}</span><br>    
                    </div>
                    <span>${childSnapshot.val().message}</span> 
                </article> 
                `;
                messagesDiv.insertBefore(messageElement, messagesDiv.firstChild);
            }
            loadCount++
           })
        if(inBaseCount>messageCount){
            let addMessagesButton = document.createElement('a')
            addMessagesButton.innerHTML = 'Показать больше сообщений'
            addMessagesButton.className = 'btn'
            addMessagesButton.id = 'addMessages'
            messagesDiv.appendChild(addMessagesButton)
            document.querySelector('#addMessages').addEventListener('click', ()=>{
                messageCount+= 10
                displayMessages()
            })
        }
          })
        ;
    
    };



function saveMessage(message) {
    let date = new Date()
    let time = `${date.getDate()}-${date.getMonth()+1}-${String(date.getYear())[1] + String(date.getYear())[2]}-${date.getHours()}:${date.getMinutes()}`
    const messagesRef = database.ref(`forums/${forumUrl}/messages`);
    messagesRef.push({
        message: message,
        time: time,
    })
    displayMessages();
}


    displayMessages();

