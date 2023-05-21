import { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { State } from "../State/State";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type KeySettings = Omit<State['backupKeys'][number], 'mnemonic'>;

interface BackupKeySettingsProps {
    addKey: (key: KeySettings) => void
}

export const BackupKeySettings: FC<BackupKeySettingsProps> = ({ addKey }) => {
    const [values, setValues] = useState({
        name: '',
        validFrom: '',
    });

    return <>
        <Box component={'form'} onSubmit={(e) => {
            e.preventDefault();
            addKey({
                name: values.name,
                validFrom: values.validFrom
                    ? new Date(values.validFrom)
                    : undefined
            });
        }}>
            <TextField
                fullWidth
                label='Key Name'
                value={values.name}
                onChange={(e) => setValues(v => ({ ...v, name: e.target.value }))}
                margin="normal"
                variant='outlined'
                required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Valid From"
                    value={values.validFrom}
                    onChange={(newValue) => newValue && setValues((s) => ({ ...s, validFrom: newValue }))}
                    minDate={new Date().toISOString()}
                />
            </LocalizationProvider>

            <Button
                type='submit'
                variant="contained"
                sx={{ mt: 4 }}
            >
                Add key
            </Button>
        </Box>
    </>
}
