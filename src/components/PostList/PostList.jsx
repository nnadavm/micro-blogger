import React from 'react';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import SinglePost from '../SinglePost/SinglePost';
import { loadNextPage } from '../../utils/firebaselib';
import InfiniteScroll from "react-infinite-scroll-component";

function PostList({ postsList, setPostsList, lastDocument, setLastDocument }) {

    return (
        <div>
            <InfiniteScroll
                dataLength={postsList.length}
                next={() => loadNextPage(postsList, setPostsList, lastDocument, setLastDocument)}
                hasMore={lastDocument && postsList}
                loader={<div className='d-flex justify-content-center p-5'>
                    <h5 style={{ color: 'white' }}>Loading...</h5>
                </div>}
                endMessage={postsList.length ? <div className='d-flex justify-content-center p-5'>
                    <h5 style={{ color: 'white' }}>You're all caught up!</h5>
                </div> : ''}
            >
                {postsList.length ? postsList.map((post, index) => {
                    return (<SinglePost post={post} key={index} />)
                }) : <LoaderComponent alignTop={true} />}
            </InfiniteScroll>
        </div>
    )
}

export default PostList;