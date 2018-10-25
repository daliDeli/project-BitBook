import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="">
                    <div className="container center">
                        © {new Date().getFullYear()} Copyright Text
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;