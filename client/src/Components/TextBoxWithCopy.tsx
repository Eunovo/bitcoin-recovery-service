import { ContentCopy } from '@mui/icons-material';
import { Typography, IconButton } from '@mui/material';
import { FC } from 'react';
import { copyTextToClipboard } from '../utils';

interface TextBoxWithCopyProps {
    content: string
}

export const TextBoxWithCopy: FC<TextBoxWithCopyProps> = ({ content }) => {
    return <>
        <Typography sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#f8f8ff',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Typography noWrap>
                {content}
            </Typography>

            <IconButton
                color='primary'
                sx={{ ml: 'auto' }}
                onClick={() => {
                    copyTextToClipboard(content);
                }}
            >
                <ContentCopy />
            </IconButton>
        </Typography>
    </>
}
