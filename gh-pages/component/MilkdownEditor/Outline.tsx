/* Copyright 2021, Milkdown by Mirone. */

import { FC, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import className from './style.module.css';

export type Outline = { text: string; level: number };

const NestedDiv: FC<{ level: number; children: ReactNode }> = ({ level, children }) => {
    if (level === 0) {
        return <>{children}</>;
    }

    return (
        <div className={className['pl-10px']}>
            <NestedDiv level={level - 1}>{children}</NestedDiv>
        </div>
    );
};

const getId = (text: string) =>
    text
        .replace(/[\p{P}\p{S}]/gu, '')
        .replace(/\s/g, '-')
        .toLowerCase()
        .trim();

export const OutlineRenderer: FC<{ outline: Outline[] }> = ({ outline }) => {
    const location = useLocation();
    return (
        <>
            {outline.map((item, index) => {
                const url = '#' + getId(item.text);
                return (
                    <div className={className['pl-10px']} key={index.toString()}>
                        <div className={className['outline-container']}>
                            <NestedDiv level={item.level}>
                                <div className={className['outline-item']}>
                                    <a href={url} className={`${location.hash === url ? className['active'] : ''}`}>
                                        {item.text}
                                    </a>
                                </div>
                            </NestedDiv>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
