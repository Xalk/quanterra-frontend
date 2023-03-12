import React from 'react';

import s from './MoreButton.module.scss'

interface MoreButtonProps {
    content: string
}


const MoreButton: React.FC<MoreButtonProps> = ({content}) => {
    return (
        <div className={s.main}>
            <div id={s.container}>
                <button className={s.learnMore}>
                    <span className={s.circle} aria-hidden="true">
                        <span className={`${s.icon} ${s.arrow}`}></span>
                    </span>
                    <span className={s.buttonText}>{content}</span>
                </button>
            </div>
        </div>

    );
};

export default MoreButton;