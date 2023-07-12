import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import type { RootState, AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Meetings from '../Meetings/Meetings3';
import Button from '@mui/material/Button';

import * as meetingActions from '../../store/meetings';

import CreateMeetingModal from '../Meetings/CreateMeetingModal';

function Home(){
    const sessionUser = useAppSelector(state => state.session.user);
    const sessionMeetings = useAppSelector((state) => state.meetings);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(meetingActions.fetchMeetings());
    }, [dispatch])

    if (!sessionMeetings) return null;

    return (
        <Box>
            <Container sx={{/*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'*/}}>
                <Typography sx={{my: 2}}>
                    Dashboard
                </Typography>
                <Container sx={{}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 1}}>
                        <Typography>
                            Meetings
                        </Typography>
                        <CreateMeetingModal />
                    </Box>
                    <Meetings meetings={sessionMeetings} user={sessionUser}/>
                </Container>
            </Container>
        </Box>
    )
}

export default Home;