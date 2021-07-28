import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatRounded } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticItem';
import StudentRanking from './components/StudentRanking';
import Widget from './components/Widget';
import {
  dashboardAction,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHigestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';

interface Props {}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHigestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);


  const classes = useStyles();

  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="mark <=5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with Highest mark">
                <StudentRanking studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with Lowest mark">
                <StudentRanking studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box mt={5}>
        <Typography variant="h4">Ranking By city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityId}>
                  <StudentRanking studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
            
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
