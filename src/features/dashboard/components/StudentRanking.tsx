import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Student } from 'models/student';
import React from 'react';

interface StudentRankingProps {
  studentList: Student[];
}
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StudentRanking = ({ studentList }: StudentRankingProps) => {
  const classes = useStyles();

  return (
    <TableContainer >
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell align="center">{idx + 1}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="right">{student.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentRanking;
