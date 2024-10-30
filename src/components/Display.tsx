import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)<{ $time: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  padding: 2rem;
  background-color: white;
  color: ${(props) => (props.$time > 10 ? "black" : "tomato")};
  width: ${(props) =>
    props.$time > 10 ? "10rem" : `${2 * (11 - props.$time) + 10}rem`};
  height: ${(props) =>
    props.$time > 10 ? "12rem" : `${3 * (11 - props.$time) + 12}rem`};
  font-size: ${(props) =>
    props.$time > 10 ? "8rem" : `${2 * (11 - props.$time) + 8}rem`};
`;

export function Display({
  time,
  timeDelta,
}: {
  time: number;
  timeDelta: number;
}) {
  const str = timeDelta >= 10 ? timeDelta.toString() : `0${timeDelta}`;
  return (
    <Wrapper
      drag
      dragSnapToOrigin
      key={timeDelta}
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      $time={time}
    >
      {str}
    </Wrapper>
  );
}
