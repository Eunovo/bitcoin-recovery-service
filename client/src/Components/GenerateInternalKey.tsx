import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { StageProps } from "./StageProps";

export const GenerateInternalKey: FC<StageProps> = ({ navigation }) => {
    return <Box>
        <Typography variant='h3'>Write down these words</Typography>
        <>Mnemonic</>

        {navigation}
    </Box>
}
