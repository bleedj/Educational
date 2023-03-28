import * as React from "react";
import comment from './images/comment.svg'
import report from './images/report.svg'
import hide from './images/hide.svg'
import save from './images/save.svg'
import share from './images/share.svg'

export enum EIcons {
    comment =  'comment' ,
    report =  'report' ,
    hide =  'hide' ,
    save =  'save' ,
    share =  'share' ,
}
interface IIconProps {
    name: EIcons; 
    size?: number;
}


export const Icon: React.FC<IIconProps> = ({ size = 16, name }) => {
    let nameSRC;
    switch (name) {
        case 'comment':
            nameSRC = comment
            break
        case 'report':
            nameSRC = report
            break
        case 'hide':
            nameSRC = hide
            break
        case 'save':
            nameSRC = save
            break
        case 'share':
            nameSRC = share
            break
    
    }
    return <img src={nameSRC} alt="" width={size} height={size} />;
};

