import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
import Table, { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { TableHead } from '@mui/material';


// Nicer table cell styling.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


// Nicer table row styling.
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const sxTable = {
    minWidth: 300
}


/**
 * The data to show in the table.
 */
export interface SimpleTableProps extends TableProps {
    /**
     * The data to show in the table.
     */
    data: Record<string, any>;

    /**
     * The label for the table head.
     */
    header?: [string, string];
}


/**
 * A simple table that shows the keys and the values of an object.
 */
export const SimpleTable: FC<SimpleTableProps> = ({
    data,
    header = undefined,
    ...rest
}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={sxTable} {...rest}>
                {header ? (
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {header[0]}
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                {header[1]}
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {Object.keys(data).map((key) => (
                        <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">
                                {key}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {data[key]}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
