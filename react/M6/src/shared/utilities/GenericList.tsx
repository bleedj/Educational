import React from "react";
import { assoc } from "./assoc";
export interface IItem {
    text: string;
    onClick: ()  =>  void;
    className?: string;
    id: string;
    As?: 'a' | 'li' | 'button' | 'div';
    href?: string;
    Svg?: JSX.Element;
}

export interface IGenericListProps {
    list: IItem[]
}

export const generateRandomString = () => Math.random().toString(36).substring(2,15);
export const assignId = assoc('id', generateRandomString());
export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj)

export function GenericList({list}: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'button', text, onClick, className, id, href, Svg}) => (
                <As
                    className={className}
                    onClick={()=>onClick()}
                    id={id}
                    href={href}
                >
                    <>
                        {typeof(Svg) !== 'undefined' && (Svg)}
                        <span>
                            {text}
                        </span>
                    </>
                    
                </As>
            ))}
        </>
    )
}