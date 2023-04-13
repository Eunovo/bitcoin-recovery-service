import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { StageProps } from "./StageProps";

export const Complete: FC<StageProps> = ({ navigation }) => {
    return <Box>
        <Typography variant='h3'>Success!</Typography>
        <>Complete!</>

        {navigation}
    </Box>
}

