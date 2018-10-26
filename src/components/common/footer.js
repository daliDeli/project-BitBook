import React from 'react';

export const Footer = () => {
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
