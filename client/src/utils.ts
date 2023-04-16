import { useEffect, useState } from "react"

export const usePromise = <T>(func: () => Promise<T>) => {
    let [state, setState] = useState<{ loading: boolean, value: T | null, error: any | null }>({
        loading: true,
        value: null,
        error: null
    });

    useEffect(() => {
        func()
            .then((value) => {
                setState({
                    loading: false,
                    value,
                    error: null
                });
            })
            .catch((error) => {
                setState({
                    loading: false,
                    value: null,
                    error
                });
            });
    }, [func]);

    return state;
}

function fallbackCopyTextToClipboard(text: string) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

export function copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}
