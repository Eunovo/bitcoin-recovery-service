import React from "react";
import { Box, Typography } from "@mui/material"
import { StageProps } from "./StageProps";

export const PayToApp: React.FC<StageProps> = ({ navigation }) => {
    return <Box>
        <Typography variant='h3'>To continue, send the coins you want to secure to this address:</Typography>
        <>Placeholder</>

        {navigation}
    </Box>
}
