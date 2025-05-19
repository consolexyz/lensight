// Add Ethereum provider types to the global window object
interface Window {
    ethereum?: {
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        isMetaMask?: boolean;
        on?: (event: string, callback: (...args: any[]) => void) => void;
        removeListener?: (event: string, callback: (...args: any[]) => void) => void;
    };
}
