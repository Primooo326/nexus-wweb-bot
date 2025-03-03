import React from 'react';
import { Icon } from '@iconify/react';
interface IconProps {
    icon: string;
    width?: string | number;
    height?: string | number;
    color?: string;
    className?: string;
    [key: string]: any;
}

export const DynamicIcon: React.FC<IconProps> = ({ icon, ...props }) => {

    return (
        <Icon
            icon={icon}
            width={props.width}
            height={props.height}
            color={props.color}
            className={props.className}
            {...props}
        />
    );
};

