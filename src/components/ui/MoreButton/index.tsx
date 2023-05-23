import React from 'react';

import s from '@/components/screens/ships/ships.module.scss'
import {useTranslate} from "@/contexts/TranslateContext";

interface MoreButtonProps {
    content: string
}


const MoreButton: React.FC<MoreButtonProps> = ({content}) => {
    const t = useTranslate()

    return (
        <div className={s.main}>
            <div id={s.container}>
                <button className={s.learnMore}>
                    <span className={s.circle} aria-hidden="true">
                        <span className={`${s.icon} ${s.arrow}`}></span>
                    </span>
                    <span className={s.buttonText}>{t('details_btn')}</span>
                </button>
            </div>
        </div>

    );
};

export default MoreButton;
