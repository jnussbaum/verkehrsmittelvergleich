import React from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

interface Props {
    children: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MUIButton({ children, onClick }: Props) {

    return <Button variant="contained" color="success" endIcon={<SendIcon />} onClick={onClick}>{children}</Button>
}
