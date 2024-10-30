import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 8rem;
`;

export function Status({
  title,
  progress,
  goal,
}: {
  title: string;
  progress: number;
  goal: number;
}) {
  return (
    <Wrapper>
      <div>
        {progress}/{goal}
      </div>
      <div>{title}</div>
    </Wrapper>
  );
}
