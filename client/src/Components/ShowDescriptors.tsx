import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { StageProps } from "./StageProps";

export const ShowDescriptors: FC<StageProps> = ({ navigation }) => {
    return <Box>
        <Typography variant='h3'>Copy these Wallet Descriptors</Typography>
        <>Wallet descriptors</>

        {navigation}
    </Box>
}
