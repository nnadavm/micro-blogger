import localforage from "localforage"

function savePostsToLocalStorage(postsList) {
    localforage.setItem("postsList", postsList).catch(err => console.error(err))
}

export default savePostsToLocalStorage;


