import React, { useContext, useEffect, useState } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import PostsContext from '../../contexts/PostsContext';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import {colRefQuery} from '../../firebaseconfig';

function PostList({ postsList, setPostsList }) {

    function suscribeToFirebase() {
        try {
            onSnapshot(colRefQuery, (snapshot) => {
                let posts = [];
                snapshot.docs.forEach(doc => {
                    posts.push({ ...doc.data(), id: doc.id })
                });
                setPostsList(posts);
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        suscribeToFirebase();
    }, [])

    return (
        <div>
            {postsList.length ? postsList.map((post, index) => {
                return (<SinglePost post={post} key={index} />)
            }) : ''}
        </div>
    )
}

export default PostList