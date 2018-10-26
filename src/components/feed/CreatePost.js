import React from 'react';

export const CreatePost = props => {

    switch (props.modalType) {
        case 'text':
            return (
                <div className="row">
                    <div className="col s12 row section modal-format">
                        <h4 className="col s10">NEW TEXT POST</h4>
                        <p className="col s2">
                            <span className="right"><i style={{ cursor: 'pointer' }} onClick={props.closeModal} className="material-icons">close</i></span>
                        </p>
                    </div>
                    <form className="col s12">
                        <div className="row modal-format">
                            <div className="input-field col s12">
                                <textarea id="text" className="materialize-textarea" onChange={props.valueHandler} value={props.postContent} ></textarea>
                                <label htmlFor="text">Post Content</label>
                            </div>
                            <div className="input-field col s12 ">
                                <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={props.submitForm}>POST
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        case 'image':
            return (
                <div className="row">
                    <div className="col s12 row section modal-format">
                        <h4 className="col s10">NEW IMAGE POST</h4>
                        <p className="col s2">
                            <span className="right"><i style={{ cursor: 'pointer' }} onClick={props.closeModal} className="material-icons">close</i></span>
                        </p>
                    </div>
                    <form className="col s12">
                        <div className="row modal-format">
                            <div className="input-field col s12">
                                <input type="text" id="image" onChange={props.valueHandler} value={props.imageContent} />
                                <label htmlFor="image">Image link</label>
                            </div>
                            <div className="input-field col s12 ">
                                <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={props.submitForm}>POST
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        case 'video':
            return (
                <div className="row">
                    <div className="col s12 row section modal-format">
                        <h4 className="col s10">NEW VIDEO POST</h4>
                        <p className="col s2">
                            <span className="right"><i style={{ cursor: 'pointer' }} onClick={props.closeModal} className="material-icons">close</i></span>
                        </p>
                    </div>
                    <form className="col s12">
                        <div className="row modal-format">
                            <div className="input-field col s12">
                                <input type="text" id="video" onChange={props.valueHandler} value={props.videoContent} />
                                <label htmlFor="video">YouTube video link</label>
                            </div>
                            <div className="input-field col s12 ">
                                <button className="btn waves-effect waves-light right" type="submit" name="action" onClick={this.submitForm}>POST
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        default:
            return null;
    }

};