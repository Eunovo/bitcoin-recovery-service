import { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { State } from "../State/State";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type KeySettings = Omit<State['backupKeys'][number], 'mnemonic'>;

interface BackupKeySettingsProps {
    addKey: (key: KeySettings) => void
}

export const BackupKeySettings: FC<BackupKeySettingsProps> = ({ addKey }) => {
    const [values, setValues] = useState<{
        name: string,
        validFrom: string | null
    }>({
        name: '',
        validFrom: null,
    });

    return <>
        <Box
            component={'form'}
            onSubmit={(e) => {
                e.preventDefault();
                addKey({
                    name: values.name,
                    validFrom: values.validFrom
                        ? new Date(values.validFrom)
                        : undefined
                });
            }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: '100%',
                rowGap: 4,
                py: 2
            }}
        >
            <TextField
                fullWidth
                label='Key Name'
                value={values.name}
                onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
                variant='outlined'
                required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateCalendar']}>
                    <DemoItem label="Valid from">
                        <DatePicker
                            value={values.validFrom}
                            onChange={(newValue) => newValue && setValues((s) => ({ ...s, validFrom: newValue }))}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

            <Button
                type='submit'
                variant="contained"
                sx={{ width: '10rem' }}
            >
                Add key
            </Button>
        </Box>
    </>
}
