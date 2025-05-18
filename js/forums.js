let forumsList = document.querySelector('#forumsList')

const firebaseConfig = {
    apiKey: "AIzaSyAs7_DPRcN9YYYQ6NFCBEy3AaMSY6ymK3U",
    authDomain: "chan-9bacd.firebaseapp.com",
    databaseURL: "https://chan-9bacd-default-rtdb.firebaseio.com",
    projectId: "chan-9bacd",
    storageBucket: "chan-9bacd.firebasestorage.app",
    messagingSenderId: "683086456555",
    appId: "1:683086456555:web:f0453b2b1f78fb51dec0ae"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function displayForums(){
    const forumsDatabase = database.ref(`forums`);
    
    forumsDatabase.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot)=>{
            let p = document.createElement('p')
            p.innerHTML = `<a href='${location.search.split('allforums.html')[0]}index.html?forumUrl=${childSnapshot.key}'>${childSnapshot.key}</a>`
            
            forumsList.insertBefore(p, forumsList.lastChild)
        })
    })
}