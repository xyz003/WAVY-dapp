import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { VlaueInputProps } from 'types/utils';
import { Input } from './Styled';

const ValueInput = ({ title, value, available, error, errorMessage, tokenList, classes }: VlaueInputProps) => {
    const navigate = useNavigate();

    const goSelect = () => {
        if (tokenList.length > 1) navigate('/select');
    };

    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(value);
    }, [value]);

    return (
        <div
            className={`${classes} flex flex-col rounded-lg w-full border-[0.6px] px-5 py-2 border-[${
                error ? '#FF0004' : '#ACACAE'
            }]`}
        >
            <div className="flex w-full align-center justify-between">
                <span className="text-sm">{title ? title : ''}</span>
                <span className="text-sm">{available ? available : ''}</span>
            </div>
            <div className="flex flex-row w-full align-center justify-between">
                <div className="flex flex-col w-4/5">
                    <Input type="number" value={val} onChange={(e: any) => setVal(e.target.value)} className="w-full" />
                    {error ? <span className="text-xs text-rose-700">{errorMessage}</span> : null}
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center w-full cursor-pointer" onClick={goSelect}>
                        <img src={tokenList[0].icon} alt="token" className="w-[28px] h-[28px]" />
                        <span className="text-sm ml-2 ">{tokenList[0].name}</span>
                        {tokenList.length > 1 ? <KeyboardArrowDownIcon className="ml-2" /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValueInput;
