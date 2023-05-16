import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Icon
import { ReactComponent as VisibilityIcon } from '../assets/img/icon/Visibility.svg';
import { ReactComponent as VisibilityOffIcon } from '../assets/img/icon/VisibilityOff.svg';
import { ReactComponent as SendIcon } from '../assets/img/icon/send.svg';
import { ReactComponent as SwapIcon } from '../assets/img/icon/swap.svg';
import { ReactComponent as BridgeIcon } from '../assets/img/icon/bridge.svg';
import { ReactComponent as SpendIcon } from '../assets/img/icon/spend.svg';
import { ReactComponent as BankIcon } from '../assets/img/icon/bank.svg';
import { ReactComponent as WalletIcon } from '../assets/img/icon/wallet.svg';
import { ReactComponent as RightIcon } from '../assets/img/icon/right.svg';

import { CardDiv, ConnectButton } from 'components/Styled';
import useConfig from 'hooks/useConfig';

const Home = () => {
    const allowBridgNet = ['Avalanche', 'Ethereum'];
    const data = useConfig();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const [propt, setPropt] = useState(false);
    const [spend, setSpend] = useState(false);

    const goPage = (params: string) => {
        if (data.connect) {
            if (params === '/bridge')
                if (allowBridgNet.findIndex((e: string) => e === data.NETWORK.sub) === -1) {
                    setSpend(true);
                    setTimeout(() => setSpend(false), 1000);
                    return;
                }
            navigate(params);
        } else {
            setPropt(true);
            setTimeout(() => setPropt(false), 1000);
        }
    };

    const goSpend = () => {
        if (!data.connect) {
            setPropt(true);
            setTimeout(() => setPropt(false), 1000);
        } else {
            setSpend(true);
            setTimeout(() => setSpend(false), 1000);
        }
    };

    const visibleHandle = () => {
        setVisible((pre: boolean) => !pre);
    };

    return (
        <>
            <div className="flex flex-col w-full md:w-auto">
                <CardDiv className={`card py-7 md:w-[550px] w-full md:px-0 px-5 rounded-xl`}>
                    <div className="flex flex-col md:w-[400px] w-full items-center mx-auto">
                        <div className="rounded-lg w-full border-[#ACACAE] border-[0.6px] px-6 py-7 gradient-box">
                            <div className="flex items-center">
                                <p className="text-base font-Extended">Total Balance</p>
                                {visible ? (
                                    <VisibilityIcon onClick={visibleHandle} className="ml-1 cursor-pointer" />
                                ) : (
                                    <VisibilityOffIcon
                                        onClick={visibleHandle}
                                        className="h-[18px] ml-1 cursor-pointer"
                                    />
                                )}
                            </div>
                            <h1 className="gradient-text md:text-5xl text-4xl font-Unbounded font-medium mt-2">
                                {data.connect
                                    ? visible
                                        ? `${data.CURRENCY}15,749.54`
                                        : `${data.CURRENCY}****`
                                    : `${data.CURRENCY}0.00`}
                            </h1>
                        </div>
                        <div className="flex justify-between w-full md:mt-11 mt-5 md:mb-11 mb-0">
                            <div onClick={() => goPage('/send')} className="flex flex-col items-center">
                                <button className="bg-[#423F51] rounded-full md:w-[60px] w-[50px] md:h-[60px] h-[50px] flex items-center justify-center">
                                    <SendIcon className="h-[35px] w-[35px]" />
                                </button>
                                <p className="text-md mt-2">Send</p>
                            </div>
                            <div onClick={() => goPage('/swap')} className="flex flex-col items-center">
                                <button className="bg-[#423F51] rounded-full md:w-[60px] w-[50px] md:h-[60px] h-[50px] flex items-center justify-center">
                                    <SwapIcon className="h-[35px] w-[35px]" />
                                </button>
                                <p className="text-md mt-2">Swap</p>
                            </div>
                            <div onClick={() => goPage('/bridge')} className="flex flex-col items-center">
                                <button className="bg-[#423F51] rounded-full md:w-[60px] w-[50px] md:h-[60px] h-[50px] flex items-center justify-center">
                                    <BridgeIcon className="h-[35px] w-[35px]" />
                                </button>
                                <p className="text-md mt-2">Bridge</p>
                            </div>
                            <div onClick={() => goSpend()} className="flex flex-col items-center">
                                <button className="bg-[#423F51] rounded-full md:w-[60px] w-[50px] md:h-[60px] h-[50px] flex items-center justify-center">
                                    <SpendIcon className="h-[30px] w-[30px]" />
                                </button>
                                <p className="text-md mt-2">Spend</p>
                            </div>
                        </div>
                        {!data.isMobile && (
                            <div
                                className="flex flex-col w-full rounded-t-3xl"
                                style={data.isMobile ? { height: '280px' } : {}}
                            >
                                <div
                                    onClick={() => goPage('/top-up')}
                                    className="py-3 px-6 rounded-lg md:bg-dark bg-[#242429] w-full flex justify-between items-center cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <BankIcon className="h-[30px] w-[30px]" />
                                        <div className="ml-4">
                                            <p className="text-md font-medium">Top Up</p>
                                            <p className="text-xs text-light-dark">On-ramp fiat-to-stablecoin</p>
                                        </div>
                                    </div>
                                    <RightIcon />
                                </div>
                                <div
                                    onClick={() => goPage('/withdraw')}
                                    className="my-4 py-3 px-6 rounded-lg md:bg-dark bg-[#242429] w-full flex justify-between items-center cursor-pointer"
                                >
                                    <div className="flex items-center">
                                        <WalletIcon className="h-[30px] w-[30px]" />
                                        <div className="ml-4">
                                            <p className="text-md font-medium">Withdraw</p>
                                            <p className="text-xs text-light-dark">Withdraw your stablecoins to Fiat</p>
                                        </div>
                                    </div>
                                    <RightIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </CardDiv>
                {data.isMobile && (
                    <div
                        className="flex flex-col w-full  px-5 pt-12 bg-[#242429] rounded-t-3xl"
                        style={{ height: 'calc(100vh - 380px)', minHeight: '230px' }}
                    >
                        <div
                            onClick={() => goPage('/top-up')}
                            className="py-3 pr-5 rounded-lg md:bg-dark bg-[#242429] w-full flex justify-between items-center cursor-pointer"
                        >
                            <div className="flex items-center">
                                <div className="rounded-full bg-[#494979] w-[35px] h-[35px] flex items-center justify-center">
                                    <BankIcon className="h-[20px] w-[20px]" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-md font-medium">Top Up</p>
                                    <p className="text-xs text-light-dark">On-ramp fiat-to-stablecoin</p>
                                </div>
                            </div>
                            <RightIcon />
                        </div>
                        <div className="h-[0.5px] my-[30px] w-full bg-[#36363A]" />
                        <div
                            onClick={() => goPage('/withdraw')}
                            className="py-3 pr-5 rounded-lg md:bg-dark bg-[#242429] w-full flex justify-between items-center cursor-pointer"
                        >
                            <div className="flex items-center">
                                <div className="rounded-full bg-[#494979] w-[35px] h-[35px] flex items-center justify-center">
                                    <WalletIcon className="h-[20px] w-[20px]" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-md font-medium">Withdraw</p>
                                    <p className="text-xs text-light-dark">Withdraw your stablecoins to Fiat</p>
                                </div>
                            </div>
                            <RightIcon />
                        </div>
                    </div>
                )}
            </div>
            {!data.connect && propt && (
                <ConnectButton className="bg-[#5A4EE8] md:text-base px-[20px]  md:py-[8px] py-[5px] text-sm absolute md:rounded-lg rounded-full md:top-[40px] top-[8px]">
                    Connect your wallet
                </ConnectButton>
            )}
            {spend && (
                <ConnectButton className="bg-[#5A4EE8] md:text-base px-[20px]  md:py-[8px] py-[5px] text-sm absolute md:rounded-lg rounded-full md:top-[40px] top-[8px]">
                    Coming soon
                </ConnectButton>
            )}
        </>
    );
};

export default Home;
