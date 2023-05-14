import { FC, useState } from "react";
import { Box, Button, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import { State } from "../State/State";
import { ExpandMore } from "@mui/icons-material";

type KeySettings = Omit<State['backupKeys'][number], 'mnemonic'>;

interface BackupKeySettingsProps {
    addKey: (key: KeySettings) => void
}

enum TimelockType {
    locktime = 'locktime',
    sequence = 'sequence'
}

export const BackupKeySettings: FC<BackupKeySettingsProps> = ({ addKey }) => {
    const [values, setValues] = useState({
        name: '',
        timelock: {
            value: 0,
            type: TimelockType.locktime
        }
    });

    return <>
        <Box component={'form'} onSubmit={(e) => {
            e.preventDefault();
            addKey(values);
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

            <TextField
                fullWidth
                label='Timelock'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                helperText="Coming soon"
                value={values.timelock.value}
                onChange={(e) => setValues(v => ({
                    ...v,
                    timelock: {
                        value: Number.parseInt(e.target.value),
                        type: v.timelock.type
                    }
                }))}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <TimelockMenu
                            value={values.timelock.type}
                            setValue={(value) => setValues(v => ({
                                ...v,
                                timelock: {
                                    value: v.timelock.value,
                                    type: value
                                }
                            }))}
                        />
                    </InputAdornment>
                }}
                margin="normal"
                variant='outlined'
                disabled
            />

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

const TimelockMenu: FC<{
    value: TimelockType;
    setValue: (value: TimelockType) => void;
}> = ({ value, setValue }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenutItemClick = (value: TimelockType) => () => {
        setValue(value);
        handleClose();
    }

    return <>
        <Button
            id='timelock-button'
            aria-controls={open ? 'timelock-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            endIcon={<ExpandMore />}
        >
            {value}
        </Button>
        <Menu
            id='timelock-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'timelock-button',
            }}
        >
            {
                Object.values(TimelockType).map(
                    (value) => <MenuItem onClick={handleMenutItemClick(value)}>{value}</MenuItem>
                )
            }
        </Menu>
    </>;
}
