import React from 'react';

export const ImagePost = props => {

        return (
            <main className="row image-container">
                <div className="col s12 imgDiv">
                    <img className="responsive-img" src={props.post.imageUrl } alt='User uploaded post' />

                </div>
                <div className="col s6">
                    <p className = "left">{props.post.type} post </p>
                </div>
                <div className="col s6">
                    <p className="right">
                        Comments: {props.post.commentsNum}
                    </p>
                </div>
                <div className="col s12">
                    {props.enableDelete ? 
                    <button className="btn small center" onClick={() => { props.onPostDelete(props.post.id)}}>DELETE</button> 
                    : ''
                    }
                </div>
            </main>
        );
    }

