import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Display } from "./components/Display";
import { Status } from "./components/Status";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  height: 100vh;

  & div,
  & button {
    place-self: center;
  }
`;

const Title = styled.div`
  font-size: 4rem;
`;

const Clock = styled.div`
  display: flex;
  gap: 1rem;

  & div:nth-child(2) {
    font-size: 4rem;
  }
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  gap: 2rem;
`;

const Button = styled(motion.button)`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 4rem;
`;

const Dashboard = styled.div`
  display: flex;
  gap: 4rem;
  font-size: 2rem;
  text-transform: uppercase;
`;

const INITIAL_TIME = 25 * 60;
const MAX_ROUND = 4;
const MAX_GOAL = 12;

export default function App() {
  const [time, setTime] = useState(10);
  const [round, setRound] = useState(47);
  const [intervalId, setIntervalID] = useState(0);
  const minute = Math.floor(time / 60);
  const goal = Math.floor(round / 4);

  function handleStart(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (intervalId === 0) {
      const timeout = setInterval(() => setTime((prev) => --prev), 1000);
      setIntervalID(Number(timeout));
    } else {
      clearTimeout(intervalId);
      setIntervalID(0);
    }
  }

  function handleReset(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    clearTimeout(intervalId);
    setIntervalID(0);
    setTime(INITIAL_TIME);
    setRound(0);
  }

  useEffect(() => {
    if (time === 0) {
      clearTimeout(intervalId);
      setIntervalID(0);
      setTime(INITIAL_TIME);
      setRound((prev) => ++prev);
    }
  }, [time]);

  useEffect(() => {
    console.log(goal);
    if (goal === MAX_GOAL) {
      setTime(0);
      setRound(0);
    }
  }, [goal]);

  return (
    <Container>
      <Wrapper>
        <Title>🍅Pomodoro🍅</Title>
        <Clock>
          <Display time={time} timeDelta={minute} />
          <div>:</div>
          <Display time={time} timeDelta={time % 60} />
        </Clock>
        <Dashboard>
          <Status title="round" progress={round % 4} goal={MAX_ROUND} />
          <Status title="goal" progress={goal} goal={MAX_GOAL} />
        </Dashboard>
        <ButtonWrapper>
          <Button
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleStart}
          >
            {intervalId ? "⏸️" : "▶️"}{" "}
          </Button>
          <Button
            drag
            dragSnapToOrigin
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
          >
            🔄
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
}
