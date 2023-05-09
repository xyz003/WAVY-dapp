import { DemoDataProps } from './config';

export type UtilsProps = {
    value: string;
    decimal: number;
};

export type MenuListProps = {
    data: DemoDataProps[];
    minWidth?: number;
    py?: number;
    size?: number;
    anchor: null | HTMLElement;
    close: any;
    callback: any;
};

export type VlaueInputProps = {
    title?: string;
    available?: string;
    errorMessage?: string;
    error?: boolean;
    value?: number;
    tokenList?: DemoDataProps[];
    classes?: string;
};