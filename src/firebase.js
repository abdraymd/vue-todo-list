import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: 'AIzaSyByCXFBdcN_8qNpBrM-wVFTd2Dlbk-J43c',
	authDomain: 'todo-list-a91f7.firebaseapp.com',
	databaseURL: 'https://todo-list-a91f7.firebaseio.com',
	projectId: 'todo-list-a91f7',
	storageBucket: 'todo-list-a91f7.appspot.com',
	messagingSenderId: '917204115747',
	appId: '1:917204115747:web:4a0e7e723e31fbc438ac96'
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
