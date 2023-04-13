import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { StageProps } from "./StageProps";

export const AddBackupKeys: FC<StageProps> = ({ navigation }) => {
    return <Box>
        <Typography variant='h3'>Add Backup keys</Typography>
        <>Add Backup keys</>

        {navigation}
    </Box>
}
